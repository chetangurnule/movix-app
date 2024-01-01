import { useEffect } from "react";
import "./App.css";
import fetchApi from "./utils/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { Header, Footer } from "./components/index";
import { useDispatch } from "react-redux";
import { setUrl } from "./store/homeSlice";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApi("/configuration")
      .then((res) => res.json())
      .then((res) => {
        const url = {
          imageUrl: res.images.secure_base_url + "original",
        };
        dispatch(setUrl(url));
      });
  }, []);

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
