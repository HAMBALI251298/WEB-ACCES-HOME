const accountTransactionsCountLabel = document.getElementById('accountTransactionsCountLabel');
const accountTransactionsListPanel = document.getElementById('accountTransactionsPanel');
const accountNumbersComboBox = document.getElementById('accountNumbersComboBox');

const renderAccountTransactionsData = (transactionsResultsInfo) => {
    accountTransactionsCountLabel.setAttribute('data-accountTransactionsCount', transactionsResultsInfo.length);
    accountTransactionsCountLabel.innerHTML = `(${transactionsResultsInfo.length} Transactions)`;
    let transactionsListContent = '';

    for (let i = 0; i < transactionsResultsInfo.length; i += 1) {
        const accountTransaction = transactionsResultsInfo[i];

        transactionsListContent += '<div class="listItemType1"'
            + ` data-accountNumber="${accountTransaction.accountNumber}"`
            + ` data-createdOn="${accountTransaction.accountCreatedOn}" >`;

        transactionsListContent += `<div><label><b>Created On: </b></label> <label>${getShortDate(accountTransaction.createdOn)}</label></div>`;
        transactionsListContent += `<div><label><b>Type: </b></label> <label>${accountTransaction.type}</label></div>`;

        transactionsListContent += `<div><label><b>Amount: </b></label> <label>${accountTransaction.amount}</label></div>`;
        transactionsListContent += `<div><label><b>Old Balance: </b></label> <label>${accountTransaction.oldBalance}</label></div>`;
        transactionsListContent += `<div><label><b>New Balance: </b></label> <label>${accountTransaction.newBalance}</label></div>`;

        transactionsListContent += '</div>';
    }

    accountTransactionsListPanel.innerHTML = transactionsListContent;
};

const viewThisBankAccountRecord = (accountNumber) => {

};

window.addEventListener('load', (ev) => {
    let testTransactionsData = [
        {
            createdOn: new Date(2018, 2, 15),
            type: 'debit',
            amount: 78123.35,
            oldBalance: 120000,
            newBalance: 198123.35
        },];

    for (let i =0; i<12; i+=1 ) {
        testTransactionsData.push({
            createdOn: new Date(2007, 5, 14),
            type: 'credit',
            amount: 78123.35,
            oldBalance: 120000,
            newBalance: 198123.35
        });
    }

    renderAccountTransactionsData(testTransactionsData);
});
