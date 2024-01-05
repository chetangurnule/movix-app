import React from "react";
import { Container, Img } from "../../index";
import avatar from "../../../assets/avatar.png";
import { useSelector } from "react-redux";
import "./style.scss";

const Cast = ({ data, isLoading }) => {
  const { imageUrl } = useSelector((state) => state.home.url);
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="cast">
      <div className="castSection">
        <Container>
          <div className="sectionHeading">Top Cast</div>
          {!isLoading ? (
            <div className="listItems">
              {data?.map((item) => {
                let imgUrl = item.profile_path
                  ? imageUrl + item.profile_path
                  : avatar;
                return (
                  <div key={item.id} className="listItem">
                    <div className="profileImg">
                      <Img src={imgUrl} />
                    </div>
                    <div className="name">{item.name}</div>
                    <div className="character">{item.character}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="castSkeleton">
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Cast;
