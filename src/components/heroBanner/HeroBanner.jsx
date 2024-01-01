import { useState, useEffect } from "react";
import { InputField, Container, useFetch, Img } from "../index.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

const HeroBanner = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { imageUrl } = useSelector((state) => state.home.url);
  const { data, isLoading } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (data) {
      const bgUrl =
        imageUrl +
        data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackgroundImageUrl(bgUrl);
    }
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!isLoading && (
        <div className="backdrop-img">
          <Img src={backgroundImageUrl} alt="background_Image" />
        </div>
      )}
      <div className="opacity-layer"> </div>
      <Container>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <InputField
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button
              onClick={() => {
                if (query.length > 0) navigate(`/search/${query}`);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroBanner;
