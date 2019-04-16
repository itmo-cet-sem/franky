let testAction = (id, data) => {
  return {
    type: 'TEST',
    payload: {
      id: id,
      data: data
    }
  }
};