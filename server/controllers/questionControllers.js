const mongoose = require("mongoose");
const Question = require("../models/Question");
const User = require("../models/User");
const Comment = require("../models/Comment");
const paginate = require("../util/paginate");

const createQuestion = async (req, res) => {
    try {
        
        const { title, userId } = req.body;

        if (!(title)) {
            throw new Error("All input required");
        }

        const question = await Question.create({
            title,
            poster: userId,
        });

        res.json(question);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        const { userId } = req.body;

        let { page, sortBy, author, search } = req.query;

        if (!sortBy) sortBy = "-createdAt";
        if (!page) page = 1;

        let posts = await Question.find()
            .populate("poster", "-password")
            .sort(sortBy)
            .lean();

        if (author) {
            posts = posts.filter((post) => post.poster.username == author);
        }

        if (search) {
            posts = posts.filter((post) =>
                post.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        const count = posts.length;

        posts = paginate(posts, 10, page);


        return res.json({ data: posts, count });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
const deleteQuestion = async (req, res) => {
    try {
        const postId = req.params.id;
        const { userId, isAdmin } = req.body;

        const post = await Question.findById(postId);

        if (!post) {
            throw new Error("Post does not exist");
        }

        if (post.poster != userId && !isAdmin) {
            throw new Error("Not authorized to delete post");
        }

        await post.remove();

        

        return res.json(post);
    } catch (err) {

        return res.status(400).json({ error: err.message });
    }
};
module.exports = {
    getQuestions,
    createQuestion,
    deleteQuestion
};


