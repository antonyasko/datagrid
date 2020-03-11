/* eslint-disable no-case-declarations */
const initialState = {
  searchValues: {
    id: null,
    name: '',
    age: null,
    residence: '',
    gender: '',
    email: '',
    vacation: null,
  },
};

export default function mainReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'setOneOfSearchValues':
      const { searchValue, option } = payload;
      return {
        ...state,
        searchValues: {
          ...state.searchValues,
          [option]: searchValue,
        },
      };
    default:
      return state;
  }
}
