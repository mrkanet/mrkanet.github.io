const productList = document.getElementById('product-list');
const popup = document.getElementById('popup');
const priceOptions = document.getElementById('price-options');
const addToCartBtn = document.getElementById('add-to-cart');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

// Ürünleri al ve listeleyen fonksiyon
function listProducts(products) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productElement = document.createElement('div');
    productElement.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
    productElement.innerHTML = `
      <div class="card mb-4">
        <img src="${product.image}" alt="${product.title}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#productModal">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          ${generatePriceHTML(product.prices, product.id)}
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Sepete Ekle</button>
        </div>
      </div>
      <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel">Ürün Detayları</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
            </div>
            <div class="modal-body">
              <img src="${product.image}" alt="${product.title}" class="modal-img">
              <h5 class="modal-title mt-3">${product.title}</h5>
              <p class="modal-text">${product.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(productElement);
  }
}

// Ürün fiyatlarını HTML olarak oluşturan fonksiyon
function generatePriceHTML(prices, productId) {
  let priceHTML = '';

  if (prices.length > 1) {
    priceHTML += '<div class="price-options">';
    for (let i = 0; i < prices.length; i++) {
      const price = prices[i];
      priceHTML += `<button class="btn btn-outline-secondary" onclick="selectPrice(${productId}, ${price})">${price}₺</button>`;
    }
    priceHTML += '</div>';
  }

  return priceHTML;
}

// Seçilen fiyatı saklayacak değişken
let selectedPrice = {};

// Seçilen fiyatı saklayan fonksiyon
function selectPrice(productId, price) {
  selectedPrice[productId] = price;
}

// Sepete ürün ekleyen fonksiyon
function addToCart(productId) {
  console.log(products.find(item => item.id == productId))
  if (products.find(item => item.id == productId).prices.length == 1) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item', 'col-lg-4', 'col-md-6', 'col-sm-12');
    let product = products.find(item => item.id == productId)
    selectPrice(productId, product.prices[0])
    cartItem.innerHTML = `
    <div class="card mb-4">
      <p>${product.title}</p>
      <p>${product.description}</p>
      <p>${selectedPrice[productId]} ₺</p>
    </div>
    `;
    cartItems.appendChild(cartItem);
    cartItems.style.display = 'flex'

    calculateTotalPrice();
  } else if (selectedPrice[productId]) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item', 'col-lg-4', 'col-md-6', 'col-sm-12');
    let product = products.find(item => item.id == productId)
    cartItem.innerHTML = `
    <div class="card mb-4">
      <p>${product.title}</p>
      <p>${product.description}</p>
      <p>${selectedPrice[productId]} ₺</p>
    </div>
    `;
    cartItems.appendChild(cartItem);
    cartItems.style.display = 'flex'

    calculateTotalPrice();
  } else {
    alert('Lütfen bir fiyat seçin.');
  }
}
// Toplam fiyatı hesaplayan fonksiyon
function calculateTotalPrice() {
  let total = 0;

  const cartItems = document.getElementsByClassName('cart-item');
  console.log(selectedPrice);
  for (let i = 0; i < cartItems.length; i++) {
    const priceElement = cartItems[i].querySelector('p:nth-child(3)');
    console.log(priceElement.innerText.replace("Fiyat:", '').replace('₺', ''));
    const price = parseFloat(priceElement.innerText.replace("Fiyat:", '').replace('₺', ''));
    total += price;
  }

  document.getElementsByClassName('cart')[0].style.display = 'block';
  console.log(total);
  totalPrice.innerText = total.toFixed(2) + '₺';
}

// Örnek ürünler
const products = [
  {
    id: 1,
    title: 'Ürün 1',
    description: 'Bu ürünün açıklaması.',
    prices: [9.99, 14.99, 19.99],
    image: 'product1.jpg'
  },
  {
    id: 2,
    title: 'Ürün 2',
    description: 'Bu ürünün açıklaması.',
    prices: [12.99, 17.99],
    image: 'product2.jpg'
  },
  {
    id: 3,
    title: 'Ürün 3',
    description: 'Bu ürünün açıklaması.',
    prices: [24.99],
    image: 'product3.jpg'
  },
  {
    id: 4,
    title: 'Ürün 4',
    description: 'Bu ürünün açıklaması.',
    prices: [24.99],
    image: 'product4.jpg'
  }
];

// Ürünleri listeleyin
listProducts(products);
