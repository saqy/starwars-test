import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  characters: null,
  error: null,
  loading: false,
  selectedCharacter: null,
  next: null,
  previous: null,
  count: null,
  page: null,
};

// Fetch characters
const fetchCharactersStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, characters: null });
};

const fetchCharactersSuccess = (state, action) => {
  return updateObject(state, {
    characters: action.characters.results,
    next: action.characters.next,
    previous: action.characters.previous,
    count: action.characters.count,
    page: action.page,
    error: null,
    loading: false,
  });
};

// Merging starships in characters
const mergeStarshipInCharacter = (state, action) => {
  // Merging
  if (state.characters) {
    const newCharacters = [...state.characters];
    const character =
      newCharacters.length && newCharacters[action.characterIndex];

    if (typeof character?.starships[0] === "string") {
      character.starships = [];
    }
    character.starships.push(action.starship);

    newCharacters[action.characterIndex] = character;
    return updateObject(state, {
      characters: newCharacters,
      error: null,
      loading: false,
    });
  } else {
    return state
  }
};

const fetchCharactersFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    next: null,
    previous: null,
    count: null,
  });
};

// Select character
const selectCharacter = (state, action) => {
  return updateObject(state, {
    selectedCharacter: action.character,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch characters
    case actionTypes.FETCH_CHARACTER_START:
      return fetchCharactersStart(state, action);
    case actionTypes.FETCH_CHARACTER_SUCCESS:
      return fetchCharactersSuccess(state, action);
    case actionTypes.FETCH_CHARACTER_FAIL:
      return fetchCharactersFail(state, action);

    // Select character
    case actionTypes.SELECT_CHARACTER:
      return selectCharacter(state, action);

    case actionTypes.MERGE_STARSHIP:
      return mergeStarshipInCharacter(state, action);
    default:
      return state;
  }
};

export default reducer;
