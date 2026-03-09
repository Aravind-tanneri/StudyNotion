const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/fileUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        
        const video = req.files.videoFile;

        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: subSectionDetails._id } },
            { new: true }
        ).populate("subSection");

        return res.status(200).json({
            success: true,
            message: "Sub Section created successfully",
            data: updatedSection,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error during SubSection creation",
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description, timeDuration } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({ success: false, message: "SubSection not found" });
        }

        
        if (title) subSection.title = title;
        if (description) subSection.description = description;
        if (timeDuration) subSection.timeDuration = timeDuration;

        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
        }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred while updating the section" });
    }
};

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $pull: { subSection: subSectionId } }
        );

        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

        if (!subSection) {
            return res.status(404).json({ success: false, message: "SubSection not found" });
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred while deleting the section" });
    }
};