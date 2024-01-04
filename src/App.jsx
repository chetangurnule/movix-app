import { useEffect } from "react";
import fetchApi from "./utils/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { Header, Footer } from "./components/index";
import { useDispatch } from "react-redux";
import { setUrl, setGenres } from "./store/homeSlice";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import "./App.css";
import config from "./config/config";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchApi("/configuration").then((res) => {
      const url = {
        imageUrl: res?.images?.secure_base_url + "original",
        base_bgImage_url: config.baseBgImageUrl,
      };
      dispatch(setUrl(url));
    });
  };

  const genresCall = async () => {
    const promises = [];
    const endPoints = ["tv", "movie"];
    const allGenres = {};

    endPoints.forEach((url) => promises.push(fetchApi(`/genre/${url}/list`)));
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((genre) => (allGenres[genre.id] = genre));
    });
    dispatch(setGenres(allGenres));
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
