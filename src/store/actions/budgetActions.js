import {
  addCategory,
  updateCategory,
  addTransaction
} from '../../methods/index';

export const closePostAlert = () => {
  return { type: 'CLOSE_POST_ALERT' }
}

export const addExpense = (uid, category, transaction) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
        const budgetId = data.docs[0].id
        const budget = data.docs[0].data()
        const newBudget = updateCategory(budget, category.id, transaction, addTransaction)
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

export const createCategory = (uid, category) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('budgets')
      .where('userId', '==', uid)
      .get()
      .then(data => {
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
      })
  }
};

export const editCategory = (uid, category) => {
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


// export const updateForNewMonth = (user) => {
  // debugger
  
      
  // return (dispatch, getState, {getFirestore}) => {
  //   const firestore = getFirestore();
  //   firestore.collection('users')
  //     .doc(user.uid)
  //     .get()
  //     .then(doc => {
  //       const profile = doc.data()
  //       profile.budgetMonth = new Date().getMonth()

  //       firestore.collection('users')
  //           .doc(user.uid)
  //           .set(profile)
  //           .then(() => {
  //             firestore.collection('categories')
  //             .where('userId', '==', user.uid)
  //             .get()
  //             .then(categories => {
  //               categories.docs.forEach(doc => {

  //                 firestore.collection('categories')
  //                   .doc(doc.id)
  //                   .get()
  //                   .then(category => {
  //                     const data = category.data()
  //                     data.budgetOffSet = data.budget - calculateCurrentExpenses(data, true)

  //                     firestore.collection('categories')
  //                       .doc(category.id)
  //                       .set(data)
  //                       .then(() => {
  //                         dispatch({ type: 'UPDATED_FOR_NEW_MONTH', alertMsg: 'updated budget for new month'})
  //                       })
  //                       .catch(err => {
  //                         dispatch({ type: 'UPDATED_FOR_NEW_MONTH_ERROR', err });
  //                       });
  //                   })
  //               })
  //             })
  //           })
  //           .catch(err => {
  //             dispatch({ type: 'UPDATED_FOR_NEW_MONTH_ERROR', err });
  //           });
  //     })
  
  // }
// }
