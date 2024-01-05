import { useEffect, useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { SwitchTabs, Carousel, Container, useFetch, Img } from "../../index";

const FreeSection = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const [bgImage, setBgImage] = useState("");
  const imageData = useSelector((state) => state.home.bgImageData);
  const { imageUrl } = useSelector((state) => state.home.url);
  const { data, isLoading } = useFetch(`/${endPoint}/top_rated`);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageData) {
      const bgUrl =
        imageUrl + imageData?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBgImage(bgUrl);
    }
  }, [imageData, data]);

  const onTabChange = (tab) => {
    tab === "Movies" ? setEndPoint("movie") : setEndPoint("tv");
  };

  const onImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="topRated">
      {!imageLoaded && <div className="backdrop-skeleton"></div>}
      {imageData && (
        <div className="backdrop-img">
          <Img src={bgImage} alt="background_Image" onLoad={onImageLoad} />
        </div>
      )}
      {imageLoaded && <div className="opacity-layer"> </div>}
      <Container>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs tabs={["Movies", "Tv"]} onTabChange={onTabChange} />
      </Container>
      <Carousel
        data={data?.results}
        isLoading={isLoading}
        endPoint={endPoint}
      />
    </div>
  );
};

export default FreeSection;
