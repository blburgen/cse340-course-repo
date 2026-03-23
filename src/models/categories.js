import db from './db.js'

const getAllCategories = async() => {
  const query = `
    SELECT category_id, name
    FROM public.category
    ORDER BY name;
  `;

  const result = await db.query(query);

  return result.rows;
}

const getCategoryById = async(categoryId) => {
  const query = `
    SELECT
      category_id,
      name
    FROM category
    WHERE category_id = $1
  `
  const query_params = [categoryId]
  const result = await db.query(query, query_params);

  return result.rows;
}

const getCategoryDetails = async(categoryId) =>{
  const query = `
    SELECT 
      c.category_id,
      c.name AS category_name,
      s.service_project_id,
      o.name,
      s.title,
      s.description,
      s.location,
      s.date
    FROM service_project s
    LEFT JOIN organization o
    ON s.organization_id = o.organization_id
    LEFT JOIN category_service cs
    USING (service_project_id)
    LEFT JOIN category c
    USING (category_id)
    WHERE c.category_id = $1
    ORDER BY s.date;
  `;

  const query_params = [categoryId]
  const result = await db.query(query, query_params);

  return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO category_service (category_id, service_project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM category_service
        WHERE service_project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

export { getAllCategories, getCategoryDetails, getCategoryById, assignCategoryToProject, updateCategoryAssignments }  