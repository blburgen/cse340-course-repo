import { getAllProjects, getUpcomingProjects, getProjectDetails } from "../models/projects.js";

const number_of_projects = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(number_of_projects);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects});
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails});
};

export { showProjectsPage, showProjectDetailsPage };