// From https://www.w3schools.com/howto/howto_js_accordion.asp

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// Adapted from https://www.w3schools.com/w3css/w3css_tabulators.asp
function openGroup(groupName) {
  populateListProductChoices(this.id, 'displayProduct', groupName)
  var i;
  var x = document.getElementsByClassName("category");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(groupName).style.display = "block";
}
	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2, group = "fruitsvegetables") {
    var s1 = document.getElementById(slct1);
	console.log(group + "_" + slct2);
    var s2 = document.getElementById(group + "_" + slct2);
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products);
	optionArray = optionArray.filter(item => item.group === group);
    optionArray.sort(compare);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
        
	for (i = 0; i < optionArray.length; i++) {
			
	    var productName = optionArray[i].name;
	    var productPrice = optionArray[i].price;
	    // create the checkbox and add in HTML DOM
	    var checkbox = document.createElement("input");
	    checkbox.type = "checkbox";
	    checkbox.name = "product";
	    checkbox.value = productName;
	    s2.appendChild(checkbox);
	    
	    // create a label for the checkbox, and also add in HTML DOM
	    var label = document.createElement('label')
	    label.htmlFor = productName;
	    label.appendChild(document.createTextNode("$" + productPrice.toFixed(2) + ": " + productName));
	    s2.appendChild(label);
	    
	    // create a breakline node and add in HTML DOM
	    s2.appendChild(document.createElement("br"));    
	}
}

function compare( a, b ) {
  if ( a.price < b.price ){
    return -1;
  }
  if ( a.price > b.price ){
    return 1;
  }
  return 0;
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item`
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is $" + getTotalPrice(chosenProducts)));
		
}

