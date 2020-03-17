export const setOneOfSearchValues = (searchValue, option) => dispatch =>
  dispatch({
    type: 'setOneOfSearchValues',
    payload: { searchValue, option },
  });

export const setSortField = sortField => dispatch =>
  dispatch({
    type: 'setSortField',
    payload: sortField,
  });

export const setSortFieldCounter = sortFieldCounter => dispatch =>
  dispatch({
    type: 'setSortFieldCounter',
    payload: sortFieldCounter,
  });

export const setVirtualization = virtualization => dispatch =>
  dispatch({
    type: 'setVirtualization',
    payload: virtualization,
  });

export const setVacation = inVacation => dispatch =>
  dispatch({
    type: 'setVacation',
    payload: inVacation,
  });
