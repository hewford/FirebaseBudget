const initState = {}

const budgetReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NEW_EXPENSE_SUCCESS':
      console.log('expense posted')
      const {spent, categoryName} = action.alertData
      const postMessage = `Posted $${spent} to ${categoryName}.`
      return {
        ...state,
        postMessage,
      }
    case 'NEW_EXPENSE_ERROR':
      console.log('expense post failed')
      return {
        ...state,
        postMessage: action.err.message
      }

    case 'CLOSE_POST_ALERT':
      console.log('closing post alert')
      return {
        ...state,
        postMessage: null
      }
    default:
      return state;
  }
};

export default budgetReducer;