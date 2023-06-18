const bankAccountsPanelElement = document.getElementById('bankAccountsPanel');
const usersPanel = document.getElementById('usersPanel');

const searchInputElement = document.getElementById('searchInput');
const searchItemsDDListPanel = document.getElementById('searchItemsDDList');

const allAccountsPanel = document.getElementById('allAccountsPanel');
const navigationPanel = document.getElementById('navigationPanel');
const accountResultsNavigationLabel = document.getElementById('accountResultItemsRangeInfo');
const accountsListPanel = document.getElementById('accountsListContainer');
const accountRecordContainer = document.getElementById('accountRecordContainer');
const accountRecordPanel = document.getElementById('accountRecordPanel');
let bankAccountsData = [];
// the maximum number of accounts data that can be shown in the panel.
let maxEntries = 0;
// the number of pages containing accounts data.
let numberOfPages = 0;
// the number of items on each page containing accounts data in the accounts list panel.
let pagesNumberOfItems = [];
// the index of the page containing accounts data that are active (being shown).
let accountItemsPageIndex = 0;
// the number accounts that can be viewed.
let accountResultsCount = 0;

window.addEventListener('load', (loadEvent) => {
    bankAccountsPanelElement.addEventListener('mousedown', (mouseDownEvent) => {
        if (mouseDownEvent.target.getAttribute('data-path') != 'search') {
            closeSearchListPanel();
        }
    });

    // TODO: Get the data for all bank accounts.
    let testAccountsData = [
        {
            id: 0,
            accountNumber: 7898126547,
            createdOn: new Date(2007, 5, 14),
            owner: 1,
            type: 'savings',
            status: 'active',
            balance: 789123.06
        },
        {
            id: 1,
            accountNumber: 5859126113,
            createdOn: new Date(2012, 7, 24),
            owner: 2,
            type: 'savings',
            status: 'active',
            balance: 9789123.76
        },
        {
            id: 2,
            accountNumber: 5759776113,
            createdOn: new Date(2012, 7, 24),
            owner: 3,
            type: 'savings',
            status: 'active',
            balance: 9000123.76
        }
    ];

    // use the commented lines below to test the page navigation functions.
    // for (let i =0; i<12; i++){
    // 	testAccountsData.push({
    // 		id: i+3,
    // 		accountNumber: 5759776113,
    // 		createdOn: new Date(2012, 7, 24),
    // 		owner: i+4,
    // 		type: 'savings',
    // 		status: 'active',
    // 		balance: 9000123.76
    // 	});
    // }

    renderBankAccountItemsRangeInfo(testAccountsData);
    renderBankAccountsData(testAccountsData);
});

// #region ------------------>> Rendering functions.

const renderBankAccountItemsRangeInfo = (accountsResultsInfo) => {
    pagesNumberOfItems = [];

    accountResultsCount = accountsResultsInfo.length;

    if (accountsResultsInfo.length < 11) {
        const resultLabel = accountsResultsInfo.length <= 1 ? `${accountsResultsInfo.length} from ${accountsResultsInfo.length} (Page 1)` : `1 - ${accountsResultsInfo.length} from ${accountsResultsInfo.length} (Page 1)`;
        accountResultsNavigationLabel.innerText = resultLabel;
        maxEntries = accountsResultsInfo.length;
        numberOfPages = 1;
        pagesNumberOfItems.push(maxEntries);
    }
    else {
        const resultLabel = `1 - 10 from ${accountsResultsInfo.length} (Page 1)`;
        accountResultsNavigationLabel.innerText = resultLabel;
        maxEntries = 10;
        let entryTotal = 0;
        while (entryTotal != accountsResultsInfo.length) {
            if (entryTotal + 10 <= accountsResultsInfo.length)
            {
                pagesNumberOfItems.push(10);
                entryTotal += 10;
            }
            else
            {
                var remainingNumber = accountsResultsInfo.length - entryTotal;
                entryTotal += remainingNumber;
                pagesNumberOfItems.push(remainingNumber);
            }
        }
        numberOfPages = pagesNumberOfItems.length;
    }
};

/**@@ Renders the data for all bank accounts created.
* @param {accountsResultsInfo}
*/
const renderBankAccountsData = (accountsResultsInfo) => {
    bankAccountsData = accountsResultsInfo;
    let startIndex = 0;
    let endIndex = 0;
    let accountsListContentArr = [];

    for (let k = 0; k < numberOfPages; k++) {
        startIndex = endIndex;
        endIndex = startIndex + pagesNumberOfItems[k];
        const classValue = k === 0 ? 'accountsListPage-Active':'accountsListPage-Inactive';
        accountsListContentArr.push(`<div class="${classValue}" data-id="${k}">`);
        for (let i = startIndex; i < endIndex; i++) {
            const accountNumber = accountsResultsInfo[i].accountNumber;
            const accountCreatedOn = accountsResultsInfo[i].createdOn;
            const accountBalance = accountsResultsInfo[i].balance;
            const accountId = accountsResultsInfo[i].id;

            accountsListContentArr.push(`<div class="listItemType1" data-accountNumber="${accountNumber}" data-createdOn="${accountCreatedOn}" >`);

            accountsListContentArr.push(`<div><b>ID: </b><label>${accountId}</label></div>`);
            accountsListContentArr.push(`<div><b>Number: </b><label>${accountNumber}</label></div>`);
            accountsListContentArr.push(`<div><b>Created On: </b><label>${getShortDate(accountCreatedOn)}</label></div>`);
            accountsListContentArr.push(`<div> <b>Balance: </b><label>${accountBalance}</label></div>`);

            accountsListContentArr.push(`<div class="h-centerGroup"><button class="listItemActionBtn" onclick="viewThisBankAccountRecord(${accountId})">`);
            accountsListContentArr.push('<b title="View More" alt="View More" class="fa fa-ellipsis-h"></b> </button>');
            accountsListContentArr.push('<button class="listItemActionBtn danger" title="Delete this account">');
            accountsListContentArr.push('<b class="fa fa-close"> </b>');
            accountsListContentArr.push('</button>');
            accountsListContentArr.push('</div></div>');
        }
        accountsListContentArr.push('</div>');
    }

    accountsListPanel.innerHTML = accountsListContentArr.join('');
};

const viewThisBankAccountRecord = (accountId) => {
    // TODO: Get the transactions made with this account number.
    let testTransactionsData = [
        {
            id: 0,
            createdOn: new Date(2018, 2, 15),
            type: 'debit',
            accountNumber: bankAccountsData.find(item => item.id === accountId).accountNumber,
            cashier: 3,
            amount: 78123.35,
            oldBalance: 120000,
            newBalance: 198123.35
        }
    ];

    for (let i = 0; i < 5; i++) {
        testTransactionsData.push({
            id: 0,
            createdOn: new Date(2018, 2, 15),
            type: 'debit',
            accountNumber: bankAccountsData.find(item => item.id === accountId).accountNumber,
            cashier: 3,
            amount: 78123.35,
            oldBalance: 120000,
            newBalance: 198123.35
        });

    }
    renderBankAccountRecord(accountId, testTransactionsData);
};

const renderBankAccountRecord = (accountId, bankAccountTransactions) => {
    const bankAccountData = bankAccountsData.find(item => item.id === accountId);
    let accountRecordHtml = '<div>';

    accountRecordHtml += `<div><label><b>ID: </b></label> <label>${bankAccountData.id}</label></div>`;
    accountRecordHtml += `<div><label><b>Account number: </b></label> <label>${bankAccountData.accountNumber}</label></div>`;
    accountRecordHtml += `<div><label><b>Created on: </b></label> <label>${getShortDate(bankAccountData.createdOn)}</label></div>`;
    accountRecordHtml += `<div><label><b>Owner Id: </b></label> <label>${bankAccountData.owner}</label></div>`;
    accountRecordHtml += `<div><label><b>Type: </b></label> <label>${bankAccountData.type}</label></div>`;
    accountRecordHtml += `<div><label><b>Status: </b></label> <label>${bankAccountData.status}</label></div>`;
    accountRecordHtml += `<div><label><b>Balance: </b></label> <label>${bankAccountData.balance}</label></div>`;

    accountRecordHtml += '<br/><div class="h-centerText"><b> Account Transactions</b></div><hr class="fullDemarcation"/>';
    accountRecordHtml += '<div class="transactionPanel">';
    for (let i = 0; i < bankAccountTransactions.length; i++) {
        const accountTransaction = bankAccountTransactions[i];
        accountRecordHtml += '<div class="listItemType1">';

        accountRecordHtml += `<div><label><b>ID: </b></label> <label>${accountTransaction.id}</label></div>`;
        accountRecordHtml += `<div><label><b>Created on: </b></label> <label>${getShortDate(accountTransaction.createdOn)}</label></div>`;
        accountRecordHtml += `<div><label><b>Type: </b></label> <label>${accountTransaction.type}</label></div>`;
        accountRecordHtml += `<div><label><b>Cashier Id: </b></label> <label>${accountTransaction.cashier}</label></div>`;
        accountRecordHtml += `<div><label><b>Transaction Amount: </b></label> <label>${accountTransaction.amount}</label></div>`;
        accountRecordHtml += `<div><label><b>Old Account Balance: </b></label> <label>${accountTransaction.oldBalance}</label></div>`;
        accountRecordHtml += `<div><label><b>New Account Balance: </b></label> <label>${accountTransaction.newBalance}</label></div>`;

        accountRecordHtml += '</div>';
    }
    accountRecordHtml += '</div><br/><div class="h-centerGroup">';

    accountRecordHtml += `<button class="dangerBtn" onclick="deletePreviewAccount(${accountId})">Delete This Account</button>`;
    accountRecordHtml += `<button class="actionBtn" onclick="closeAccountPreview()">Close</button>`;

    accountRecordHtml += '</div></div>';

    accountRecordContainer.innerHTML = accountRecordHtml;
    // accountRecordPanel.style.display = 'block';
    accountRecordPanel.setAttribute('class', 'active');
    allAccountsPanel.setAttribute('class', 'inactive');

    // bankAccountsPanelElement.addEventListener('mousedown', (mouseDownEvent) => {
    //     if (mouseDownEvent.target.getAttribute('data-path') === 'accountRecord') {
    //         closeAccountPreview();
    //     }
    // });

};

// #endregion

const closeAccountPreview = () => {
    accountRecordPanel.setAttribute('class', 'inactive');
    allAccountsPanel.setAttribute('class', 'active');
};

const deletePreviewAccount = (accountId) => {

};

const closeSearchListPanel = () => {
    searchItemsDDListPanel.innerHTML = '';
    searchItemsDDListPanel.style.display = 'none';
};


// #region ------------------>> Navigation functions.
const navigateAcountsPanelLeft = () => {
    if (accountItemsPageIndex === 0) {
        // do nothing
    } else {
        const accountListPages = accountsListPanel.children;

        // deactivate the current page and activate the previous page.
        accountListPages[accountItemsPageIndex].setAttribute('class', 'accountsListPage-Inactive');
        accountListPages[accountItemsPageIndex - 1].setAttribute('class', 'accountsListPage-Active');
        accountItemsPageIndex--;

        const pageRange = GetStartAndEndOfSearchResults();
        var updatedNavInfoStr = `${pageRange[0]} - ${pageRange[1]} from ${accountResultsCount} (Page ${accountItemsPageIndex + 1})`;
        accountResultsNavigationLabel.innerText = updatedNavInfoStr;
    }
};

const navigateAcountsPanelRight = () => {
    if (accountItemsPageIndex === numberOfPages - 1) {
        // do nothing
    } else {
        const accountListPages = accountsListPanel.children;

        // deactivate the current page and activate the next page.
        accountListPages[accountItemsPageIndex].setAttribute('class', 'accountsListPage-Inactive');
        accountListPages[accountItemsPageIndex + 1].setAttribute('class', 'accountsListPage-Active');
        accountItemsPageIndex++;

        const pageRange = GetStartAndEndOfSearchResults();
        var updatedNavInfoStr = `${pageRange[0]} - ${pageRange[1]} from ${accountResultsCount} (Page ${accountItemsPageIndex + 1})`;
        accountResultsNavigationLabel.innerText = updatedNavInfoStr;
    }
};

const GetStartAndEndOfSearchResults = () => {
    let start = 1;
    let end = 0;
    for (let i = 0; i < accountItemsPageIndex; i++) {
        start += pagesNumberOfItems[i];
    }
    for (let j = 0; j < accountItemsPageIndex + 1; j++) {
        end += pagesNumberOfItems[j];
    }
    return [start, end];
};

// #endregion

// #region ------------------>> Searching functions.

const getIndexedAccountItems = () => {
    const accountsListChildPanels = accountsListPanel.getElementsByTagName('div');
    let flattenedAcountItems = [];

    for (let i = 0; i < accountsListChildPanels.length; i++) {
        const currentChildPanelListItem = accountsListChildPanels[i].getElementsByClassName('listItemType1');
        for (let j = 0; j < currentChildPanelListItem.length; j++) {
            const accountNumber = currentChildPanelListItem[j].getAttribute('data-accountNumber');
            // const accountEmail = currentChildPanelListItem[j].getAttribute('data-email');

            const indexedData = {
                PageIndex: i,
                ItemIndex: j,
                AccountNumber: accountNumber
            };
            flattenedAcountItems.push(indexedData);
        }
    }
    return flattenedAcountItems;
};

const searchInputElement_OnChange  = () => {
    // const searchProperty = searchTypeComboBox.children[searchTypeComboBox.selectedIndex].innerText.trim();
    const searchQuery = searchInputElement.value.trim();

    if (searchQuery.length > 0) {
        const indexedAccountItems = getIndexedAccountItems();
        let searchResultItems = [];
        const equalItems = [];
        const beginsWithItems = [];
        const endsWithItems = [];
        const containsItems = [];

        for (let i = 0; i < indexedAccountItems.length; i++) {
            const start = indexedAccountItems[i].AccountNumber.indexOf(searchQuery);
            const length = searchQuery.length;

            if (indexedAccountItems[i].AccountNumber === searchQuery) {
                const resultData = {
                    Level: 1,
                    Value: indexedAccountItems[i],
                    Start: start,
                    Length: length
                };
                equalItems.push(resultData);
            }
            else if (indexedAccountItems[i].AccountNumber.indexOf(searchQuery) === 0) {
                const resultData = {
                    Level: 2,
                    Value: indexedAccountItems[i],
                    Start: start,
                    Length: length
                };
                beginsWithItems.push(resultData);
            }
            else if (indexedAccountItems[i].AccountNumber.endsWith(searchQuery)) {
                const resultData = {
                    Level: 3,
                    Value: indexedAccountItems[i],
                    Start: start,
                    Length: length
                };
                endsWithItems.push(resultData);
            }
            else if (indexedAccountItems[i].AccountNumber.indexOf(searchQuery) > 0) {
                const resultData = {
                    Level: 4,
                    Value: indexedAccountItems[i],
                    Start: start,
                    Length: length
                };
                containsItems.push(resultData);
            }
        }
        searchResultItems = equalItems.concat(beginsWithItems, endsWithItems, containsItems);

        searchItemsDDListPanel.innerHTML = renderSearchResultItems(searchResultItems);
        searchItemsDDListPanel.style.display = 'block';
    } else {
        closeSearchListPanel();
    }

};

const renderSearchResultItems = (searchResultItems) => {
    let searchResultHtml = '';

    for (let a = 0; a < searchResultItems.length; a++) {
        const element = searchResultItems[a];
        const labelText = element.Value.AccountNumber;

        const leftStr = element.Start > 0 ? labelText.substring(0, element.Start): '';
        const midStr = element.Start >= 0 ? `<b class='searchListItemContent-Select'>${labelText.substring(element.Start, element.Start + element.Length)}</b>` : '';
        const rightStr = element.Length != labelText.length ? `${labelText.substring(element.Start + element.Length, labelText.length )}` : '';
        const classEnding = a === searchResultItems.length - 1 ? ' last' : '';
        searchResultHtml += `<button class="searchListItem${classEnding}" data-path="search" onclick="navigateToResult(${element.Value.PageIndex}, ${element.Value.ItemIndex})">`;
        searchResultHtml += `${leftStr}${midStr}${rightStr}</button>`;
    }
    return searchResultHtml;
};

const navigateToResult = (pageIndex, itemIndex) => {
    const accountItemPageElement = accountsListPanel.children[pageIndex];
    const itemElement = accountItemPageElement.children[itemIndex];
    const classValue = itemElement.getAttribute('class');

    if (pageIndex === accountItemsPageIndex) {
    }
    else if (pageIndex > accountItemsPageIndex) {
        // move the account list panel right
        while (pageIndex != accountItemsPageIndex) {
            navigateAcountsPanelRight();
        }
    }
    else {
        // move the account list panel left
        while (pageIndex != accountItemsPageIndex) {
            navigateAcountsPanelLeft();
        }
    }

    itemElement.setAttribute('onmousedown', `turnOffHighlightAttribute_OnMouseDown(${pageIndex}, ${itemIndex}, "${classValue}")`);
    itemElement.setAttribute('class', `${classValue} highlight`);
    closeSearchListPanel();
};

const turnOffHighlightAttribute_OnMouseDown = (pageIndex, itemIndex, defaultClassValue) => {
    const accountItemPageElement = accountsListPanel.children[pageIndex];
    const itemElement = accountItemPageElement.children[itemIndex];
    itemElement.setAttribute('class', defaultClassValue);
    itemElement.removeAttribute('onmousedown');
};

// #endregion
