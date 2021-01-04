import axios from "axios";

import * as actionTypes from "./actionTypes";
import { fetchCharacterFail } from "./character";

// Fetching Starship
export const mergeStarship = (starship, characterIndex) => {
  return {
    type: actionTypes.MERGE_STARSHIP,
    starship: starship,
    characterIndex: characterIndex,
  };
};

export const fetchStarshipSuccess = (starship) => {
  return {
    type: actionTypes.FETCH_STARSHIP_SUCCESS,
    starship: starship,
  };
};

export const fetchStarship = (_url, characterIndex) => {
  // console.log("Charater: ", characterIndex);
  return (dispatch) => {
    axios
      .get(_url)
      .then((res) => {
        if (res && res.data) {
          dispatch(fetchStarshipSuccess(res.data));
          dispatch(mergeStarship(res.data, characterIndex));
        } else {
          dispatch(fetchCharacterFail({ message: "Something went wrong" }));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          // client received an error response (5xx, 4xx)
          dispatch(fetchCharacterFail(err.response.data));
        } else if (err.request && err.request.data) {
          // client never received a response, or request never left
          dispatch(fetchCharacterFail(err.request.data));
        } else {
          // anything else
          dispatch(fetchCharacterFail({ message: "Something went wrong" }));
        }
      });
  };
};
