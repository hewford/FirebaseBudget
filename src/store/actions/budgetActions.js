import { calculateCurrentExpenses } from '../../utils/calculations'


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

export const updateForNewMonth = (user) => {
  // debugger
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const profile = doc.data()
        profile.budgetMonth = new Date().getMonth()

        firestore.collection('users')
            .doc(user.uid)
            .set(profile)
            .then(() => {
              firestore.collection('categories')
              .where('userId', '==', user.uid)
              .get()
              .then(categories => {
                categories.docs.forEach(doc => {

                  firestore.collection('categories')
                    .doc(doc.id)
                    .get()
                    .then(category => {
                      const data = category.data()
                      data.budgetOffSet = data.budget - calculateCurrentExpenses(data, true)

                      firestore.collection('categories')
                        .doc(category.id)
                        .set(data)
                        .then(() => {
                          dispatch({ type: 'UPDATED_FOR_NEW_MONTH', alertMsg: 'updated budget for new month'})
                        })
                        .catch(err => {
                          dispatch({ type: 'UPDATED_FOR_NEW_MONTH_ERROR', err });
                        });
                    })
                })
              })
            })
            .catch(err => {
              dispatch({ type: 'UPDATED_FOR_NEW_MONTH_ERROR', err });
            });
      })
  
  }
}

export const closePostAlert = () => {
  return { type: 'CLOSE_POST_ALERT' }
}

// export const createCategory = () => {
//   return { type: 'CLOSE_POST_ALERT' }
// }

export const createCategory = (category) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    firestore.collection('categories').add({
      ...category,
      userId,
    }).then(() => {

      dispatch({ type: 'CREATE_CATEGORY_SUCCESS' });
    }).catch(err => {

      dispatch({ type: 'CREATE_CATEGORY_ERROR' }, err);
    });
  }
};

export const editCategory = (budget, color, name, id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('categories')
      .doc(id)
      .get()
      .then(category => {
        const data = category.data()
        data.category = name
        data.budget = budget
        data.color = color

        firestore.collection('categories')
          .doc(category.id)
          .set(data)
          .then(() => {
            dispatch({ type: 'UPDATED_CATEGORY', alertMsg: `updated ${name}`})
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
            dispatch({ type: 'UPDATED_EXPENSE', alertMsg: `updated ${data.category}`})
          })
          .catch(err => {
            dispatch({ type: 'UPDATE_EXPENSE_ERROR', err });
          });
      })
  }
};

