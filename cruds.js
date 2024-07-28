let title = document.getElementById("ttle");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let abs = document.getElementById("abs");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let create = document.getElementById("create");
let category = document.getElementById("categry");
let count = document.getElementById("count");
let search = document.getElementById("search");



//   get total

function gettotal(){
    if(price.value != ""){
    var result = +price.value + +taxes.value + +abs.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#4bd6cc"
    }
    else{
        total.innerHTML = "";
        total.style.backgroundColor = "rgba(211, 8, 8, 0.638)"
    }
}

// create product
// save local storage

// *********         مهم*     ********//
// في حالة الحفظ على ال local storage وقفتها علشان النت
// let products ;
//  if(localStorage != null){
//     products = JSON.parse(localStorage.product)
//  }
//  else{
//     products = []
//  }
let products = [];
let mood = "create";
let glo_i = 0;
create.onclick = function(){
    let newpro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        abs : abs.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    };
    if(mood == "create"){
        if(newpro.count > 1){
            for(i = 0;i < newpro.count;i++){
                products.push(newpro);
            }
        }
        else{    
        products.push(newpro);}
    // localStorage.setItem("product",JSON.stringify(products));
    }
    else{
        products[glo_i] = newpro;
        mood = "create";
        count.style.display="block";
        create.innerText = "create";

    }
   showdata(); 
    clearinput(); 
}


// clear inputs
function clearinput(){
    title.value = "";
    price.value = "";
   taxes.value = "";
   abs.value = "";
  discount.value = "";
    total.innerHTML = "";
    category.value = "";
    count.value = "";
    total.style.backgroundColor="rgba(211, 8, 8, 0.638)"
};
// read data in table



function showdata(){  
          let table =''
    tbody = document.getElementById("tbody");
    for(let i = 0; i< products.length; i++){
        table += `<tr>
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].abs}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="update(${i})">update</button></td>
        <td><button onclick="deleteitem(${i})">delete</button></td>
    </tr> `
    };
    
    tbody.innerHTML = table;
    let deleteall=document.getElementById("deleteall");
    if(products.length > 0){
        deleteall.innerHTML=`<button id="deleteallbtn" onclick="deleteall()">delete all [${products.length}]</button>
        ` 
    }
    else{
        deleteall.innerHTML=""
    }
}
showdata();

// delete item///
function deleteitem(i){
products.splice(i,1);
// localStorage.product = JSON.stringify(products);
showdata();
}

// delete all

    
function deleteall(){
    products=[];
    tbody.innerHTML="";
    showdata()
}

//********** */ count*******///////

// /update//////
function update(i){
    glo_i = i;
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    abs.value = products[i].abs;
    discount.value = products[i].discount;
    category.value = products[i].category;
    mood = "update";
    gettotal();
    create.innerText = "update";
    count.style.display = "none";
}

// ******search*******//
let searchmood = "Title";
function searchby(id){
    searchmood = id ;
    search.placeholder="Search By "+searchmood
    search.focus();
    search.value="";
    showdata();
}
function srch(value){
    table = "";
    for(let i = 0;i < products.length ;i++){
            if(products[i].title.includes(value.toLowerCase())&&searchmood == "Title"||
            products[i].category.includes(value.toLowerCase())&&searchmood == "Category"){
            table += `<tr>
            <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].abs}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="update(${i})">update</button></td>
            <td><button onclick="deleteitem(${i})">delete</button></td>
                </tr> ` 
            } 
    }   
    tbody.innerHTML = table;
}