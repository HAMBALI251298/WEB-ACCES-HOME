const dataValidators = require('../libs/dataValidators');

let accountsData = [];

const setAccounts = (accounts) => {
  accountsData = [];
  for (let i = 0; i < accounts.length; i += 1) {
    accountsData.push(accounts[i]);
  }
};

const getAccounts = () => accountsData;

const addAccount = (accountData) => {
  const newAccounts = getAccounts();
  newAccounts.push(accountData);
  setAccounts(newAccounts);
};

// use this when the position of 1 or more accounts have changed.
const cleanAccounts = (accounts) => {
  const newAccounts = [];
  for (let i = 0; i < accounts.length; i += 1) {
    const currentAccount = accounts[i];
    currentAccount.id = i;
    newAccounts.push(currentAccount);
  }
  return newAccounts;
};

const tryChangeAccountStatus = (accountNumber, newStatus) => {
  let result = {
    success: false,
    reason: `The given account, which is ${accountNumber}, does not exist.`,
  };
  const accounts = getAccounts();
  const accountData = accounts.find(item => item.accountNumber === accountNumber);
  if (accountData !== undefined) {
    const oldStatus = accountData.status;
    accountData.status = newStatus;
    accounts[accountData.id] = accountData;
    setAccounts(accounts);
    result = {
      success: true,
      reason: `The account status has changed from ${oldStatus} to ${newStatus}.`,
    };
  }

  return result;
};

const tryDeleteAccount = (accountNumber, transactions) => {
  let result = {
    success: false,
    reason: `The given account number, which is ${accountNumber}, does not exist.`,
  };
  const accounts = getAccounts();
  const accountData = accounts.find(item => item.accountNumber === accountNumber);
  if (accountData !== undefined) {
    const newAccounts = accounts.filter(item => item.accountNumber !== accountNumber);
    setAccounts(cleanAccounts(newAccounts));
    // delete all transactions made with this account.
    transactions.deleteAccountTransactions(accountNumber);
    result = {
      success: true,
      reason: '',
    };
  }
  return result;
};

const getAccountData = (accountNumber) => {
  const accountData = getAccounts().find(item => item.accountNumber === accountNumber);
  return accountData;
};

const tryUpdateAccountBalance = (accountNumber, accountBalance) => {
  let result = {
    success: false,
    reason: `The given account, which is ${accountNumber}, does not exist.`,
  };
  const accounts = getAccounts();
  const accountData = accounts.find(item => item.accountNumber === accountNumber);
  if (accountData !== undefined) {
    accountData.balance = accountBalance;
    accounts[accountData.id] = accountData;
    setAccounts(accounts);
    result = {
      success: true,
      reason: 'Account balance successfully updated.',
    };
  }
  return result;
};

const accountTypes = ['savings', 'current'];
const minimumAccountCreationBalance = 200;

const validateDetails = (accountDetails) => {
  const accountTypeValidator = dataValidators.validateSetItem(accountDetails.type,
    accountTypes, 'account type');
  const minBalanceValidator = dataValidators.validateMinNumberValue(accountDetails.openingBalance,
    minimumAccountCreationBalance, 'opening balance');
  const todaysDate = new Date();
  const minimumExpiryDate = `19/03/${todaysDate.getFullYear() + 1}`;
  const idExpiryDateValidation = dataValidators.validateMinimumDate(accountDetails.idExpiryDate,
    minimumExpiryDate);
  const allValidations = [accountTypeValidator, minBalanceValidator, idExpiryDateValidation];
  const allValidationsChecker = dataValidators.checkAllValidations(allValidations);
  return {
    valid: allValidationsChecker.valid,
    reason: allValidationsChecker.reason,
  };
};

const validateAccountNumber = (accountNumber) => {
  const accountData = getAccounts().find(item => item.accountNumber === accountNumber);
  const result = accountData === undefined
    ? {
      valid: false,
      reason: `An account with the account number, ${accountNumber}, does not exist.`,
    } : {
      valid: true,
      reason: '',
    };
  return result;
};

const getTenDigitNum = () => {
  let resultNumber = Math.floor(Math.random() * (9 - 1) + 1).toString();
  for (let j = 0; j < 11; j += 1) {
    const randDigit = Math.floor(Math.random() * 10).toString();
    resultNumber += randDigit.toString();
  }
  return Number.parseInt(resultNumber, 10);
};

const generateAccountNumber = () => {
  const accountNumbers = getAccounts().map(account => Number.parseInt(account.accountNumber, 10));
  let resultAccountNumber = getTenDigitNum();
  const tryGetUniqueAccount = () => accountNumbers.find(item => item === resultAccountNumber);

  while (tryGetUniqueAccount() !== undefined) {
    resultAccountNumber = getTenDigitNum();
  }
  return resultAccountNumber;
};


module.exports = {
  description: 'This a module for managing bank accounts.',
  getAll: () => getAccounts(),
  getAccountData: accountNumber => getAccountData(accountNumber),
  add: accountData => addAccount(accountData),
  validateDetails: accountDetails => validateDetails(accountDetails),
  validateAccountNumber: accountNumber => validateAccountNumber(accountNumber),
  generateAccountNumber: () => generateAccountNumber(),
  tryChangeAccountStatus: (accountNumber,
    newStatus) => tryChangeAccountStatus(accountNumber, newStatus),
  tryDeleteAccount: (accountNumber, transactions) => tryDeleteAccount(accountNumber, transactions),
  tryUpdateAccountBalance: (accountNumber, accountBalance) => tryUpdateAccountBalance(accountNumber,
    accountBalance),
  count: () => Number.parseInt(getAccounts().length, 10),
};
