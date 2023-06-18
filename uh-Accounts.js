const accountsCountLabel = document.getElementById('accountsCountLabel');
const accountsListPanel = document.getElementById('userAccountsPanel');

const renderAccountsData = (accountsResultsInfo) => {
  accountsCountLabel.setAttribute('data-accountsCount', accountsResultsInfo.length);
  accountsCountLabel.innerHTML = `(${accountsResultsInfo.length})`;
  let accountsListContent = '';

  for (let i = 0; i < accountsResultsInfo.length; i += 1) {
    const accountNumber = accountsResultsInfo[i].accountNumber;
    const accountCreatedOn = accountsResultsInfo[i].createdOn;
    const accountBalance = accountsResultsInfo[i].balance;

    accountsListContent += '<div class="listItemType1"'
      + ` data-accountNumber="${accountNumber}"`
      + ` data-createdOn="${accountCreatedOn}">`;

    accountsListContent += `<div><b>Number: </b><label>${accountNumber}</label></div>`;
    accountsListContent += `<div><b>Created On: </b><label>${getShortDate(accountCreatedOn)}</label></div>`;
    accountsListContent += `<div> <b>Balance: </b><label>${accountBalance}</label></div>`;

    accountsListContent += '</div>';
  }

  accountsListPanel.innerHTML = accountsListContent;
};

window.addEventListener('load', (ev) => {
  const testAccountsData = [
    {
      accountNumber: 7898126547,
      createdOn: new Date(2007, 5, 14),
      type: 'savings',
      status: 'active',
      balance: 789123.06,
    },
  ];

  for (let i = 0; i < 5; i += 1) {
    testAccountsData.push({
      accountNumber: 7898126547,
      createdOn: new Date(2007, 5, 14),
      type: 'savings',
      status: 'active',
      balance: 789123.06,
    });
  }

  renderAccountsData(testAccountsData);
});

// window.addEventListener('resize', (ev) => {
//     ev.stopPropagation();
//     window.resizeTo(window.screen.availWidth, window.screen.availHeight);
// });
