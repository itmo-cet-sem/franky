let initState = { default: true };

export default (state = initState, action) => {
  if (action.type === 'TEST') {
    state = {
      test: true
    };
  }

  return state;
};