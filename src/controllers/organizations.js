import { getAllOrganizations } from "../models/organizations";

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
};

export { showOrganizationsPage };