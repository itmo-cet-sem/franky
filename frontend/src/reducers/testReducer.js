let initState= { default: true };

let testReducer = (state = initState, action) => {
  if (action.type === 'TEST') {
    state = {
      test: true
    };
  }

  return state;
};

export default testReducer;