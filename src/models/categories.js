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

// const getAllEnviornmental = async() =>{
//   const query = `
//     SELECT s.service_project_id,o.name,s.title,s.description,s.location,s.date
//     FROM public.service_project s
//     LEFT JOIN public.organization o
//     ON s.organization_id = o.organization_id
//     LEFT JOIN public.category_service cs
//     USING (service_project_id)
//     LEFT JOIN public.category c
//     USING (category_id)
//     WHERE c.name = "Environmental"
//     ORDER BY s.date;
//   `;

//   const result = await db.query(query);

//   return result.rows;
// }

export {getAllCategories}  