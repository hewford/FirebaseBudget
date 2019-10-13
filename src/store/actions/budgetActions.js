import {
  addCategory,
  updateCategory,
  editCategory,
  addTransaction,
  editTransaction,
  addLocation
} from '../../methods/index';

export const closePostAlert = () => {
  return { type: 'CLOSE_POST_ALERT' }
}

export const forceUpdateFirestore = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.get("budgets")
    dispatch({ type: 'UPDATED_FIRESTORE' })
  }
}

export const subitEditTransaction = (uid, category, state) => {
  const transaction = state
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        const budgetId = data.docs[0].id
        const budget = data.docs[0].data()
        let newBudget = updateCategory(budget, category.id, transaction, editTransaction)
        debugger
        firestore.collection('budgets')
        .doc(budgetId)
        .set(newBudget)
        .then(() => {
          firestore.get("budgets")
          const alertData = { categoryName: category.name, spent: transaction.amount }
          dispatch({ type: 'NEW_EXPENSE_SUCCESS', alertData })
        }).catch(err => {
          dispatch({ type: 'NEW_EXPENSE_ERROR', err });
        });
      })
    }
};

export const addExpense = (uid, category, state) => {
  const transaction = {
    amount: state.amount,
    location: state.location,
    description: state.description,
    deposit: state.deposit || false
  }
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        const budgetId = data.docs[0].id
        const budget = data.docs[0].data()
        let newBudget = updateCategory(budget, category.id, transaction, addTransaction)
        if (state.rememberLocation) {
          newBudget = updateCategory(newBudget, category.id, state.location, addLocation)
        }
        debugger
        firestore.collection('budgets')
        .doc(budgetId)
        .set(newBudget)
        .then(() => {
          firestore.get("budgets")
          const alertData = { categoryName: category.name, spent: transaction.amount }
          dispatch({ type: 'NEW_EXPENSE_SUCCESS', alertData })
        }).catch(err => {
          dispatch({ type: 'NEW_EXPENSE_ERROR', err });
        });
      })
    }
};

export const createBudget = () => {
  return (dispatch, getState, {getFirestore}) => {
    // firestoreAddBudget()
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    firestore.collection('categories').add({
      categories: [],
      userId,
    }).then(() => {
      firestore.get("budgets")
      dispatch({ type: 'CREATE_BUDGET_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_BUDGET_ERROR' }, err);
    });
  }
};

export const createCategory = (uid, category) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        if(data.docs.length === 0) {
          const newBudget = addCategory({ categories: [], userId: uid}, category)
          firestore.collection('budgets').add(newBudget)
          .then(() => {
            firestore.get("budgets")
            dispatch({ type: 'CREATE_CATEGORY_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'CREATE_CATEGORY_ERROR' }, err);
          });
        } else {
          const budgetId = data.docs[0].id
          const budget = data.docs[0].data()
          const newBudget = addCategory(budget, category)
          firestore.collection('budgets')
          .doc(budgetId)
          .set(newBudget)
          .then(() => {
            firestore.get("budgets")
            dispatch({ type: 'CREATE_CATEGORY_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'CREATE_CATEGORY_ERROR' }, err);
          });
        }
      })
  }
};

export const submitEdittedCategory = (uid, category) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        const budgetId = data.docs[0].id
        const budget = data.docs[0].data()
        const newBudget = updateCategory(budget, category.id, category, editCategory)
        firestore.collection('budgets')
        .doc(budgetId)
        .set(newBudget)
        .then(() => {
          firestore.get("budgets")
          dispatch({ type: 'UPDATED_CATEGORY', alertMsg: `updated ${category.name}`})
        })
        .catch(err => {
          dispatch({ type: 'UPDATE_CATEGORY_ERROR', err });
        });
      })
    }
};

export const updateExpenses = (expenses, id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('categories')
      .doc(id)
      .get()
      .then(category => {
        const data = category.data()
        data.expenses = expenses

        firestore.collection('categories')
          .doc(category.id)
          .set(data)
          .then(() => {
            firestore.get("budgets")
            dispatch({ type: 'UPDATED_EXPENSE', alertMsg: `updated ${data.category}`})
          })
          .catch(err => {
            dispatch({ type: 'UPDATE_EXPENSE_ERROR', err });
          });
      })
  }
};
