const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const amount = document.querySelector(".amount");
const note = document.querySelector(".note");
const date = document.querySelector(".date");
const outcome = document.querySelector("#outcome table");
const total = document.getElementById('total')
const removeAll = document.getElementById('remove-all')
const ball = document.querySelector('.ball')


window.addEventListener("load", (e) => {
  account.forEach(({ id, date, note, amount }) =>
    createItem(id, date, note, amount)
  );
  printTotal()
});

let account = JSON.parse(localStorage.getItem("account")) || [];

incomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  date.value || getDate();
  note.value || (note.value = "...");
  if (amount.value) {
    let words = note.value.split("");
    if (words.length > 15) {
      note.value = words.slice(0, 15).join("") + "...";
    }
    amount.value < 0 && (amount.value *= -1);
    let id = new Date().getTime();
    createItem(id, date.value, note.value, amount.value);
    createObj(id, date.value, note.value, amount.value);
    e.target.closest("form").reset();
    getDate();
    amount.nextElementSibling.innerText = 'Amount'
    amount.nextElementSibling.style.color = 'black'
    printTotal()
  }
  else{
    amount.nextElementSibling.innerText = 'Amount*'
    amount.nextElementSibling.style.color = 'red'
    amount.focus()
  }
});

expenseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  date.value || getDate();
  note.value || (note.value = "...");
  if (amount.value) {
    let words = note.value.split("");
    if (words.length > 15) {
      note.value = words.slice(0, 15).join("") + "...";
    }
    amount.value > 0 && (amount.value *= -1);
    let id = new Date().getTime();
    createItem(id, date.value, note.value, amount.value);
    createObj(id, date.value, note.value, amount.value);
    e.target.closest("form").reset();
    getDate();
    amount.nextElementSibling.innerText = 'Amount'
    amount.nextElementSibling.style.color = 'black'
    printTotal()
  }
  else{
    amount.nextElementSibling.innerText = 'Amount*'
    amount.nextElementSibling.style.color = 'red'
    amount.focus()
  }
});

outcome.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    account = account.filter(
      (x) => (x.id != e.target.closest("tr").className)
    );
    localStorage.setItem('account', JSON.stringify(account))
    e.target.closest("tr").remove();
    printTotal()
  }
});

const printTotal = () => {
  totalValue = account.reduce((acc,{amount}) => acc + parseFloat(amount),0)
  if(totalValue > 0){
    ball.style.background = 'rgb(45, 255, 60)'
    ball.style.background = `linear-gradient(
      -90deg,
      rgba(45, 255, 60, 1) 0%,
      rgba(159, 159, 222, 1) 100%`
  }
  else if(totalValue == 0){
    ball.style.background = 'rgb(60, 225, 222)'
    ball.style.background = `linear-gradient(
      -90deg,
      rgba(60, 225, 222, 1) 0%,
      rgba(159, 159, 222, 1) 100%`
  }
  else{
    ball.style.background = 'rgb(255, 60, 60)'
    ball.style.background = `linear-gradient(
      -90deg,
      rgba(255, 60, 60, 1) 0%,
      rgba(159, 159, 222, 1) 100%`
  }
  total.innerText = totalValue.toFixed(2) + '$'
}

const createObj = (id, date, note, amount) => {
  createdObj = {
    id: id,
    date: date,
    note: note,
    amount: amount,
  };
  account.push(createdObj);
  localStorage.setItem("account", JSON.stringify(account));
};

const createItem = (id, date, note, amount) => {
  tr = document.createElement("tr");
  tr.classList.add(id);
  tdD = document.createElement("td");
  tdD.innerText = date;
  tdN = document.createElement("td");
  tdN.innerText = note;
  tdA = document.createElement("td");
  tdA.innerText = parseFloat(amount) + "$";
  tdI = document.createElement("td");
  trash = document.createElement("i");
  tdI.appendChild(trash);
  trash.classList.add("fas", "fa-trash");

  tr.appendChild(tdD);
  tr.appendChild(tdN);
  tr.appendChild(tdA);
  tr.appendChild(tdI);
  outcome.appendChild(tr);
};

removeAll.addEventListener('click' , (e) => {
  rows = outcome.getElementsByTagName("tr").length;
  for (i = 0; i < rows; i++) {
    outcome.deleteRow(0);
  }
  account.splice(0,account.length)
  localStorage.setItem('account',JSON.stringify(account))
  printTotal()
})

const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  date.value = today;
};
getDate();