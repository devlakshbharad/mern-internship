import { useEffect, useReducer } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type FetchAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: string };

function fetchReducer<T>(
  state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> {
  switch (action.type) {
    case "FETCH_START":
      return {
        data: null,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        data: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function useFetch<T>(url: string) {
  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "FETCH_START" });

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: T = await response.json();

        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Something went wrong",
        });
      }
    }

    fetchData();
  }, [url]);

  return state;
}