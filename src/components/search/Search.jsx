import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, MovieCard, Spinner } from "../index";
import fetchApi from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";

const Search = () => {
  const [data, setData] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useParams();
  const url = `/search/multi?query=${query}&page=${pageNum}`;

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchApi(url).then((res) => {
      setData(res);
      setIsLoading(false);
      setPageNum((prev) => prev + 1);
    });
  };

  const fetchData = () => {
    fetchApi(url).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data.results, ...res.results] });
        setPageNum((prev) => prev + 1);
      }
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  console.log("fetched data", data);
  return (
    <div className="searchResultsPage">
      {isLoading && <Spinner initial={true} />}
      {!isLoading && (
        <Container>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`search ${
                  data?.total_results > 1 ? "results" : "result"
                } ${query}`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results || []}
                next={fetchData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </Container>
      )}
    </div>
  );
};

export default Search;
