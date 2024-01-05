import { useSelector } from "react-redux";
import "./style.scss";

const Genres = ({ data }) => {
  let genresList = [];
  if (typeof data[0] === "object") {
    data.forEach((genre) => {
      genresList.push(genre.id);
    });
  } else {
    genresList = [...data];
  }
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {genresList.map((id) => {
        if (!genres[id]?.name) {
          console.log("nothing found", id, genres[id]);
          return;
        }
        return (
          <div className="genre" key={id}>
            {genres[id]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
