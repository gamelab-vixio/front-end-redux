export const IS_TOGGLE = 'IS_TOGGLE';
export const IS_DROPDOWN = 'IS_DROPDOWN';
export const IS_SEARCH = 'IS_SEARCH';

const initialState = {
  isToggle: false,
  isDropdownOpen: false,
  isSearch: false,
};

// reducers
/* NOTE : REMEMBER IMMUTABILITY PRINCIPLE
DONT FORGET TO USE ...STATE WHEN RETURNING
*/

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_TOGGLE:
      return {
        ...state,
        isToggle: !state.isToggle,
      };
    case IS_DROPDOWN:
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen,
      };
    case IS_SEARCH:
      return {
        ...state,
        isSearch: !state.isSearch,
      };
    default:
      return state;
  }
};

// actions
// async already supported
export const isToggle = () => {
  return dispatch => {
    dispatch({
      type: IS_TOGGLE,
    });
  };
};

export const isDropdown = () => {
  return dispatch => {
    dispatch({
      type: IS_DROPDOWN,
    });
  };
};

export const isSearch = () => {
  return dispatch => {
    dispatch({
      type: IS_SEARCH,
    });
  };
};
