import "./style.scss";
import React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PosterFallback from "../../assets/no-poster.png";
import { Img, CircleRating, Genres } from "../index";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { imageUrl } = useSelector((state) => state.home.url);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? imageUrl + data.poster_path
    : PosterFallback;

  const onImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        {!imageLoaded && <div className="skeleton"></div>}
        <Img className="posterImg" src={posterUrl} onLoad={onImageLoad} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
