const dataValidators = require('../libs/dataValidators');

const minimumAge = 16;
let usersData = [
  {
    id: 0,
    firstName: 'Declan',
    lastName: 'Sharpe',
    email: 'dsharpe@qmail.com',
    sex: 'male',
    dateOfBirth: '7/9/1983',
    phoneNumber: 8063297845,
    password: 'DecLanShaRpe_@##2350',
    type: 'staff',
    isAdmin: true,
  },
];

const setUsers = (users) => {
  const newUsersData = [];
  for (let i = 0; i < users.length; i += 1) {
    newUsersData.push(users[i]);
  }
  usersData = newUsersData;
};

const getUsers = () => usersData;

const hasEmail = email => getUsers().find(item => item.email === email) !== undefined;

const hasCorrectPassword = (email, password) => getUsers().find(item => item.email === email
    && item.password === password) !== undefined;

const getUserData = (email, password) => getUsers().find(item => item.email === email
  && item.password === password);

const findUserById = (id) => {
  const userData = getUsers().find(item => item.id === id);
  const result = {
    user: userData,
    reason: '',
  };
  if (userData === undefined) {
    result.reason = `The user with id, ${id}, does not exist.`;
  }
  return result;
};

const findClientById = (id) => {
  const clientData = getUsers().find(item => item.id === id
    && item.type === 'client');
  const result = clientData === undefined
    ? {
      user: clientData,
      reason: `The client with id, ${id}, does not exist.`,
    } : {
      user: clientData,
      reason: '',
    };

  return result;
};

const findStaffById = (id) => {
  const staffData = getUsers().find(item => item.id === id
    && item.type === 'staff');
  const result = staffData === undefined
    ? {
      user: staffData,
      reason: `The staff with id, ${id}, does not exist.`,
    } : {
      user: staffData,
      reason: '',
    };

  return result;
};

const findCashierById = (id) => {
  const cashierData = getUsers().find(item => item.id === id
    && item.type === 'staff' && item.isAdmin === false);
  const result = cashierData === undefined
    ? {
      user: cashierData,
      reason: `The cashier with id, ${id}, does not exist.`,
    } : {
      user: cashierData,
      reason: '',
    };

  return result;
};

const findAdminById = (id) => {
  const adminData = getUsers().find(item => item.id === id
    && item.isAdmin === true);
  const result = adminData === undefined
    ? {
      user: adminData,
      reason: `An admin with id, ${id}, does not exist.`,
    } : {
      user: adminData,
      reason: '',
    };

  return result;
};

const validateClientId = (id) => {
  const clientData = findClientById(id);
  const result = clientData.user === undefined
    ? {
      valid: false,
      reason: `A client with the id, ${id}, does not exist.`,
    } : {
      valid: true,
      reason: '',
    };

  return result;
};

const validateStaffId = (id) => {
  const staffData = findStaffById(id);
  const result = staffData.user === undefined
    ? {
      valid: false,
      reason: `A staff with the id, ${id}, does not exist.`,
    } : {
      valid: true,
      reason: '',
    };

  return result;
};

const validateCashierId = (id) => {
  const cashierData = findCashierById(id);
  const result = cashierData.user === undefined
    ? {
      valid: false,
      reason: `A cashier with the id, ${id}, does not exist.`,
    } : {
      valid: true,
      reason: '',
    };

  return result;
};

const validateAdminId = (id) => {
  const adminData = findAdminById(id);
  const result = adminData.user === undefined
    ? {
      valid: false,
      reason: `An admin with the id, ${id}, does not exist.`,
    } : {
      valid: true,
      reason: '',
    };

  return result;
};

const tryFindAdminById = (id) => {
  const result = validateAdminId(id);
  return {
    success: result.valid,
    reason: result.reason,
  };
};

const addUser = (user) => {
  const oldUsers = getUsers();
  if (oldUsers.find(item => item.email === user.email) === undefined) {
    oldUsers.push(user);
    setUsers(oldUsers);
  }
};

const removeUserById = (id) => {
  const oldUsers = getUsers().filter(item => item.id !== id);
  setUsers(oldUsers);
};

const removeUserByEmail = (email) => {
  const oldUsers = getUsers().filter(item => item.email !== email);
  setUsers(oldUsers);
};

const dateToString = date => `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;

const validateUser = (userDetails) => {
  const dobStr = dateToString(userDetails.dateOfBirth);
  const minYear = new Date().getFullYear() - minimumAge;
  const maximumDOB = new Date(`12 / 31 / ${minYear}`);
  const maximumDOBStr = dateToString(maximumDOB);
  const validatedItems = [
    dataValidators.validateMaximumDate(dobStr, maximumDOBStr),
    dataValidators.validateSex(userDetails.sex),
    dataValidators.validatePhoneNumber(userDetails.phoneNumber),
    dataValidators.validatePasswords(userDetails.password, userDetails.confirmPassword),
  ];

  return dataValidators.checkAllValidations(validatedItems);
};


module.exports = {
  description: 'This is a module for managing users.',
  getAll: () => getUsers(),
  getUserData: (email, password) => getUserData(email, password),
  findUserById: id => findUserById(id),
  findClientById: id => findClientById(id),
  findCashierById: id => findCashierById(id),
  validateClientId: id => validateClientId(id),
  validateStaffId: id => validateStaffId(id),
  validateCashierId: id => validateCashierId(id),
  validateAdminId: id => validateAdminId(id),
  validateUser: userDetails => validateUser(userDetails),
  tryFindAdminById: id => tryFindAdminById(id),
  hasEmail: email => hasEmail(email),
  hasCorrectPassword: (email, password) => hasCorrectPassword(email, password),
  add: user => addUser(user),
  removeById: id => removeUserById(id),
  removeUserByEmail: email => removeUserByEmail(email),
  count: Number.parseInt(getUsers().length, 10),
};
