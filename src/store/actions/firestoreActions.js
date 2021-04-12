// export const firestoreAddCategory = (dispatch, getState, {getFirestore}) => {

// };

export const firestoreAddBudget = (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();

  const userId = getState().firebase.auth.uid;
  firestore.collection('budgets').add({
    categories: [],
    userId,
  }).then(() => {
    firestore.get('budgets');
    dispatch({ type: 'CREATE_BUDGET_SUCCESS' });
  }).catch(err => {
    dispatch({ type: 'CREATE_BUDGET_ERROR' }, err);
  });
};
