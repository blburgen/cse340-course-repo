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

export { getAllProjects, getProjectsByOrganizationId };