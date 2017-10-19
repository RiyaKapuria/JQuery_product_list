var data = {"product":[
      {"ID":"1","Name":"Apple","Price":"80000"},
      {"ID":"3","Name":"Redmi","Price":"15000"},
      {"ID":"2","Name":"Nokia","Price":"40000"},
      {"ID":"5","Name":"Samsung","Price":"68000"},
      {"ID":"4","Name":"LG","Price":"30000"},
      {"ID":"6","Name":"Lenovo","Price":"71000"}
      ]
    }

var toggle = 0;


$(document).ready(function(){
  $("#display").click(function(){
    updateJsonAndShowData();
  });
});


function updateJsonAndShowData(){
    var table = '<table style="width:50%"><tr><th onclick="sortid()">ID</th><th onclick="sortname()">Name</th><th onclick="sortprice()">Price</th><th>Delete</th><th>Modify</th></tr><tr><td><input type="text" id="new_id"></td><td><input type="text" id="new_name"></td><td><input type="text" id="new_price"></td><td><button type="button" id="add" onclick="addproduct()">ADD</button></td><td><lable></lable></td></tr>' 
    var display_id;
    var display_name;
    var display_price;
    for (var i = 0; i < data.product.length; i++) {
        display_id = data.product[i].ID;
        display_name = data.product[i].Name;
        display_price = data.product[i].Price;
      table += '<tr id="tr_'+display_id+'"><td><input type="text" id="id_'+display_id+'" value="'+display_id+'" disabled="disabled"></td><td><input type="text" id="name_'+display_id+'" value="'+display_name+'" disabled="disabled"></td><td><input type="text" id="price_'+display_id+'" value="'+display_price+'" disabled="disabled"></td><td><button id="delete_'+display_id+'" onclick="deleteproduct('+display_id+')">Delete</button></td><td><button id="edit_'+display_id+'" onclick="editproduct('+display_id+')">Edit</button></td></tr>'
    }
    table += '</table>';
    console.log(table);
    $("#table_print").html(table);
}


function deleteproduct(id){
    var retVal = confirm("Do you want to continue ?");
    if( retVal == true ){
      $('#tr_'+id).remove()
      for (var j=0; j<data.product.length ; j++) 
      {
        if(data.product[j].ID==id)
        {
          delete data.product[j];
          data.product.splice(j,1);
        }
      }
    }
}


function editproduct(id){
  var val = $('#edit_'+id).text();
  if(val == "Edit"){
    $('#name_'+id).attr('disabled', false)
    $('#price_'+id).attr('disabled', false)
    $('#edit_'+id).text("Save");
  }
  if(val == "Save"){
    var retVal = confirm("Do you want to save ?");
    if( retVal == true ){
      var edit_name = $('#name_'+id).val();
      var edit_price = $('#price_'+id).val();
      for(var i = 0 ; i <data.product.length ; i++){
        if(data.product[i].ID == id){
          data.product[i].Name = edit_name;
          data.product[i].Price = edit_price;
          $('#name_'+id).attr('disabled', true)
          $('#price_'+id).attr('disabled', true)
          $('#edit_'+id).text("Edit")
          return true;
        }
      }
    }
  }
}


function addproduct(){
    var nid    = $("#new_id").val();
    var nname  = $("#new_name").val();
    var nprice = $("#new_price").val();
    if(nid != "" && nname != "" && nprice !=""){
      data.product.push({"ID":nid,"Name":nname,"Price":nprice})
      $("table tr:last").after('<tr id="tr_'+nid+'"><td><input type="text" id="id_'+nid+'" value="'+nid+'" disabled="disabled"></td><td><input type="text" id="name_'+nid+'" value="'+nname+'" disabled="disabled"></td><td><input type="text" id="price_'+nid+'" value="'+nprice+'" disabled="disabled"></td><td><button id="delete_'+nid+'" onclick="deleteproduct('+nid+')">Delete</button></td><td><button id="edit_'+nid+'" onclick="editproduct('+nid+')">Edit</button></td></tr>');
      $("#new_id").val("")
      $("#new_name").val("")
      $("#new_price").val("")
    }
    else{
      alert("Please fill all the inputs !");
    }
}


function sortid(){
  function compare(el1, el2, index) {
    return el1[index] == el2[index] ? 0 : (el1[index] < el2[index] ? -1 : 1);
  }
  if(toggle == 0){
    toggle =1;
    data.product.sort(function(el1,el2){
      return compare(el1, el2, "ID")
    });
  }
  else if (toggle == 1){
    toggle =0;
    data.product.sort(function(el1,el2){
      return compare(el2, el1, "ID")
    });
  } 
  updateJsonAndShowData();
}


function sortname(){
  function compare(el1, el2, index) {
    return el1[index] == el2[index] ? 0 : (el1[index] < el2[index] ? -1 : 1);
  }
  if(toggle == 0){
    toggle =1;
    data.product.sort(function(el1,el2){
      return compare(el1, el2, "Name")
    });
  }
  else {
    toggle =0;
    data.product.sort(function(el1,el2){
      return compare(el2, el1, "Name")
    });
  } 
  updateJsonAndShowData();
}


function sortprice(){
  function compare(el1, el2, index) {
    return el1[index] == el2[index] ? 0 : (el1[index] < el2[index] ? -1 : 1);
  }
  if(toggle == 0){
    toggle =1;
    data.product.sort(function(el1,el2){
      return compare(el1, el2, "Price")
    });
  }
  else if (toggle == 1){
    toggle =0;
    data.product.sort(function(el1,el2){
      return compare(el2, el1, "Price")
    });
  } 
  updateJsonAndShowData();
}
