import { Button, Card, Link, Stack, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import CreatePost from "./CreatePost";
import PostScroller from "./PostScroller";
import { FormControl, MenuItem, Select } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const PostBrowser = (props) => {
  
    const [sortBy, setSortBy] = useState("-createdAt");
   

    const [search] = useSearchParams();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



  const searchExists =
    search && search.get("search") && search.get("search").length > 0;


  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setSortBy(newSortBy);
  };

  const contentTypeSorts = {
    posts: {
      "-createdAt": "Latest",
      "-likeCount": "Likes",
      "-commentCount": "Comments",
      createdAt: "Earliest",
    },
    liked: {
      "-createdAt": "Latest",
      createdAt: "Earliest",
    },
  };

    const sorts = contentTypeSorts[props.contentType];


  return (
      <>

      <Stack spacing={2}>
        <Card>
          <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
                      
          <Stack direction="row" alignItems="center" spacing={1} spacing={1}>
          <Typography color="text.secondary" variant="subtitle2">
              Sort by:
           </Typography>
           <Select
             size="small"
             value={sorts[sortBy]}
             sx={{ minWidth: 150 }}
             onChange={handleSortBy}
             >
             {Object.keys(sorts).map((sortName, i) => (
              <MenuItem value={sorts[sortName]} key={i}>
                {sorts[sortName]}
                </MenuItem>
               ))}
               </Select>
             </Stack>
          </Stack>
              </Card>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList onChange={handleChange} aria-label="lab API tabs example">
                              <Tab label="Whats up!" value="1" />
                              <Tab label="Answer" value="2" />

                          </TabList>
                      </Box>
                      <TabPanel value="1">
                          {props.createPost && <CreatePost />}
                          <PostScroller content="posts" drawin={sortBy} profileUser={props.profileUser }search={search.get("search")}
                              searchExists={searchExists} />
                      </TabPanel>
                      <TabPanel value="2"> <PostScroller content="questions" drawin={sortBy} profileUser={props.profileUser} search={search.get("search")}
                          searchExists={searchExists} /></TabPanel>

                  </TabContext>
              </Box>

              
      </Stack>
    </>
  );
};

export default PostBrowser;
