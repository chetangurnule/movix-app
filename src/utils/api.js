import config from "../config/config.js";

const baseApiUrl = config.baseApiUrl;
const tmdbToken = config.tmdbToken;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbToken}`,
  },
};

const fetchApi = async (url) => {
  const response = await fetch(baseApiUrl + url, options);
  return response.json();
};

export default fetchApi;
