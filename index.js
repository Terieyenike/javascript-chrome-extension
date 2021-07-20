let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');

const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const text = document.getElementById('error-msg');

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

deleteBtn.addEventListener('dblclick', removeLeads);

inputBtn.addEventListener('click', function () {
  if (inputEl.value == '') {
    text.textContent = 'Please enter a valid url';
    text.style.color = 'red';
    text.style.fontWeight = 700;
    text.style.textDecoration = 'none';
    return false;
  } else {
    text.textContent = '';
  }
  addHttps();
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

// the save tab btn saves the page url for a specific tab you visit in your browser.
tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    for (let tab of tabs) {
      myLeads.push(tab.url);
      localStorage.setItem('myLeads', JSON.stringify(myLeads));
      render(myLeads);
    }
  });
  text.textContent = '';
});

function render(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

// clear localstorage, myLeads, and the DOM
function removeLeads() {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
}

// http protocol to add https if it exist in the input field
function addHttps() {
  const httpProtocol = 'https';

  return inputEl.value.includes(httpProtocol)
    ? myLeads.push(inputEl.value)
    : myLeads.push(`${httpProtocol}://${inputEl.value}`);
}
