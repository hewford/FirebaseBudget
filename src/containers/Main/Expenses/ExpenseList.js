import ExpenseListItem from './ExpenseListItem';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import {
  getAllMonthsWithTransactions,
  getTransacationsWithinTimeframe
} from '../../../methods';
import { useCategory } from '../../../config/useCategories';
import { withRouter } from 'react-router-dom';

export const ExpenseList = ({ match }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [year, setYear] = useState(moment().format('YYYY'));
  const [category] = useCategory(match.params.id);

  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true);
    }, 750);
  });


  const handleMonthClick = (e) => {
    hasLoaded && setMonth(e.target.id);
  };

  const handleYearClick = (e) => {
    hasLoaded && setYear(e.target.id);
  };

  if (!category) return null;
  const timeframes = getAllMonthsWithTransactions(category);

  return (
    <div className={'disable_text_highlighting'}>
      {
        Object.entries(timeframes).sort(([a], [b]) => b - a).map(([yearKey, months], i) => {
          if (yearKey === year) {
            return (
              <div key={'year-list-' + i}>
                <div className={'active-year'}> {yearKey} </div>
                {months.map(monthKey => {
                  if (monthKey === month) {
                    const transactions = getTransacationsWithinTimeframe(category.transactions, yearKey, monthKey);
                    return (
                      <div key={monthKey}>
                        <div className={'active-month'}> {monthKey} </div>
                        {
                          transactions.map((transaction, i) => {
                            return (
                              <ExpenseListItem
                                categoryId={category.id}
                                expense={transaction}
                                key={`expense-${i}`}
                                month={monthKey}
                              />
                            );
                          })
                        }
                      </div>
                    );
                  } else {
                    return (
                      <div className={'non-active-month'} id={monthKey} key={monthKey} onClick={handleMonthClick}>{monthKey} </div>
                    );
                  }
                })}
              </div>
            );
          } else {
            return (
              <div className={'non-active-year'} id={yearKey} key={'year-list-' + i} onClick={handleYearClick}>{yearKey} </div>
            );
          }
        })
      }
    </div>
  );
};

ExpenseList.propTypes = {
  match: PropTypes.object,
};

export default withRouter(ExpenseList);

// route: Expense List
// renders Current Month Title not as button
// renders list of transactions for the current month as ExpenseListItem
// renders month buttons to view previous transactions
