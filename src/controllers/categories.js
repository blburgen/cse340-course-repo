import { getAllCategories, getCategoryDetails, updateCategoryAssignments, updateCategory, createCategory, getCategoryById } from "../models/categories.js";
import { getProjectDetails, getProjectCategories } from "../models/projects.js";
import { body, validationResult } from "express-validator";

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters')
];

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = 'Service Project Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getCategoryDetails(categoryId);
    const title = 'Category Details';
    console.log(category);

    res.render('category', {title, category, projects});
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getProjectCategories(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {
    const title = "Add New Category";

    res.render('new-category', { title })
};

const processNewCategory = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        //Validation failed
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        //Redirect back to the new category form
        return res.redirect('/new-category');
    }
    const { name } = req.body;
    const categoryId = await createCategory(name);

    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);   
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    console.log(categoryDetails);

    const title = 'Edit Category';
    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
    
    const categoryId = req.params.id;
    const { name } = req.body;

    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-category/' + req.params.id);
    }
    
    await updateCategory(categoryId, name);

    // Set a success flash message
    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, categoryValidation, processNewCategory, showEditCategoryForm, processEditCategoryForm };