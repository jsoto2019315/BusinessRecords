import { response, request } from "express";
import Category from "./categories.model.js"

export const addCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        const category = new Category({ categoryName, description });

        await category.save();

        res.status(200).json({
            msg: 'The category that you add is:',
            category
        })
    } catch (e) {
        res.status(500).json({
            error: Error('Mistake creating the category', e)
        })
    }
}

export const viewCategories = async (req, res) => {
    try {
        const { limit, from } = req.query;
        const query = { status: true };

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            total,
            categories
        })
    } catch (e) {
        res.status(500).json({
            msg: ('Internal service error', e)
        })

        console.log(e)
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { _id, __v, status, oldCategoryName, newCategoryName, ...rest } = req.body;

        const category = await Category.findOne({ oldCategoryName: rest.categoryName})

        if (!category || !category.status) {
            return res.status(400).json({
                error: 'Category not found'
            });
        }

        if (newCategoryName) {
            category.categoryName = newCategoryName;
        }

        Object.assign(category, rest);

        await category.save();

        res.status(200).json({
            msg: 'Category update successfully'
        });



    } catch (e) {
        return res.status(500).json({
            msg: ('Internal server error', e)
        })
    }
}