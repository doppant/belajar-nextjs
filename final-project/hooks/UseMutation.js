import { useCallback, useState } from "react";

export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const mutate = useCallback(async ({ url = "", method = "POST", payload = {}, headers = {} } = {}) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          ...headers,
        },
        ...(method !== "GET" && { body: JSON.stringify(payload) }),
      });
      const result = await response.json();
      setData(prevData => ({
        ...prevData,
        data: result,
        isLoading: false,
      }));
      return result;
    } catch (error) {
      setData(prevData => ({
        ...prevData,
        isError: true,
        isLoading: false,
      }));
      return error;
    }
  }, []);

  return { ...data, mutate };
};
