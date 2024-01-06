import React from "react";
import { Carousel, useFetch } from "../../index";

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  console.log(data);
  return (
    <div className="similar">
      {data?.results?.length > 0 && (
        <Carousel
          title={title}
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
      )}
    </div>
  );
};

export default Similar;
