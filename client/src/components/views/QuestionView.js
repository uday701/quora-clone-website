import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import Navbar from "../Navbar";
import PostCard from "../PostCard";
import QuestionFooter from "../QuestionFooter";


const QuestionView = () => {
    const params = useParams();

    const [posts, setPosts] = useState([]);
    const user = isLoggedIn();
   
    const fetchPost = async () => {
        
        const data = await getPosts(user && user.token, { question: params.id });
       

        if (!data.error) {
            setPosts([...posts, ...data.data]);
           
        }

    };
    
    
    useEffect(() => {
        fetchPost();
    }, [params.id]);
    let title = posts.map((post, i) => post.title)
    let data = {}
    data.title=title[0]
    data._id=params.id
    
    return (
      <>
      <Navbar/>
        <Typography
              variant="h5"
              gutterBottom
              sx={{ overflow: "hidden", mt: 1, Height: 1250}}
              className="title"
            >
              {title[0]}
            </Typography>
            <QuestionFooter data={data} isAuthor={false} />
        <Stack spacing={2}>
            {posts.map((post, i) => (
                <PostCard
                    content="answer"
                    preview="primary"
                    key={post._id}
                    post={post}
                />
            ))}
        </Stack>
      </>
    );
};

export default QuestionView;
