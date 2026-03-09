const Category = require("../models/Tag");

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: categoryDetails,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create category",
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: true, description: true });

        return res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            data: allCategories,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
        });
    }
};