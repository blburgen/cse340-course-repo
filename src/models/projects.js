import db from './db.js'

const getAllProjects = async() => {
  const query = `
    SELECT s.service_project_id,o.name,s.title,s.description,s.location,s.date
    FROM public.service_project s
    INNER JOIN public.organization o
    ON s.organization_id = o.organization_id;
  `;

  const result = await db.query(query);

  return result.rows;
}

export {getAllProjects}  