import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./style.scss";

const Img = ({ src, className = "", alt = "", onLoad }) => {
  console.log(className);
  return (
    <LazyLoadImage
      className={className}
      alt={alt}
      effect="blur"
      src={src}
      onLoad={onLoad}
    />
  );
};
export default Img;
