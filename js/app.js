// load API
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR0Y1a6_0JrcNeHVo7wPF2ue_RAfMeFFLC3-IvA61t59eN5hEu2xkYJiSKA`;
  // const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement('div');
    div.classList.add('col-lg-4');
    div.innerHTML = `<div class="single-product card h-100">
      
    <img class=" w-50 mx-auto card-img-top" width="150px" height="250px"src=${image}></img>
      
     <div class="card-body" style="background-color: rgb(225, 242, 225)">
     <h3>${product.title}</h3>
     <p >Rating: <b>${product.rating.rate}</b> average based on <b>${product.rating.count}</b> reviews.</p>
     <p>Category: ${product.category}</p>
     <h2>Price: $ ${product.price}</h2>
     
     </div>
     
     <div class="card-footer d-flex justify-content-around">
     <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
     <button id="details-btn" class="btn btn-warning">Details</button>
     </div>
      </div>

      `;
    document.getElementById('all-products').appendChild(div);
  }
};
let count = 0;

// add to cart function for adding product
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice('price', price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById('total-Products').innerText = count;
};
// get input function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return parseFloat(converted.toFixed(2));
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue('price');
  if (priceConverted > 200) {
    setInnerText('delivery-charge', 30);
    setInnerText('total-tax', priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText('delivery-charge', 50);
    setInnerText('total-tax', priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText('delivery-charge', 60);
    setInnerText('total-tax', priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue('price') +
    getInputValue('delivery-charge') +
    getInputValue('total-tax');
  document.getElementById('total').innerText = grandTotal.toFixed(2);
};
