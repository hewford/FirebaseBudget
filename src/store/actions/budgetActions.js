export const addExpense = (expense) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('categories')
        .doc(expense.id)
        .get()
        .then(doc => {
          const data = doc.data()
          const newExpense = {
            date: new Date(),
            spent: expense.spent,
            location: expense.location
          }
          const categoryName = data.category

          if (expense.rememberLocation) {
            if (!data.locations) data.locations = [];
            if (!data.locations.includes(expense.location)) data.locations.push(expense.location)
          }
          if (!data.expenses) data.expenses = []
          data.expenses.push(newExpense);
          firestore.collection('categories')
            .doc(expense.id)
            .set(data)
            .then(() => {
              const alertData = { categoryName, spent: expense.spent }
              dispatch({ type: 'NEW_EXPENSE_SUCCESS', alertData })
            })
            .catch(err => {
              dispatch({ type: 'NEW_EXPENSE_ERROR', err });
            });
        })
      
    }
};

export const closePostAlert = () => {
  return { type: 'CLOSE_POST_ALERT' }
}

// export const createCategory = () => {
//   return { type: 'CLOSE_POST_ALERT' }
// }

export const createCategory = (category) => {
  debugger
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    debugger
    firestore.collection('categories').add({
      ...category,
      userId,
    }).then(() => {
      debugger
      dispatch({ type: 'CREATE_CATEGORY_SUCCESS' });
    }).catch(err => {
      debugger
      dispatch({ type: 'CREATE_CATEGORY_ERROR' }, err);
    });
  }
};
