import { getAllCategories, getCategoryDetails } from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = 'Service Project Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const projects = await getCategoryDetails(categoryId);
    const title = 'Category Details';

    res.render('category', {title, projects});
};

export { showCategoriesPage, showCategoryDetailsPage };