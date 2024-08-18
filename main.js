let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let mood="create";
let temp;
let moodSearch;

//get total
function getTotal(){
    if(price.value!=""){
 let result=(+price.value + +taxes.value + +ads.value)
 - +discount.value;
 total.innerHTML=result;
 total.style.background="green";
    }else{
        total.innerHTML="";
        total.style.background="#a00d02";
    }
}
//create product
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product);

}else{
   datapro=[];
}
submit.addEventListener('click', function() {
    getTotal(); // Calculate total before creating the object

    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
  //  console.log(newpro);
  if(title.value!="" && price.value!="" && category.value!="" &&newpro.count<=100){
    if(mood==='create'){
        if(newpro.count>1){
          for(let i=0;i<newpro.count;i++){
              datapro.push(newpro);
          
            }
          
            
        }
        else{
          datapro.push(newpro)
        }
        clearData();

  }
 
}
else{
    datapro[temp]=newpro;
    mood="create";
    submit.innerHTML="create";
    count.style.display="block";
}
 
 localStorage.setItem("product",JSON.stringify(datapro));
 console.log(datapro);
    // Optionally, you can add newpro to your datapro array
   // clearData();
    showData();
});
//save localestorage

//clear inputs
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}
//read
function showData(){
    getTotal();
    let table="";
    for(let i=0;i<datapro.length;i++){
        table +=`
         <tr>
        <td>  ${i+1}   </td>
          <td>  ${datapro[i].title}   </td>
            <td>  ${datapro[i].price}   </td>
              <td>  ${datapro[i].taxes}   </td>
                <td>  ${datapro[i].ads}   </td>
                  <td>  ${datapro[i].discount}   </td>
                    <td>  ${datapro[i].total}   </td>
                      <td>  ${datapro[i].category}   </td>
                        <td>  <button onclick="update(${i})">update</button>   </td>
                           <td>  <button onclick="deletData(${i})">delete</button>   </td>


        </tr>


        `
    }
    document.getElementById("tbody").innerHTML=table;
    let btn=document.getElementById("btn");
    if(datapro.length>0){
        btn.innerHTML=`<button onclick="deletAll() ">delete All (${datapro.length})</button>  `

    }
}
showData();
//count

//delet
function deletData(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showData();

}
function deletAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}
//update
function update(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].ads;
   
    category.value=datapro[i].category;
    getTotal();
    submit.innerHTML="update";
    count.style.display="none";
    mood="update";
    temp=i;
    scroll({
        top:0,
        behavior :'smooth',
    })

    
}
//search
function searchMood(id){
     moodSearch="title";
    let search=document.getElementById("search");
    if(id=="serach by title"){
        moodSearch="title";
        search.placeholder="search by title ";
    }else if(id=="search by category"){
        moodSearch="category";
        search.placeholder="search by category";
    }
   // console.log(moodSearch);
   search.value="";
   showData();
   search.focus()
  
    
}
  //searsh
  function searchData(value) {
    let table = "";
   // value = value.trim(); // Trim the search value to remove whitespace

    if (moodSearch == "title") {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="update(${i})">update</button></td>
                        <td><button onclick="deleteData(${i})">delete</button></td>
                    </tr>
                `;
            }
        }
    }else{
        if (moodSearch == "category") {
            for (let i = 0; i < datapro.length; i++) {
                if (datapro[i].category.includes(value.toLowerCase())) {
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="update(${i})">update</button></td>
                            <td><button onclick="deleteData(${i})">delete</button></td>
                        </tr>
                    `;
                }
            }
    }

    
  }
  document.getElementById("tbody").innerHTML = table;
}

   
//clean data

