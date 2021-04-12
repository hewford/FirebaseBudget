import { useContext } from 'react';
import { UserContext } from 'utils/contexts/authProvider';
import {
  useFirestoreDocData,
  useFirestore,
} from 'reactfire';

export const useCategories = () => {
  const { budgetId } = useContext(UserContext);
  const budgetRef = useFirestore().collection('budgets').doc(budgetId);
  const { status, data: budget } = useFirestoreDocData(budgetRef);
  if (!budget)
    return [[], budgetRef];
  return [budget.categories, budgetRef];
};

export const useCategory = (categoryId) => {
  const [categories, budgetRef] = useCategories();
  const category = categories.find(
    category => category.id === categoryId
  ) || null;

  return [category, budgetRef];
};