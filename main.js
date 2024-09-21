//get elemnt
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let tmp;

//get total
function getTotal(){

  if(price.value !=''){
   let result = (+price.value + +taxes.value + +ads.value)
   - +discount.value;
    total.innerHTML = result;
    total.style.background='#040';
  }else{

        total.innerHTML =  '';
            total.style.background='rgb(196, 35, 35)';
  }
 

}



//create product(قبل لا تضيف اي بيانات شوف وين راح تجمعها)
    let dataProduct;
    if(localStorage.getItem('product') != null){

      dataProduct= JSON.parse(localStorage.getItem('product'));
    }else{
        dataProduct=[];
    }


    submit.onclick=function(){
        let newProdcut={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        total:total.innerHTML,
        discount:discount.value,
        count:count.value,
        category:category.value,
        }
        if(mood=='create'){
           if(newProdcut.count>1){
            for(let i=0;i<newProdcut.count;i++){
                  dataProduct.push(newProdcut);

            }
          }
          else{
                dataProduct.push(newProdcut);
          } 
        }else{

          dataProduct[tmp]=newProdcut;
          mood='create';
          submit.innerHTML='Create';
          count.style.display='block'

        }

          //count
         
      clearData();   
      //save localStorage  
    showData();
   localStorage.setItem('product',JSON.stringify(dataProduct));
}

//clear inputs after addding
function clearData(){
 
  title.value='';
  price.value='';
  ads.value='';
  taxes.value='';
  discount.value='';
  total.innerHTML='';
   count.value='';
   category.value='';

}
//read 
function showData(){
  // getTotal();
let rowTable='';
 for(let i=0;i<dataProduct.length;i++){
  
 rowTable +=`
 <tr>
 <td>${i +1}</td>
 <td>${dataProduct[i].title}</td>
 <td>${dataProduct[i].price}</td>
 <td>${dataProduct[i].taxes}</td>
 <td>${dataProduct[i].discount}</td>
 <td>${dataProduct[i].total}</td>
 <td>${dataProduct[i].category}</td>
 <td><button onclick="updateData(${i})" id="update">update</button></td>
 <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
 
</tr>`
 }
document.getElementById('tbody').innerHTML=rowTable;
   let btnDelete=document.getElementById('deleteAll');
  if(dataProduct.length >0){
      
     btnDelete.innerHTML=`
     <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`
  }else{
    btnDelete.innerHTML='';
  }
}
      clearData();   

 showData();


 //delete 
function deleteData(i){
   dataProduct.splice(i,1); 
   //after you delete it in array the new array put it in the local storage
  localStorage.product=JSON.stringify(dataProduct);
  showData();
}
function deleteAll(){
   localStorage.clear();
   dataProduct.splice(0);
   clearData();
   showData();
}
//update
function updateData(i){
  title.value=dataProduct[i].title;
  price.value=dataProduct[i].price;
  taxes.value=dataProduct[i].taxes;
  ads.value=dataProduct[i].ads;
  discount.value=dataProduct[i].discount;
  getTotal();
  category.value=dataProduct[i].category;
  count.style.display='none';
  submit.innerHTML='Update';
  tmp=i;
  mood='update';
  
scroll({
top:0,
behavior:'smooth'


})

}





//search ( in the first we should know wich button its click)
//we should build mood case this is id and from id you will determin mood
let searchMood='title';
let searchBox = document.getElementById('search');
function getSearchMood(id){

id=='searchTitle'?searchMood='title':searchMood='category'; 
searchBox.focus();
searchBox.placeholder=`Search By ${searchMood}`
searchBox.value='';
showData();
}


function searchData(value){
  
  let rowTable='';
     for(let i=0;i<dataProduct.length;i++){
        if(searchMood=='title'){
        if(dataProduct[i].title.toLowerCase().includes(value.toLowerCase())){
         
          rowTable +=`
              <tr>
              <td>${i +1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxes}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>`
                      
        }
      }

 else{
      if(dataProduct[i].category.includes(value.toLowerCase())){
              
                rowTable +=`
                    <tr>
                    <td>${i +1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
                      
        }

 }


}
document.getElementById('tbody').innerHTML=rowTable;
}




