import { useState } from "react";
import { Container, useFetch, SwitchTabs, Carousel } from "../../index";
import "./style.scss";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const { data, isLoading } = useFetch(`/${endPoint}/popular`);

  const onTabChange = (tab) => {
    tab === "Movies" ? setEndPoint("movie") : setEndPoint("tv");
  };
  console.log(data);
  return (
    <div className="carouselSection">
      <Container>
        <span className="carouselTitle">Trending</span>
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

export default Popular;
