import React from "react";
import "./style.scss";
import { Container } from "../../components";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <Container>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </Container>
    </div>
  );
};

export default PageNotFound;
