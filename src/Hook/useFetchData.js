import { useEffect, useReducer } from "react";
const postsReducer = (state, action) => {
  const { type, key } = action;

  switch (type) {
    case "REQUEST":
      return {
        ...state,
        loading: true,
        // isLoading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        [key]: action.data,
      };
    case "FAILED":
      return {
        ...state,
        error: true,
      };

    default:
      throw new Error();
  }
};

export default function useFetchData(getPromiseFunc, stateKey) {
  const [state, dispatch] = useReducer(postsReducer, {});
  useEffect(() => {
    let didCancel = false;

    dispatch({ type: "REQUEST", key: stateKey });
    (async () => {
      try {
        const result = await getPromiseFunc();
        if (!didCancel) {
          dispatch({ type: "SUCCESS", data: result.data, key: stateKey });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FAILED", key: stateKey });
        }
      }
    })();

    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
