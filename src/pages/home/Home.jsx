import React from "react";
import { HeroBanner, Trending, TopRated, Popular } from "../../components";
import "./style.scss";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <TopRated />
      <Popular />
    </div>
  );
};

export default Home;
