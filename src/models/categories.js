import db from './db.js'

const getAllCategories = async() => {
  const query = `
    SELECT category_id, name
    FROM category
    ORDER BY name;
  `;

  const result = await db.query(query);

  return result.rows;
}

const getCategoryById = async(id) => {
  const query = `
    SELECT
      category_id,
      name
    FROM category
    WHERE category_id = $1
  `
  const query_params = [id]
  const result = await db.query(query, query_params);

  return result.rows[0];
}

const getCategoryDetails = async(id) =>{
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

  const query_params = [id]
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

const createCategory = async (name) => {
    const query = `
      INSERT INTO category (name)
      VALUES ($1)
      RETURNING category_id;
    `;

    const query_params = [name];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
}

const updateCategory = async (category_id, name) => {
  const query = `
    UPDATE category
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;  
  `;

  const query_params = [name, category_id];
  const result = await db.query(query, query_params);
  
  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated category with ID:', category_id);
  }

  return result.rows[0].category_id;
}

export { getAllCategories, getCategoryDetails, getCategoryById, assignCategoryToProject, updateCategoryAssignments, createCategory, updateCategory }  