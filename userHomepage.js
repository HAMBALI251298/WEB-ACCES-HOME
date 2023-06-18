const rightPanelContainer = document.getElementById('rightPanelContainer');
let currentPanelName = '';

let accountsData = [];

const toggleSideBar = (toggleCode) => {
    const sideBarContainer = document.getElementById('sideBar');

    if (sideBarContainer.getAttribute('data-viewState') === 'open' && (toggleCode === 0 || toggleCode === 2)) {
        sideBarContainer.setAttribute('class', 'splitPanel-Left closed');
        sideBarContainer.setAttribute('data-viewState', 'close');
    }
    else if (sideBarContainer.getAttribute('data-viewState') === 'close' && (toggleCode === 1 || toggleCode === 2)) {
        sideBarContainer.setAttribute('class', 'splitPanel-Left opened');
        sideBarContainer.setAttribute('data-viewState', 'open');
    }
    else{
        sideBarContainer.setAttribute('class', 'splitPanel-Left closed');
        sideBarContainer.setAttribute('data-viewState', 'close');
    }
};

const switchCheckedSideBarBtn = (btnId) => {
    const sideBtns = document.getElementsByClassName('sideBtn');

    for (let i = 0; i < sideBtns.length; i++) {
        const curBtn = sideBtns[i];
        if (curBtn.getAttribute('data-btnId') !== btnId) {
            curBtn.classList.remove('checked');
        }
        else{
            if (curBtn.classList.contains('checked') == false) {
                curBtn.classList.add('checked');
            }
        }
    }
};

const initSideBtnEvents = () => {
    const sideBtns = document.getElementsByClassName('sideBtn');

    for (let i = 0; i < sideBtns.length; i++) {
        const curBtn = sideBtns[i];
        curBtn.addEventListener('click', (ev) => {
            switchCheckedSideBarBtn(curBtn.getAttribute('data-btnId'));
            // toggleSideBar(0);
            setRightPanelContent(curBtn.getAttribute('data-panelName'));
        });
    }
};

const setRightPanelContent = (panelName) => {
    if (panelName === currentPanelName){

    }
    else{
        // fetch the view with the given panel name
        // rightPanelContainer.innerHTML = '';
        currentPanelName = panelName;
    }
};

window.addEventListener('load', (ev) => {
  const sideBarToggleBtn = document.getElementById('sideBarToggleBtn');
  sideBarToggleBtn.style.display = 'inline';
  sideBarToggleBtn.addEventListener('click', (clickEvent) => {
    toggleSideBar(2);
  });

  initSideBtnEvents();
});
