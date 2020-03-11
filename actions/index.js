export const setOneOfSearchValues = (searchValue, option) => dispatch =>
  dispatch({
    type: 'setOneOfSearchValues',
    payload: { searchValue, option },
  });

export const setOneOfSearchValues111 = searchValues => dispatch =>
  dispatch({
    type: 'setOneOfSearchValues',
    payload: searchValues,
  });
