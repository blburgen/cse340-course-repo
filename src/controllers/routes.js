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
import { showUserRegistrationForm, processUserRegistrationForm } from './users.js';

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
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Routes to handle the edit project form
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Route for new category page
router.get('/new-category', showNewCategoryForm);

// Route to handle new category page
router.post('/new-category', categoryValidation, processNewCategory);

// Routes to handle the edit category form
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;