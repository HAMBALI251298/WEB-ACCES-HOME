const userAccountsPanelElement = document.getElementById('userAccountsPanel');
const searchInputElement = document.getElementById('searchInput');
const searchTypeComboBox = document.getElementById('searchTypeComboBox');
const searchItemsDDListPanel = document.getElementById('searchItemsDDList');

const usersResultsNavigationLabel = document.getElementById('usersResultItemsRangeInfo');
const usersListPanel = document.getElementById('usersListContainer');

let usersAccountData = [];
// the maximum number of accounts data that can be shown in the panel.
let maxEntries = 0;
// the number of pages containing accounts data.
let numberOfPages = 0;
// the number of items on each page containing accounts data in the accounts list panel.
let pagesNumberOfItems = [];
// the index of the page containing accounts data that are active (being shown).
let accountItemsPageIndex = 0;
// the number accounts that can be viewed.
let usersResultsCount = 0;


window.addEventListener('load', (loadEvent) => {
    userAccountsPanelElement.addEventListener('mousedown', (mouseDownEvent) => {
        if (mouseDownEvent.target.getAttribute('data-path') != 'search') {
            closeSearchListPanel();
        }
    });
    const testUsersData = [
        {
            id: 0,
            email: 'janepike@cormail.com',
            firstName: 'Janet',
            lastName: 'Pike',
            type: 'client',
            isAdmin: false,
            isActivated: true
        }
    ];

    renderUserAccountItemsRangeInfo(testUsersData);
    renderUserAccountsData(testUsersData);
});

const renderUserAccountItemsRangeInfo = (accountsResultsInfo) => {
    for (let a = 0; a < pagesNumberOfItems.length; a++) {
        pagesNumberOfItems.pop();
    }

    usersResultsCount = accountsResultsInfo.length;

    if (accountsResultsInfo.length < 11) {
        const resultLabel = accountsResultsInfo.length <= 1 ? `${accountsResultsInfo.length} from ${accountsResultsInfo.length}` : `1 - ${accountsResultsInfo.length} from ${accountsResultsInfo.length}`;
        usersResultsNavigationLabel.innerText = resultLabel;
        maxEntries = accountsResultsInfo.length;
        numberOfPages = 1;
        pagesNumberOfItems.push(maxEntries);
    }
    else {
        const resultLabel = `1 - 10 from ${accountsResultsInfo.length}`;
        usersResultsNavigationLabel.innerText = resultLabel;
        maxEntries = 10;
        const entryTotal = 0;
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

const renderUserAccountsData = (accountsResultsInfo) => {
    usersAccountData = accountsResultsInfo;
    let startIndex = 0;
    let endIndex = 0;
    let usersListContentHtmlArr = [];

    for (let k = 0; k < numberOfPages; k++) {
        startIndex = endIndex;
        endIndex = startIndex + pagesNumberOfItems[k];
        const classValue = k === 0 ? 'accountsListPage-Active':'accountsListPage-Inactive';
        usersListContentHtmlArr.push(`<div class="${classValue}" data-id="${k}">`);
        for (let i = startIndex; i < endIndex; i++) {
            const accountId = accountsResultsInfo[i].id;
            const accountEmail = accountsResultsInfo[i].email;
            const accountFirstName = accountsResultsInfo[i].firstName;
            const accountLastName = accountsResultsInfo[i].lastName;
            // const accountCreatedOn = accountsResultsInfo[i].createdOn;
            const accountType = accountsResultsInfo[i].type;
            const accountActivated = accountsResultsInfo[i].isActivated;
            const accountActivatedStr = accountActivated ? 'yes' : 'no';
            const statusGlyphClass = getUserAccountStatusBtnClass(accountActivated);
            const accountIsAdmin = accountsResultsInfo[i].isAdmin ? 'yes' : 'no';

            usersListContentHtmlArr.push(`<div class="listItemType1"`);
            usersListContentHtmlArr.push(` data-id="${accountId}"`);
            usersListContentHtmlArr.push(` data-email="${accountEmail}"`);
            usersListContentHtmlArr.push(` data-firstName="${accountFirstName}"`);
            usersListContentHtmlArr.push(` data-lastName="${accountLastName}"`);
            usersListContentHtmlArr.push(` data-type="${accountType}"`);
            usersListContentHtmlArr.push(` data-isAdmin="${accountIsAdmin}"`);
            usersListContentHtmlArr.push(` data-isActivated="${accountActivatedStr}">`);

            usersListContentHtmlArr.push(`<div> <b>ID: </b> <label>${accountId}</label> </div>`);
            usersListContentHtmlArr.push(`<div> <b>First Name: </b> <label>${accountFirstName}</label> </div>`);
            usersListContentHtmlArr.push(`<div> <b>Last Name: </b> <label>${accountLastName}</label> </div>`);
            usersListContentHtmlArr.push(`<div> <b>Email: </b> <label>${accountEmail}</label> </div>`);
            usersListContentHtmlArr.push(`<div> <b>Type: </b> <label>${accountType}</label> </div>`);
            usersListContentHtmlArr.push(`<div> <b>Administrator: </b> <label>${accountIsAdmin}</label> </div>`);

            usersListContentHtmlArr.push(`<div class="h-centerGroup actionPanel">`);
            usersListContentHtmlArr.push(` <button class="listItemActionBtn" onclick="changeAccountStatus_OnClick('${accountId}')">`);
            usersListContentHtmlArr.push(` <b class="${statusGlyphClass}"></b> </button>`);
            usersListContentHtmlArr.push('<button class="listItemActionBtn danger">');
            usersListContentHtmlArr.push('<b class="fa fa-close"> </b>');
            usersListContentHtmlArr.push('</button>');

            usersListContentHtmlArr.push(' </div></div>');
        }
        usersListContentHtmlArr.push('</div>');
    }

    usersListPanel.innerHTML = usersListContentHtmlArr.join('');
};

const navigateAcountsPanelLeft = () => {
    if (accountItemsPageIndex === 0) {
        // do nothing
    } else {
        const accountListPages = usersListPanel.children;

        // deactivate the current page and activate the previous page.
        accountListPages[accountItemsPageIndex].setAttribute('class', 'accountsListPage-Inactive');
        accountListPages[accountItemsPageIndex - 1].setAttribute('class', 'accountsListPage-Active');
        accountItemsPageIndex--;

        const pageRange = GetStartAndEndOfCurrentPage();
        var updatedNavInfoStr = `${pageRange[0]} - ${pageRange[1]} from ${usersResultsCount}`;
        usersResultsNavigationLabel.innerText = updatedNavInfoStr;
    }
};

const navigateAcountsPanelRight = () => {
    if (accountItemsPageIndex === numberOfPages - 1) {
        // do nothing
    } else {
        const accountListPages = usersListPanel.children;

        // deactivate the current page and activate the next page.
        accountListPages[accountItemsPageIndex].setAttribute('class', 'accountsListPage-Inactive');
        accountListPages[accountItemsPageIndex + 1].setAttribute('class', 'accountsListPage-Active');
        accountItemsPageIndex++;

        const pageRange = GetStartAndEndOfCurrentPage();
        var updatedNavInfoStr = `${pageRange[0]} - ${pageRange[1]} from ${usersResultsCount}`;
        usersResultsNavigationLabel.innerText = updatedNavInfoStr;
    }
};

const GetStartAndEndOfCurrentPage = () => {
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

const getUserAccountStatusBtnClass = (accountActivated) => {
    let resultClass = 'fa fa-unlock';

    if (accountActivated === true || accountActivated === 'yes'){
        resultClass = 'fa fa-unlock';
    }
    else if(accountActivated === false|| accountActivated === 'no'){
        resultClass = 'fa fa-lock';
    }
    return resultClass;
};

const toggleAccountStatus = (accountActivated) => {
    let resultStatus = 'yes';

    if (accountActivated === true || accountActivated === 'yes'){
        resultStatus = 'no';
    }
    else if(accountActivated === false|| accountActivated === 'no'){
        resultStatus = 'yes';
    }
    return resultStatus;
};

const changeAccountStatus_OnClick = (accountId) => {
    const userAccountListItem = getIndexedUserAccountItems().find(item => Number.parseInt(item.ID) == Number.parseInt(accountId));
    const userAccountPage = usersListPanel.getElementsByTagName('div')[userAccountListItem.PageIndex]
    const userListItem = userAccountPage.getElementsByClassName('listItemType1')[userAccountListItem.ItemIndex];
    const userId = userListItem.getAttribute('data-id');
    const userActivated = userListItem.getAttribute('data-isActivated');
    const newStatus = toggleAccountStatus(userActivated);
    // TODO: (de)?activate the user with the above id.

    const actionPanelElement = userListItem.getElementsByClassName('actionPanel')[0];
    const statusChangeBtn = actionPanelElement.getElementsByTagName('button')[0];

    statusChangeBtn.children[0].setAttribute('class', getUserAccountStatusBtnClass(newStatus));
    userListItem.setAttribute('data-isActivated', newStatus);
};

// #region ------->> Search related functions

const searchInputElement_OnChange = () => {
    const searchQuery = searchInputElement.value.trim();

    if (searchQuery.length > 0) {
        const indexedUserAccountItems = getIndexedUserAccountItems();
        const equalItems = [];
        const beginsWithItems = [];
        const endsWithItems = [];
        const containsItems = [];

        for (let i = 0; i < indexedUserAccountItems.length; i++) {
            const element = indexedUserAccountItems[i];
            const itemStr = getSearchItem(element);
            const start = itemStr.indexOf(searchQuery);
            const length = searchQuery.length;

            if (itemStr === searchQuery) {
                const resultData = {
                    Level: 1,
                    Value: element,
                    FullText: itemStr,
                    Start: start,
                    Length: length
                };
                equalItems.push(resultData);
            }
            else if (itemStr.indexOf(searchQuery) === 0) {
                const resultData = {
                    Level: 2,
                    Value: element,
                    FullText: itemStr,
                    Start: start,
                    Length: length
                };
                beginsWithItems.push(resultData);
            }
            else if (itemStr.endsWith(searchQuery)) {
                const resultData = {
                    Level: 3,
                    Value: element,
                    FullText: itemStr,
                    Start: start,
                    Length: length
                };
                endsWithItems.push(resultData);
            }
            else if (itemStr.indexOf(searchQuery) > 0) {
                const resultData = {
                    Level: 4,
                    Value: element,
                    FullText: itemStr,
                    Start: start,
                    Length: length
                };
                containsItems.push(resultData);
            }
        }

        const searchResultItems = equalItems.concat(beginsWithItems, endsWithItems, containsItems);
        searchItemsDDListPanel.innerHTML = renderSearchResultItems(searchResultItems);
        searchItemsDDListPanel.style.display = 'block';
    }
    else {
        closeSearchListPanel();
    }
};

const searchTypeComboBox_OnChange = () => {
    const searchWithProperty = searchTypeComboBox.children[searchTypeComboBox.selectedIndex].innerHTML.trim();

    searchInputElement.setAttribute('placeholder',  `Enter ${searchWithProperty}`);
};

const getIndexedUserAccountItems = () => {
    const usersListChildPanels = usersListPanel.getElementsByTagName('div');
    let flattenedAcountItems = [];

    for (let i = 0; i < usersListChildPanels.length; i++) {
        const currentChildPanelListItems = usersListChildPanels[i].getElementsByClassName('listItemType1');
        for (let j = 0; j < currentChildPanelListItems.length; j++) {
            const accountID = currentChildPanelListItems[j].getAttribute('data-id');
            const accountEmail = currentChildPanelListItems[j].getAttribute('data-email');
            const accountFirstName = currentChildPanelListItems[j].getAttribute('data-firstName');
            const accountLastName = currentChildPanelListItems[j].getAttribute('data-lastName');

            const indexedData = {
                PageIndex: i,
                ItemIndex: j,
                ID: accountID,
                AccountEmail: accountEmail,
                AccountFirstName: accountFirstName,
                AccountLastName: accountLastName
            };
            flattenedAcountItems.push(indexedData);
        }
    }
    return flattenedAcountItems;
};

const getSearchItem = (userAccountItem) => {
    const searchWithProperty = searchTypeComboBox.children[searchTypeComboBox.selectedIndex].getAttribute('value').trim();
    let resulStr = '';

    if (searchWithProperty === 'ID') {
        resulStr = userAccountItem.ID;
    }
    else if (searchWithProperty === 'LastName') {
        resulStr = userAccountItem.AccountLastName;
    }
    else if (searchWithProperty === 'FirstName') {
        resulStr = userAccountItem.AccountFirstName;
    }
    else if (searchWithProperty === 'Email') {
        resulStr = userAccountItem.AccountEmail;
    }

    return resulStr;
};

const renderSearchResultItems = (searchResultItems) => {
    let searchResultHtml = '';

    // searchResultHtml +='<div class="searchItemsDDList-Content">';
    for (let a = 0; a < searchResultItems.length; a++) {
        const element = searchResultItems[a];
        const labelText = element.FullText;

        const leftStr = element.Start > 0 ? labelText.substring(0, element.Start): '';
        const midStr = element.Start >= 0 ? `<b class='searchListItemContent-Select'>${labelText.substring(element.Start, element.Start + element.Length)}</b>` : '';
        const rightStr = element.Length != labelText.length ? `${labelText.substring(element.Start + element.Length, labelText.length )}` : '';
        const classEnding = a === searchResultItems.length - 1 ? ' last' : '';

        searchResultHtml += `<button class="searchListItem${classEnding}" data-path="search" onclick="navigateToResult(${element.Value.PageIndex}, ${element.Value.ItemIndex})">`;
        searchResultHtml += `${leftStr}${midStr}${rightStr}</button>`;
    }
    // searchResultHtml +='</div>';

    return searchResultHtml;
};

const navigateToResult = (pageIndex, itemIndex) => {
    const userAccountItemPageElement = usersListPanel.children[pageIndex];
    const itemElement = userAccountItemPageElement.children[itemIndex];
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

    itemElement.scrollIntoView();
};

const closeSearchListPanel = () => {
    searchItemsDDListPanel.innerHTML = '';
    searchItemsDDListPanel.style.display = 'none';
};

const turnOffHighlightAttribute_OnMouseDown = (pageIndex, itemIndex, defaultClassValue) => {
    const accountItemPageElement = usersListPanel.children[pageIndex];
    const itemElement = accountItemPageElement.children[itemIndex];

    itemElement.setAttribute('class', defaultClassValue);
    itemElement.removeAttribute('onmousedown');
};

// #endregion
