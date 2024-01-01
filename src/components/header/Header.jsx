import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, InputField } from "../index";
import logo from "../../assets/movix-logo.svg";
import "./style.scss";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const slMenuClicked = () => {
    setMobileMenu(true);
  };

  const showSearchInput = () => {
    setShowSearch(!showSearch);
  };

  const vscChromeCloseClicked = () => {
    setMobileMenu(false);
  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  const controlnavbar = () => {
    if (window.scrollY > 200 && mobileMenu !== true) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlnavbar);

    return () => {
      window.removeEventListener("scroll", controlnavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowSearch(false);
  }, [location]);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <Container>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movies")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            Tv shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={showSearchInput} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={showSearchInput} />
          {mobileMenu ? (
            <VscChromeClose onClick={vscChromeCloseClicked} />
          ) : (
            <SlMenu onClick={slMenuClicked} />
          )}
        </div>
      </Container>
      {showSearch && (
        <div className="searchBar">
          <Container>
            <div className="searchInput">
              <InputField
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
