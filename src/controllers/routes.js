import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, 
    processNewOrganizationForm, organizationValidation, showEditOrganizationForm, 
    processEditOrganizationForm } from './organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, 
    processNewProjectForm, projectValidation, showEditProjectForm, 
    processEditProjectForm } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, 
    processAssignCategoriesForm, showNewCategoryForm, categoryValidation, processNewCategory, showEditCategoryForm, processEditCategoryForm } from './categories.js';
import { testErrorPage } from './errors.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsers, showVolunteering, processDeleteVolunteer, processDeleteVolunteerDash, switchVolunteer } from './users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Routes to handle the edit project form
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Route for new category page
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

// Route to handle new category page
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategory);

// Routes to handle the edit category form
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

router.get('/users', requireRole('admin'), showUsers);

router.get('/volunteering', requireLogin, showVolunteering);
router.post('/volunteering', processDeleteVolunteer);
router.post('/dashboard', processDeleteVolunteerDash);

router.post('/project/:id', switchVolunteer);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;