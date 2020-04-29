import React from "react";
import { AuthContext } from "../App";
import Card from "./Card";
const initialState = {
  tracks: [],
  isFetching: false,
  hasError: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TRACKS_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_TRACKS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        tracks: action.payload,
      };
    case "FETCH_TRACKS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};
export const Home = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    dispatch({
      type: "FETCH_TRACKS_REQUEST",
    });
    fetch(`${process.env.REACT_APP_API_SERVER}/tracks`, {
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        console.log(resJson);
        dispatch({
          type: "FETCH_TRACKS_SUCCESS",
          payload: resJson,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "FETCH_TRACKS_FAILURE",
        });
      });
  }, [authState.token]);

  return (
    <React.Fragment>
      <div className="home">
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.tracks.length > 0 &&
              state.tracks.map((track) => (
                <Card key={track.id.toString()} track={track} />
              ))}
          </>
        )}
      </div>
    </React.Fragment>
  );
};
export default Home;
