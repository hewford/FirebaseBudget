import { useContext } from 'react';
import { UserContext } from 'utils/contexts/authProvider';
import {
  useFirestoreDocData,
  useFirestore,
} from 'reactfire';
import { addExpense2, subitEditTransaction2 } from 'store/actions/budgetActions';
import { ToastContext } from 'utils/contexts/toastProvider';

export const useCategories = () => {
  const { budgetId } = useContext(UserContext);
  const budgetRef = useFirestore().collection('budgets').doc(budgetId);
  const { data: budget } = useFirestoreDocData(budgetRef);
  if (!budget)
    return [[], budgetRef];
  return [budget.categories, budgetRef];
};

export const useCategory = (categoryId) => {
  const { displayToast } = useContext(ToastContext);

  const [categories, budgetRef] = useCategories();
  const category = categories.find(
    category => category.id === categoryId
  ) || null;

  return [category, {
    addExpense: (state) => addExpense2(budgetRef, categories, categoryId, state, displayToast),
    subitEditTransaction: (state) => subitEditTransaction2(budgetRef, categories, categoryId, state, displayToast)
  }];
};

export const useTransaction = (categoryId, expenseId) => {
  const [category, actions] = useCategory(categoryId);

  if (!category) return [];
  const transaction = category.transactions
    .find(transaction => transaction.id === expenseId);

  return [
    transaction,
    category,
    actions
  ];
};