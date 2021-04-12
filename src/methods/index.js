import uniqid from 'uniqid';
import moment from 'moment';

export const addTransaction = (category, transaction) => {
  const defaultProps = {
    timestamp:  Date.now(),
    id: uniqid.process(),
    deposit: false
  };

  return {
    ...category,
    transactions: [...category.transactions, {
      ...defaultProps,
      ...transaction
    }]
  };
};

export const editTransaction = (category, updatedTransaction) => {
  return {
    ...category,
    transactions: category.transactions.map(transaction => transaction.id === updatedTransaction.id
      ? {...transaction, ...updatedTransaction}
      : transaction
    )
  };
};

export const deleteTransaction = (category, transactionId) => {
  return {
    ...category,
    transactions: category.transactions.filter(transaction => transaction.id !== transactionId)
  };
};

export const addLocation = (category, location) => hasLocation(category, location)
  ? category
  : { ...category, locations: [...category.locations, location]};

export const editCategory = (category, updatedInfo) => {
  const currentTimeframe = moment().format('MMMM YYYY');
  const transaction = category.transactions.find(transaction => {
    const timeframe = moment(transaction.timestamp).format('MMMM YYYY');
    return currentTimeframe === timeframe && transaction.monthStartDeposit;
  });
  const newCategory = editTransaction(
    {...category, ...updatedInfo},
    {...transaction, amount: updatedInfo.budget}
  );
  return {...category, ...updatedInfo};
};

export const updateCategory = (budget, categoryId, data, action) => {
  return {
    ...budget,
    categories: budget.categories
      .map(category => category.id === categoryId ? action(category, data) : category)
  };
};

export const updateCategory2 = (categories, categoryId, data, action) => {
  return categories.map(category => category.id === categoryId ? action(category, data) : category);};

export const addCategory = (budget, category) => {
  if (!category.budget) throw new Error('categories require a budget amount');
  const defaultProps = {
    locations: [],
    transactions: [],
    color: 'black',
    id: uniqid.process()
  };

  const initialDeposit = {
    monthStartDeposit: true,
    amount: category.budget,
    deposit: true,
    description: 'Deposit budget amount'
  };

  const updatedCategory = addTransaction({...defaultProps, ...category}, initialDeposit);

  return {
    ...budget,
    categories: [...budget.categories, updatedCategory]
  };
};


export const getAllMonthsWithTransactions = category => {
  return category.transactions
    .sort((a, b)=> b.timestamp - a.timestamp)
    .reduce((timeframes, transaction) => {
      let year = moment(transaction.timestamp).format('YYYY');
      let month = moment(transaction.timestamp).format('MMMM');

      if (!timeframes[year]) timeframes[year] = [month];
      else if (!timeframes[year].includes(month)) timeframes[year].push(month);

      return timeframes;
    }, {});
};

export const getCategoryBalance = category => Math.round(category.transactions
  .reduce((balance, transaction) => {
    if (transaction.deposit) balance += Math.abs(transaction.amount);
    else balance -= Math.abs(transaction.amount);
    return balance;
  }, 0)*100)/100;

export const getAllTransactions = categories => {

};

export const getTransacationsWithinTimeframe = (transactions, filterYear, filterMonth) => {
  return transactions.reduce((filteredTransactions, transaction) => {
    let year = moment(transaction.timestamp).format('YYYY');
    let month = moment(transaction.timestamp).format('MMMM');
    if (filterMonth === month
        && filterYear === year) {
      filteredTransactions.push(transaction);
    }
    return filteredTransactions;
  }, []);

};

const hasLocation = (category, newLocation) => {
  return category.locations.some(location => {
    return removeWhiteSpace(location.toLowerCase()) === removeWhiteSpace(newLocation.toLowerCase());
  });
};

const removeWhiteSpace = (string) => {
  return string.replace(/\s+/gm, '');
};