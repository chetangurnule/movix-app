import config from "../config/config.js";

const baseApiUrl = config.baseApiUrl;
const tmdbToken = config.tmdbToken;
const defaultOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbToken}`,
  },
};

const fetchApi = async (url, params = {}, options = {}) => {
  // Construct the URL with parameters
  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const apiUrl = baseApiUrl + url + (queryString ? `?${queryString}` : "");

  // Make the Fetch API request
  const response = await fetch(apiUrl, {
    ...defaultOptions,
    ...options,
  });

  return response.json();
};

export default fetchApi;
