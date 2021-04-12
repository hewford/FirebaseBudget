import {
  addCategory,
  updateCategory,
  editCategory,
  addTransaction,
  editTransaction,
  deleteTransaction,
  addLocation
} from '../../methods/index';

export const submitDeleteTransaction2 = async(
  budgetRef,
  categories,
  categoryId,
  transactionId,
  displayToast
) => {
  await budgetRef.update({ categories: updateCategory(categories, categoryId, transactionId, deleteTransaction) })
    .then(() => {
      displayToast('Deleted transaction...');
    })
    .catch(err => {
      displayToast(err.message);
    });
};

export const submitEditTransaction2 = async(
  budgetRef,
  categories,
  categoryId,
  {name, ...transaction},
  displayToast
) => {
  let newCategories = updateCategory(categories, categoryId, transaction, editTransaction);
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
  let newCategories = updateCategory(categories, categoryId, transaction, addTransaction);

  if (rememberLocation) {
    newCategories = updateCategory(newCategories, categoryId, transaction.location, addLocation);
  }
  await budgetRef.update({ categories: newCategories })
    .then(() => {
      displayToast(`Posted $${transaction.amount} to ${name}.`);
    })
    .catch(err => {
      displayToast(err.message);
    });
};

export const createCategory2 = async(
  budgetRef,
  categories,
  category,
  displayToast
) => {
  await budgetRef.update({ categories: addCategory(categories, category) })
    .then(() => {
      displayToast(`Created new category: ${category.name}.`);
    })
    .catch(err => {
      displayToast(err.message);
    });
};

export const submitEdittedCategory2 = async(
  budgetRef,
  categories,
  category,
  displayToast
) => {
  await budgetRef.update({ categories: updateCategory(categories, category.id, category, editCategory) })
    .then(() => {
      displayToast(`Updated category: ${category.name}.`);
    })
    .catch(err => {
      displayToast(err.message);
    });
};
