document.addEventListener("DOMContentLoaded", function() {
// item list //
    let menuItems = [
    {name: "Decaf", description: "A nice warm drink.", price: 2.99, offer: {discount: 20}, itemImages: 0},
    {name: "Iced Coffee", description: "A nice cold drink.", price: 3.99, offer: {discount: 10}, itemImages: 0},
    {name: "Latte",description: "A nice sweet drink.",price: 2.50, offer: {discount: 0}, itemImages: 0},
    {name: "Cappuccino", description: "A nice tasting drink.", price: 3.50, offer: {discount: 5}, itemImages: 0},
    {name: "Americano", description: "A nice basic drink.", price: 2.25, offer: {discount: 0}, itemImages: 0},
    {name: "Espresso", description: "A nice strong drink.", price: 3.75, offer: {discount: 25}, itemImages: 0}
];

// function to generate and display cards to html //
const products = document.querySelector("#menu");
const menuItemsLength = menuItems.length;
function displayMenuItems (menuItems) {
    for (let i = 0; i < menuItemsLength; i++){    
        if (menuItems[i].offer.discount > 0) {
          let discountedPrice = menuItems[i].price - (menuItems[i].price * menuItems[i].offer.discount / 100);
          let code = `
              <div class="card">
                <div class="itemImages">${menuItems[i].itemImages}</div>  
                <div class="cardText">
                      <h2 class="itemName">${menuItems[i].name}</h2>
                      <p class="description">${menuItems[i].description}</p>
                      <p class="price, line-through">$${menuItems[i].price.toFixed(2)}</p>
                      <p class="discountedPrice">${discountedPrice.toFixed(2)}</p>
                      <p class="offer">${menuItems[i].offer.discount.toFixed(2)}% off</p>
                      <button class="add-to-cart" data-id="${i}">Add to cart</button>
                  </div>
              </div>`
          products.innerHTML += code;
        } else if (menuItems[i].offer.discount <= 0) {
          let code = `
              <div class="card">
                <div class="itemImages">${menuItems[i].itemImages}</div>  
                <div class="cardText">
                      <h2 class="itemName">${menuItems[i].name}</h2>
                      <p class="description">${menuItems[i].description}</p>
                      <p class="price">$${menuItems[i].price.toFixed(2)}</p>
                      <button class="add-to-cart" data-id="${i}">Add to cart</button>
                  </div>
              </div>`
          products.innerHTML += code;
        }

    }
}
displayMenuItems(menuItems);
    
    
// function to add items //
const cartItems = [];
function addToCart(menuItem) {
  let index = cartItems.findIndex(item => item.name === menuItem.name);
  if (index === -1) {
    cartItems.push({...menuItem, quantity: 1});
  } else {
    cartItems[index].quantity++;
  }
}

const items = document.querySelector(".items");
const subtotal = document.querySelector(".subtotal");
const discount = document.querySelector(".discount");
const total = document.querySelector(".total");

function displayCartItems() {
  let subTotalAmount = 0;
  let totalDiscount = 0;
  let code = "";
  
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const itemPrice = item.price * item.quantity;
    const itemDiscount = item.offer.discount / 100;
    subTotalAmount += itemPrice;
    totalDiscount += itemPrice * itemDiscount;

    code += `
      <div class="cartItem">
        <h2 class="itemName">${item.name}</h2>
        <p class="quantity">${item.quantity}</p>
        <p class="price">$${item.price.toFixed(2)}</p>
        <button class="remove-from-cart, remove-one-from-cart" data-id="${i}">Remove from cart</button>
      </div>
    `;
  }

  let discountAmount = 0;
  if (totalDiscount > 0) {
    discountAmount = totalDiscount;
  }
  
  const totalAmount = subTotalAmount - discountAmount;

  code += `
    <div class="subtotalRow">
      <p class="subtotalLabel">Subtotal:</p>
      <p class="subtotalAmount">$${subTotalAmount.toFixed(2)}</p>
    </div>
  `;

  if (discountAmount > 0) {
    code += `
      <div class="discountRow">
        <p class="discountLabel">Discount:</p>
        <p class="discountAmount">-$${discountAmount.toFixed(2)}</p>
      </div>
    `;
  }

  code += `
    <div class="totalRow">
      <p class="totalLabel">Total:</p>
      <p class="totalAmount">$${totalAmount.toFixed(2)}</p>
    </div>
  `;

  items.innerHTML = code;
}


// add button events here //   
products.addEventListener("click", function(event) {
  if (event.target.classList.contains("add-to-cart")) {
    const id = parseInt(event.target.dataset.id);
    addToCart(menuItems[id]);
    displayCartItems();
  }
});

cart.addEventListener("click", function(event) {
  if (event.target.classList.contains("remove-one-from-cart")) {
    const id = parseInt(event.target.dataset.id);
    cartItems[id].quantity--;
    if (cartItems[id].quantity === 0) {
      cartItems.splice(id, 1);
    }
    displayCartItems();
  } else if (event.target.classList.contains("remove-from-cart")) {
    const id = parseInt(event.target.dataset.id);
    cartItems.splice(id, 1);
    displayCartItems();
  }

  displayCartItems();
});})