/* eslint-disable no-case-declarations */
const initialState = {
  searchValues: {
    id: null,
    name: '',
    age: null,
    residence: '',
    gender: '',
    email: '',
  },
  sortField: null,
  sortFieldCounter: 0,
  virtualization: true,
  inVacation: true,
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
    case 'setSortField':
      return {
        ...state,
        sortField: payload,
      };
    case 'setSortFieldCounter':
      return {
        ...state,
        sortFieldCounter: payload,
      };
    case 'setVirtualization':
      return {
        ...state,
        virtualization: payload,
      };
    case 'setVacation':
      return {
        ...state,
        inVacation: payload,
      };
    default:
      return state;
  }
}
