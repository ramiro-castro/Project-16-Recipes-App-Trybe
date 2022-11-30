const INITIAL_STATE = {
  recipes: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_RECIPES':
    return ({
      ...state,
      recipes: action.payload,
    });
  default:
    return state;
  }
};

export default recipesReducer;
