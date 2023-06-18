const dataValidators = require('../libs/dataValidators');

const minimumBalance = 200;

let transactionsData = [];

const setTransactions = (transactions) => {
  transactionsData = [];
  for (let i = 0; i < transactions.length; i += 1) {
    transactionsData.push(transactions[i]);
  }
};

const getTransactions = () => transactionsData;

const add = (transactionData) => {
  const newTransactions = getTransactions();
  newTransactions.push(transactionData);
  setTransactions(newTransactions);
};

const cleanTransactions = (oldTransactions) => {
  const newTransactions = [];
  for (let i = 0; i < oldTransactions.length; i += 1) {
    const currentTransaction = oldTransactions[i];
    currentTransaction.id = i;
    newTransactions.push(currentTransaction);
  }
  return newTransactions;
};

const deleteAccountTransactions = (accountNumber) => {
  const newTransactions = getTransactions().filter(item => item.accountNumber !== accountNumber);
  setTransactions(cleanTransactions(newTransactions));
};

const tryMakeTransaction = (transactionDetails, accounts) => {
  const transactionAccount = accounts.getAccountData(transactionDetails.accountNumber);
  const accStatus = transactionAccount.status;
  const accountTransferStatusValid = dataValidators.validateAccountTransferStatus(accStatus);
  const transactionBalance = transactionDetails.type === 'credit'
    ? transactionAccount.balance + transactionDetails.amount
    : transactionAccount.balance - transactionDetails.amount;
  let result = accountTransferStatusValid.valid
    ? {
      success: false,
      result: {},
      reason: 'Inadequate funds.',
    } : {
      success: accountTransferStatusValid.valid,
      result: {},
      reason: accountTransferStatusValid.reason,
    };
  const transactions = getTransactions();
  if (transactionBalance >= minimumBalance && accountTransferStatusValid.valid) {
    const newTransaction = {
      id: transactions.length,
      createdOn: new Date(),
      type: transactionDetails.type,
      accountNumber: transactionDetails.accountNumber,
      cashier: transactionDetails.cashier,
      amount: transactionDetails.amount,
      oldBalance: transactionAccount.balance,
      newBalance: transactionBalance,
    };
    transactions.push(newTransaction);
    setTransactions(transactions);
    // update the account.
    const accountUpdateResult = accounts.tryUpdateAccountBalance(transactionDetails.accountNumber,
      transactionBalance);
    result = {
      success: true,
      result: newTransaction,
      reason: accountUpdateResult.reason,
    };
  }

  return result;
};

module.exports = {
  description: 'This is a module for managing account transactions.',
  getAll: getTransactions,
  add: transactionData => add(transactionData),
  deleteAccountTransactions: accountNumber => deleteAccountTransactions(accountNumber),
  tryMakeTransaction: (transactionDetails,
    accounts) => tryMakeTransaction(transactionDetails, accounts),
};
