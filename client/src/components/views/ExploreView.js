import { Button, Card, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostBrowser from "../PostBrowser";

const ExploreView = (props) => {

  return (
    <Container>
          <Navbar />
      <GridLayout
              left={<PostBrowser createPost contentType="posts" />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default ExploreView;
