import db from './db.js'

const getAllProjects = async() => {
  const query = `
    SELECT s.service_project_id,o.name,s.title,s.description,s.location,s.date
    FROM public.service_project s
    LEFT JOIN public.organization o
    ON s.organization_id = o.organization_id
    ORDER BY s.date;
  `;

  const result = await db.query(query);

  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      service_project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM service_project
    WHERE organization_id = $1
    ORDER BY date;
  `;
  
  const query_params = [organizationId];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      sp.service_project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date,
      o.organization_id,
      o.name
    FROM service_project sp
    LEFT JOIN organization o
    USING (organization_id)
    WHERE date >= CURRENT_DATE
    ORDER BY date
    LIMIT $1;
  `;
  
  const query_params = [number_of_projects];
  const result = await db.query(query, query_params);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      sp.service_project_id,
      sp.title,
      sp.description,
      sp.location,
      sp.date,
      o.organization_id,
      o.name
    FROM service_project sp
    LEFT JOIN organization o
    USING (organization_id)
    WHERE service_project_id = $1;
  `;
  
  const query_params = [id];
  const result = await db.query(query, query_params);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectCategories = async (id) => {
  const query = `
    SELECT
      sp.service_project_id,
      sp.title,
      c.category_id,
      c.name
    FROM service_project sp
    LEFT JOIN category_service cs
      USING (service_project_id)
    LEFT JOIN category c
      USING (category_id)
    WHERE sp.service_project_id = $1;
  `;
  
  const query_params = [id];
  const result = await db.query(query, query_params);

  return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_project (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING service_project_id;
    `;

    const query_params = [title, description, location, date, organizationId];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].service_project_id);
    }

    return result.rows[0].service_project_id;
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectCategories, createProject };