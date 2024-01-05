import React from "react";
import { DetailsBanner, useFetch, Trailer, Similar } from "../../components";
import { useParams } from "react-router-dom";
import { Cast } from "../../components";
import "./style.scss";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, isLoading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  console.log(credits);
  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} isLoading={creditsLoading} />
      <Trailer data={data} isLoading={isLoading} />
      <Similar mediaType={mediaType} id={id} />
    </>
  );
};

export default Details;
