import { BASE_URL } from "../config";
const axios = require('axios');

const createQuestion = async (post, user) => {
    try {
        const res = await fetch(BASE_URL + "api/questions", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-access-token": user.token,
            },
            body: JSON.stringify(post),
        });
        return await res;
    } catch (err) {
        console.log(err);
    }
};

const getQuestions = async (token, query) => {
   
    try {
        const res = await fetch(
            BASE_URL + "api/questions?" + new URLSearchParams(query),
            {
                headers: {
                    "x-access-token": token,
                },
            }
        );
        return await res.json();
   
    } catch (err) {
        console.log(err);
    }
};
const deleteQuestion = async (postId, user) => {
    try {
        const res = await fetch(BASE_URL + "api/questions/" + postId, {
            method: "DELETE",
            headers: {
                "x-access-token": user.token,
            },
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export {
    deleteQuestion,
    createQuestion,
    getQuestions
};
