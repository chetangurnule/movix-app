import { useSelector } from "react-redux";
import "./style.scss";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data.map((id) => {
        if (!genres[id]?.name) return;
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
