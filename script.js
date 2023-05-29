const balance=document.getElementById("balance");
const money_plus=document.getElementById("money-plus");
const money_minus=document.getElementById("money-minus");
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");





const localStorageTransactions=JSON.parse(localStorage.getItem("transactions"));
let transactions=localStorage.getItem("transactions")!==null?localStorageTransactions:[];
//Add Transaction

function addTransaction(e){
    e.preventDefault();//ensures that default action associates with the button does not occur
    if(text.value.trim()===""||amount.value.trim()===""){
        alert("Please Enter Text and Value");
    }
    else{
        const transaction={
            id:GenerateID(),
            text:text.value,
            amount:+amount.value,

        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValue();
        text.value="";
        amount.value="";
    }
}

//Generate ID:
function GenerateID(){
    return Math.floor(Math.random()*100000000);
}
//Add Transaction
function addTransactionDOM(transaction){
    const sign=transaction.amount<0?"-":"+"//Ternary Operator
    const item=document.createElement("li");
    item.classList.add(
        transaction.amount<0?"minus":"plus"
    );
    item.innerHTML=`${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);

}
//Remove Transaction
function removeTransaction(id){
    transactions=transactions.filter(transaction=>transaction.id!==id);
    Init();
}
//Update Value
function updateValue(){
    const amounts=transactions.map(transaction=>transaction.amount);
    const total=amounts.reduce((acc,item)=>
        (acc+=item),0
    ).toFixed(2);
    const income=amounts.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const expense=(
        amounts.filter(item=>item<0).reduce((acc,item)=>(acc+=item),0)*-1
    ).toFixed(2);
    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}
//Update Local Storage:
function updateLocalStorage(){
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );
}
//Init App
function Init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValue();
    
}
Init();
form.addEventListener("submit",addTransaction);
//addTransactionDOM(Transactions);


