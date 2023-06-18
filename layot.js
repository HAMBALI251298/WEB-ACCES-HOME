const pageHeaderElement = document.getElementById('pageHeaderPanel');
const pageBodyElement = document.getElementById('pageBodyPanel');
const pageFooterElement = document.getElementById('pageFooterPanel');

const loadFooterDate = () => {
    const dateLbl = document.getElementById('footerCopyrightLbl');
    dateLbl.innerHTML = `©${new Date().getFullYear()} - Banka Ltd`;
};

window.addEventListener('load', (loadEvent) => {
    loadFooterDate();
});

window.addEventListener('scroll', (scrollEvent) => {
    if(scrollY >= 9){
        pageHeaderElement.style.boxShadow = '0px 0px 0px 8px rgba(12, 247, 3, 0.2)';
    }
    else{
        pageHeaderElement.style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    }
});
