import React, { useState, useContext } from 'react';
// import { withRouter } from 'react-router-dom';
// import {connect} from 'react-redux';
// import {firestoreConnect} from 'react-redux-firebase';
// import { compose } from 'redux';
import PropTypes from 'prop-types';
import './expenseList.css';
import * as moment from 'moment';
// import { submitDeleteTransaction } from '../../../store/actions/budgetActions';
import TouchHoldContainer from '../../../core/TouchHoldContainer';
import { RouteContext } from 'utils/contexts/routeProvider';

export const ExpenseListItem = ({
  categoryId,
  expense,
  history,
  submitDeleteTransaction,
}) => {
  const router = useContext(RouteContext);
  const [promptDelete, setPromptDelete] = useState(false);

  const handleCancel = () => {
    setPromptDelete(false);
  };

  const handleDelete = async() => {
    await submitDeleteTransaction(expense.id);
    setPromptDelete(false);
  };

  const handleTouchHold = () => {
    setPromptDelete(true);
  };

  const handleClick = () => {
    router.navigate('/edit-expense', {categoryId, expenseId: expense.id});
    history.push(`/edit-expense/${categoryId}/${expense.id}`);
  };

  const { timestamp, location, amount, description, deposit } = expense;

  if (promptDelete) {
    return (
      <div className={'card white'}>
        <div className={'card-content black-text'}>
          <div className={'card-title red-text'}>
                        Delete Transaction?
          </div>
          <p className={`summary-spent ${deposit ? 'green-text' : 'red-text' } text-darken-2`}>${amount}</p>
          <p className={'delete_options'}>
            <span className={'bold delete_yes'} onClick={handleDelete}>Yes</span >
            <span className={'bold delete_no'} onClick={handleCancel}>No</span>
          </p>
        </div>
      </div>
    );
  }
  return (
    <TouchHoldContainer
      handleClick={handleClick}
      handleTouchHold={handleTouchHold}
    >
      <div className={'card-content black-text'}>
        <p className={'category-summary'}><span className={'bold'}>Date: </span>{moment(timestamp).format('l')}</p>
        <p className={`summary-spent ${deposit ? 'green-text' : 'red-text' } text-darken-2`}>${amount}</p>
        <p className={'category-summary'}><span className={'bold'}>Location: </span>{location}</p>
        <p className={'category-summary'}><span className={'bold'}>Description: </span>{description}</p>
      </div>
    </TouchHoldContainer>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     submitDeleteTransaction: (categoryId, transactionId) => dispatch(submitDeleteTransaction(categoryId, transactionId)),
//   };
// };

ExpenseListItem.propTypes = {
  categoryId: PropTypes.string,
  expense: PropTypes.any,
  submitDeleteTransaction: PropTypes.func,
  history: PropTypes.any,
};

export default ExpenseListItem;

// export default compose(connect(null, mapDispatchToProps), firestoreConnect(() => {
//   return [];
// }))(withRouter(ExpenseListItem));

