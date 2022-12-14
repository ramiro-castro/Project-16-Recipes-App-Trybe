const INITIAL_STATE = {
  recipes: [],
  isSearch: false,
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_RECIPES':
    return ({
      ...state,
      recipes: action.payload,
    });
  case 'SEARCH':
    return ({
      ...state,
      isSearch: !state.isSearch,
    });
  default:
    return state;
  }
};

export default recipesReducer;
