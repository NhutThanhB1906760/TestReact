import { useEffect } from 'react';
import { useReducer } from './useReducer';

function fetchReducer(state, action) {
  switch (action.type) {
    case 'fetchAPI/request':
      return { ...state, loading: action.loading };
    case 'fetchAPI/success':
    case 'fetchAPI/error':
      return {
        ...state,
        loading: action.loading,
        error: action.error,
        data: action.data,
      };
    default:
      return state;
  }
}

export const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    (async () => {
      dispatch({
        type: 'fetchAPI/request',
        loading: true,
      });
      try {
        const res = await fetch(url);
        const { data } = await res.json();

        dispatch({
          type: 'fetchAPI/success',
          loading: false,
          error: null,
          data,
        });
      } catch (err) {
        dispatch({
          type: 'fetchAPI/error',
          loading: false,
          error: err,
          data: [],
        });
      }
    })();
  }, [url]);

  // return { data: state.data, loading: state.loading, error: state.error};
  return { ...state };
};