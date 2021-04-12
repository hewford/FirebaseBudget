import transitions from '@material-ui/core/styles/transitions';
import {
  addCategory,
  updateCategory,
  updateCategory2,
  editCategory,
  addTransaction,
  editTransaction,
  deleteTransaction,
  addLocation
} from '../../methods/index';

export const closePostAlert = () => {
  return { type: 'CLOSE_POST_ALERT' };
};

export const forceUpdateFirestore = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.get('budgets');
    dispatch({ type: 'UPDATED_FIRESTORE' });
  };
};

// export const subitEditTransaction = (uid, category, state) => {
//   const transaction = state;
//   return (dispatch, getState, {getFirestore}) => {
//     const firestore = getFirestore();
//     firestore.collection('budgets')
//       .where('userId', '==', uid)
//       .get()
//       .then(data => {
//         const budgetId = data.docs[0].id;
//         const budget = data.docs[0].data();
//         let newBudget = updateCategory(budget, category.id, transaction, editTransaction);
//         firestore.collection('budgets')
//           .doc(budgetId)
//           .set(newBudget)
//           .then(() => {
//             firestore.get('budgets');
//             const alertData = { categoryName: category.name, spent: transaction.amount };
//             dispatch({ type: 'NEW_EXPENSE_SUCCESS', alertData });
//           }).catch(err => {
//             dispatch({ type: 'NEW_EXPENSE_ERROR', err });
//           });
//       });
//   };
// };

export const submitDeleteTransaction = (categoryId, transactionId) => {
  return (dispatch, getState, {getFirestore}) => {
    const uid = getState().firebase.auth.uid;
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        const budgetId = data.docs[0].id;
        const budget = data.docs[0].data();
        let newBudget = updateCategory(budget, categoryId, transactionId, deleteTransaction);
        firestore.collection('budgets')
          .doc(budgetId)
          .set(newBudget)
          .then(() => {
            firestore.get('budgets');
            dispatch({ type: 'DELETE_TRANSACTION_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'DELETE_TRANSACTION_ERROR', err });
          });
      });
  };
};

export const subitEditTransaction2 = async(
  budgetRef,
  categories,
  categoryId,
  {name, ...transaction},
  displayToast
) => {
  let newCategories = updateCategory2(categories, categoryId, transaction, editTransaction);
  await budgetRef.update({ categories: newCategories })
    .then(() => {
      displayToast(`Edited ${name} transaction: $${transaction.amount}.`);
    })
    .catch(err => {
      displayToast(err.message);
    });
};

export const addExpense2 = async (
  budgetRef,
  categories,
  categoryId,
  { rememberLocation, name, ...transaction },
  displayToast
) => {
  let newCategories = updateCategory2(categories, categoryId, transaction, addTransaction);

  if (rememberLocation) {
    newCategories = updateCategory2(newCategories, categoryId, transaction.location, addLocation);
  }
  await budgetRef.update({ categories: newCategories })
    .then(() => {
      displayToast(`Posted $${transaction.amount} to ${name}.`);
    })
    .catch(err => {
      displayToast(err.message);
    });
};

// TODO: Delete below method
export const addExpense = (uid, category, state) => {
  const transaction = {
    amount: state.amount,
    location: state.location,
    description: state.description,
    deposit: state.deposit || false
  };
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        const budgetId = data.docs[0].id;
        const budget = data.docs[0].data();
        let newBudget = updateCategory(budget, category.id, transaction, addTransaction);
        if (state.rememberLocation) {
          newBudget = updateCategory(newBudget, category.id, state.location, addLocation);
        }
        firestore.collection('budgets')
          .doc(budgetId)
          .set(newBudget)
          .then(() => {
            firestore.get('budgets');
            const alertData = { categoryName: category.name, spent: transaction.amount };
            dispatch({ type: 'NEW_EXPENSE_SUCCESS', alertData });
          }).catch(err => {
            dispatch({ type: 'NEW_EXPENSE_ERROR', err });
          });
      });
  };
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
      firestore.get('budgets');
      dispatch({ type: 'CREATE_BUDGET_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_BUDGET_ERROR' }, err);
    });
  };
};

export const createCategory = (uid, category) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        if(data.docs.length === 0) {
          const newBudget = addCategory({ categories: [], userId: uid}, category);
          firestore.collection('budgets').add(newBudget)
            .then(() => {
              firestore.get('budgets');
              dispatch({ type: 'CREATE_CATEGORY_SUCCESS' });
            }).catch(err => {
              dispatch({ type: 'CREATE_CATEGORY_ERROR' }, err);
            });
        } else {
          const budgetId = data.docs[0].id;
          const budget = data.docs[0].data();
          const newBudget = addCategory(budget, category);
          firestore.collection('budgets')
            .doc(budgetId)
            .set(newBudget)
            .then(() => {
              firestore.get('budgets');
              dispatch({ type: 'CREATE_CATEGORY_SUCCESS' });
            }).catch(err => {
              dispatch({ type: 'CREATE_CATEGORY_ERROR' }, err);
            });
        }
      });
  };
};

export const submitEdittedCategory = (uid, category) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        const budgetId = data.docs[0].id;
        const budget = data.docs[0].data();
        const newBudget = updateCategory(budget, category.id, category, editCategory);
        firestore.collection('budgets')
          .doc(budgetId)
          .set(newBudget)
          .then(() => {
            firestore.get('budgets');
            dispatch({ type: 'UPDATED_CATEGORY', alertMsg: `updated ${category.name}`});
          })
          .catch(err => {
            dispatch({ type: 'UPDATE_CATEGORY_ERROR', err });
          });
      });
  };
};

export const updateExpenses = (expenses, id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('categories')
      .doc(id)
      .get()
      .then(category => {
        const data = category.data();
        data.expenses = expenses;

        firestore.collection('categories')
          .doc(category.id)
          .set(data)
          .then(() => {
            firestore.get('budgets');
            dispatch({ type: 'UPDATED_EXPENSE', alertMsg: `updated ${data.category}`});
          })
          .catch(err => {
            dispatch({ type: 'UPDATE_EXPENSE_ERROR', err });
          });
      });
  };
};
