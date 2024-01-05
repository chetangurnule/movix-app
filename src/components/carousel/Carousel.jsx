import { useEffect, useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { CircleRating, Container, Img, Genres } from "../index";
import { useSelector } from "react-redux";
import PosterFallback from "../../assets/no-poster.png";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./style.scss";

const Carousel = ({ data, isLoading, endPoint, title }) => {
  const { imageUrl } = useSelector((state) => state.home.url);
  const carouselRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const handelImageLoad = () => {
    setImageLoaded(true);
  };

  const navigation = (dir) => {
    const container = carouselRef.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth + 20
        : container.scrollLeft + container.offsetWidth + 20;
    console.log(container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [data]);

  return (
    <div className="carousel">
      <Container>
        <div className="title">{title}</div>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!isLoading ? (
          <div className="carouselItems" ref={carouselRef}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? imageUrl + item.poster_path
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() => {
                    navigate(`/${item.media_type || endPoint}/${item.id}`);
                  }}
                >
                  <div className="posterBlock">
                    {!imageLoaded && <div className="skeleton"></div>}
                    <Img src={posterUrl} onLoad={handelImageLoad} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Carousel;
