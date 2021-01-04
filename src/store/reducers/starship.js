import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  starships: null,
  selectedStarship: null,
};

const fetchStarshipsSuccess = (state, action) => {
  let newStarships = [...(state.starships ? state.starships : [])];
  if (
    !(
      newStarships.length &&
      newStarships.find((ship) => ship.name === action.starship.name)
    )
  ) {
    newStarships.push(action.starship);
  }
  return updateObject(state, {
    starships: newStarships,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch starships
    case actionTypes.FETCH_STARSHIP_SUCCESS:
      return fetchStarshipsSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
