import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePostCard from "./SinglePostCard";

const HomePage = () => {
  const singlePost ={
      user:{
        username:"Kristy",
        profile_photo:"https://randomuser.me/api/portraits/thumb/men/63.jpg"
      },
      photos:[
        {photo_url:"https://foodstagramdev.s3.amazonaws.com/Food+pics/IMG_20181121_174332.jpg"}
      ],
      description: "HAhahahahahhahah"
  }
  return (
    <>
      <h1>My Home Page</h1>
      <SinglePostCard singlePost={singlePost} />
    </>
  );
};

export default HomePage;
