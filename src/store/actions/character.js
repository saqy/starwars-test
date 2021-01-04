import axios from "axios";

import * as actionTypes from "./actionTypes";
import { fetchStarship } from "./starship";
const _URL = "http://swapi.dev/api/people/";

// Fetching Character
const fetchCharacterStart = () => {
  return {
    type: actionTypes.FETCH_CHARACTER_START,
  };
};

export const fetchCharacterSuccess = (characters, page) => {
  return {
    type: actionTypes.FETCH_CHARACTER_SUCCESS,
    characters: characters,
    page: page ? page : 1,
  };
};

export const fetchCharacterFail = (error) => {
  return {
    type: actionTypes.FETCH_CHARACTER_FAIL,
    error: error,
  };
};

export const fetchCharacter = (_url) => {
  return (dispatch) => {
    dispatch(fetchCharacterStart());
    axios
      .get(_url ? _url : _URL)
      .then((res) => {
        if (res && res.data) {
          const current_url = new URL(_url ? _url : _URL);
          // get access to URLSearchParams object
          const search_params = current_url.searchParams;
          const page = search_params.get("page");
          dispatch(fetchCharacterSuccess(res.data, page));
          // Fetch Starsips for 9th character
          for (let i = 0; i < res.data?.results.length; i++) {
            const character = res.data?.results[i];
            if (character?.starships) {
              for (let index = 0; index < character?.starships.length; index++) {
                const link = character?.starships[index];
                dispatch(fetchStarship(link, i));
              }
            } 
          }
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

//  Select character
export const selectCharacter = (character) => {
  return {
    type: actionTypes.SELECT_CHARACTER,
    character: character,
  };
};
