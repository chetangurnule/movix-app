import { useState, useEffect } from "react";
import fetchApi from "../../utils/api.js";

export default function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setData([]);
    setError(null);

    fetchApi(url)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [url]);
  return { isLoading, data, error };
}
