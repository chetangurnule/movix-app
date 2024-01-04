import { useState } from "react";
import { Container, useFetch, SwitchTabs, Carousel } from "../../index";
import "./style.scss";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const { data, isLoading } = useFetch(`/trending/movie/${endPoint}`);

  const onTabChange = (tab) => {
    tab === "Day" ? setEndPoint("day") : setEndPoint("week");
  };
  console.log(`trending data: ${data}`);
  return (
    <div className="carouselSection">
      <Container>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs
          tabs={["Day", "Week"]}
          onTabChange={onTabChange}
          endPoint={endPoint}
        />
      </Container>
      <Carousel data={data?.results} isLoading={isLoading} />
    </div>
  );
};

export default Trending;
