const productList = document.getElementById('product-list');
const popup = document.getElementById('popup');
const priceOptions = document.getElementById('price-options');
const addToCartBtn = document.getElementById('add-to-cart');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
let xPrice = []

// Ürünleri al ve listeleyen fonksiyon
function listProducts(xProducts) {
  products = xProducts
  for (let i = 0; i < xProducts.length; i++) {
    const product = xProducts[i];
    const productElement = document.createElement('div');
    productElement.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
    productElement.innerHTML = `
      <div class="card mb-4">
        <img src="${product.img}" alt="${product.name}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#productModal">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          ${getDescription(product.description)}
          ${generatePriceHTML(product.service, product.id)}
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
              <img src="${product.img}" alt="${product.name}" class="modal-img">
              <h5 class="modal-title mt-3">${product.name}</h5>
              <p class="modal-text">${product.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(productElement);
  }
}

function getDescription(description) {
  return description ? `<p class="card-text">${description}</p>` : "";
}

// Ürün fiyatlarını HTML olarak oluşturan fonksiyon
function generatePriceHTML(prices, productId) {
  let priceHTML = '';
  xPrice += prices
  console.log(prices);
  priceHTML += '<div class="price-options">';
  for (const i of Object.keys(prices)) {
    let text = ""
    const price = prices[i];
    if (i == "-") { text += price.price } else { text += i + " " + price.price }
    priceHTML += `<button class="btn btn-outline-primary" onclick="addToCart(${productId}, ${price.price})">${text}₺</button>`;
  }
  priceHTML += '</div>';

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
  if (Object.keys(products.find(item => item.id == productId).service).length == 1) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item', 'col-lg-4', 'col-md-6', 'col-sm-12');
    let product = products.find(item => item.id == productId)
    /*
    let key = ""
    for(i of Object.keys(product.service)){
      if(i.price)
    }
  */
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

//örnek liste
function getData() {
  return {
    "Grand Tavuk Specials": [
      {
        "id": "101",
        "name": "Chili Soslu Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri, Chili sosu, biber ve mantar.",
        "img": "product4.jpg",
        "service": [{
          "title": "160gr",
          "description": "kremalı makarna ve salata", "price": 90
        },
        {
          "title": "160gr",
          "description": "kremalı makarna salata ve patates cips", "price": 90
        }]

      },
      {
        "id": "102",
        "name": "Soya Soslu Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri, soya sosu, kapya biber, mantar",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "103",
        "name": "Köri Soslu Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri, özel köri sosu,mantar",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "104",
        "name": "Cafe De Paris Soslu Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri,cafe de Paris sosu,mantar,kapya biber yeşil biber.",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "105",
        "name": "Dağ Kekikli Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri,dağ kekiği biber ve mantar.",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "106",
        "name": "Barbekü Soslu Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri,barbekü sosu kapya biber, yeşil biber mantar.",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "107",
        "name": "Mexican Soslu Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri,mantar,kapya biber, ÖZEL Mexican sosu",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "108",
        "name": "Chedar Peynirli Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri,chedar peyniri,kapya biber,yeşil biber,mantar.",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "109",
        "name": "Tavuk Çökertme",
        "description": "Izgara tavuk bonfile dilimleri,ince doğranmış kibrit patates dilimleri,süzme yoğurt",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "110",
        "name": "Tavuk Güveç",
        "description": "Sotelenmiş tavuk bonfile dilimleri,biber,mantar,domates, kaşar",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "112",
        "name": "Izgara Tavuk Bonfile",
        "description": "",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "113",
        "name": "Beğendili Tavuk",
        "description": "Sotolenmiş tavuk bonfile dilimleri, biber, domates sosu ve beğendi sosu ile servis edilir.",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "114",
        "name": "Kremalı Mantarlı Tavuk",
        "description": " Sotelenmiş tavuk bonfile dilimleri ,mantar ,krema, özel baharatlar .",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "115",
        "name": "Acılı Köri",
        "description": "Sotelenmiş tavuk bonfile dilimleri, özel acılı köri sosu mantar",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "116",
        "name": "Acılı Chedar",
        "description": "Sotelenmiş tavuk bonfile dilimleri, cheddar peyniri, kapya biber, yeşil biber, mantar.",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "117",
        "name": "Grand Közlüce",
        "description": "Sotelenmiş tavuk bonfile dilimleri, közlenmiş kapya biber, mantar ve biber  ",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      },
      {
        "id": "118",
        "name": "Petso Soslu Tavuk",
        "description": "Sotelenmiş tavuk bonfile dilimleri, pesto sosu ve mantar",
        "img": "product4.jpg",
        "service": {
          "160gr": {
            "description": "kremalı makarna ve salata", "price": 90
          },
          "200gr": {
            "description": "kremalı makarna salata ve patates cips", "price": 90
          }
        }

      }
    ],
    "Kahvaltılar": [
      {
        "id": "201",
        "name": "Serpme Kahvaltı",
        "description": '<p><b>Peynirler :</b> Beyaz Peynir, Kaşar Peynir, Örgü Peynir, Tel Peynir, Kalem Peynir .</p><p><b>Zeytinler :</b> Siyah Zeytin, Yeşil Zeytin,&nbsp;</p><p><b>Reçeller :</b> Kayısı Reçeli, Vişne Reçeli.</p><p><b>Yeşillikler :</b> Marul, Salatalık, Domates .</p><p><b>Sıcaklar :</b> Menemen,Haşlama Yumurta, Sucuk, Salam, Sosis, Sigara Böreği, Patates Cips.</p><p><b>Ekstralar :</b> Tahin, Pekmez, Bal, Tereyağı,Nutella, Acuka.</p><p><b>Çay :</b> Çay servisimiz ücretsizdir. Masalara termos ile servis edilir .</p><div style="text-align: center;"><b style="font-size: 1rem;"><font style="background-color: rgb(247, 173, 107);" color="#636363"><span style="font-family: " arial="" black";"="">Serpme Kahvaltımız 2 Kişiliktir.</span></font></b></div><div style="text-align: center;"><b style="font-size: 1rem;"><font style="background-color: rgb(247, 173, 107);" color="#636363"><span style="font-family: " arial="" black";"="">Ekstra Kişi Talebi 50 TL ile ücretlendirilir.</span></font></b></div>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 250
          },
          "Ek Servis": {
            "description": null, "price": 50
          }
        }

      },
      {
        "id": "202",
        "name": "Kahvaltı Tabağı",
        "description": "<p>Beyaz peynir, Kaşar peynir, Örgü peynir, Domates, Salatalık, Siyah ve Yeşil Zeytin, Bal, Tereyağı, Reçel Çeşitleri, Haşlanmış Yumurta, Patates Cips, Salam, Sosis, 1 Fincan Çay ile Servis Edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 70
          }
        }

      },
      {
        "id": "203",
        "name": "Omlet",
        "description": "<p>3 Adet yumurta, domates, salatalık ve çips ile servis edilir</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 43
          }
        }

      },
      {
        "id": "204",
        "name": "Sahanda Yumurta",
        "description": null,
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 40
          }
        }

      },
      {
        "id": "205",
        "name": "Kaşarlı Omlet",
        "description": "<p>3 Adet yumurta ,domates, salatalık, kaşar peyniri ve patates çips ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 48
          }
        }

      },
      {
        "id": "206",
        "name": "Menemen",
        "description": "<p>3 Adet yumurta yeşil biber, domates ve isteğe göre sağan ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 50
          }
        }

      },
      {
        "id": "207",
        "name": "Karışık Omlet",
        "description": "<p>3 Adet yumurta, kaşar peyniri, sucuk, domates, salatalık ve patates çips ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 50
          }
        }

      },
      {
        "id": "208",
        "name": "Sahanda Sucuklu Yumurta",
        "description": "<p>2 Adet yumurta, sucuk ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 50
          }
        }

      },
      {
        "id": "209",
        "name": "Sucuklu Omlet",
        "description": "<p>3 Adet yumurta, sucuk, domates, salatalık, ve patates çips ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 48
          }
        }

      },
      {
        "id": "210",
        "name": "Kaşarlı Tost",
        "description": "<p>Domates, salatalık ve patates çips ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 45
          }
        }

      },
      {
        "id": "211",
        "name": "Karışık Tost",
        "description": "<p>Domates, salatalık ve patates çips ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 50
          }
        }

      },
      {
        "id": "212",
        "name": "Ayvalık Tostu",
        "description": "<p>Domates, salatalık, turşu, salam, sosis, kaşar, özel sos ve patates çips ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 55
          }
        }

      },
      {
        "id": "213",
        "name": "Gözleme",
        "description": "<p>Patatesli, Kaşarlı, Patates kaşarlı yanında patates cips&nbsp; ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 65
          }
        }

      }
    ],
    "Pizzalar": [
      {
        "id": "301",
        "name": "Karışık Pizza",
        "description": "<p>Pizza Sosu, Pizza peyniri, Salam, Sosis, Sucuk, Mantar, Biber, Mısır, Zeytin ile servis edilir.</p>",
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 70
          }
        }

      },
      {
        "id": "302",
        "name": "Sucuklu Pizza",
        "description": '<p>Pizza sosu, Pizza peyniri, Sucuk ile servis edilir.</p>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 70
          }
        }

      },
      {
        "id": "303",
        "name": "Tavuklu Pizza",
        "description": '<p>Pizza Sosu, Pizza peyniri, Küp tavuk parçaları, Biber, Domates, Kekik ile servis edilir.</p>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 70
          }
        }

      },
      {
        "id": "304",
        "name": "Vejeteryan Pizza",
        "description": '<p>Pizza sosu, Pizza peyniri, Domates ,Kapya biber, Yeşil biber, Mantar, Mısır, Zeytin ile servis edilir.</p>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 70
          }
        }

      },
    ],
    "Burgerler": [
      {
        "id": "401",
        "name": "Tavuk Burger",
        "description": '<p>110gr. Tavuk eti,şişe cola,chedar peyniri,kıvırcık marul,domates,turşu ve parmak patates ile servis edilir.</p>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 65
          }
        }

      },
      {
        "id": "402",
        "name": "Klasik Burger",
        "description": '<p>100gr Dana eti,şişe cola,kıvırcık marul,domates,turşu ve parmak patates ile servis edilir.&nbsp;</p>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 70
          }
        }

      },
      {
        "id": "403",
        "name": "Cheese Burger",
        "description": '<p>100gr. Dana eti,şişe cola chedar peyniri,kıvırcık marul,turşu,domates ve parmak patates ile servis edilir.&nbsp;</p>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 75
          }
        }

      },
      {
        "id": "404",
        "name": "Mexican Burger",
        "description": '<p>100gr. Dana eti,şişe cola,acı mexıcan sos,chedar peyniri,kıvırcık marul,domates,turşu ve parmak patates ile servis edilir.&nbsp;</p>',
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 75
          }
        }

      },
    ],
    "Türk Kahveleri": [
      {
        "id": "501",
        "name": "Sütlü Türk Kahvesi",
        "description": 'Sütlü TÜrk Kahvesi',
        "img": "product4.jpg",
        "service": {
          "Tek": {
            "description": null, "price": 30
          },
          "Duble": {
            "description": null, "price": 45
          }
        }

      },
      {
        "id": "502",
        "name": "Kumda Türk Kahvesi",
        "description": null,
        "img": "product4.jpg",
        "service": {
          "Tek": {
            "description": null, "price": 30
          },
          "Duble": {
            "description": null, "price": 40
          }
        }

      },
      {
        "id": "503",
        "name": "Damla Sakızlı",
        "description": null,
        "img": "product4.jpg",
        "service": {
          "-": {
            "description": null, "price": 35
          }
        }

      },
    ]
  };
}
let products = getData()["Kahvaltılar"]
// Ürünleri listeleyin
listProducts(getData()["Kahvaltılar"]);

