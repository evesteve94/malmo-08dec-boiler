/* 
Ni väljer om ni använder produktdatan i js eller json och om ni vill lägga till 
fler properties som bilder etc.

Ni får också använda ett api som t.ex. https://fakestoreapi.com/ för att generara
ut fiktiva produkter därifrån istället för från en lokal js/json.
*/

const things = [
    { id: 1, name: 'T-shirt', category: 'kläder', price: 100, image: './images/tshirt.jpg' },
    { id: 2, name: 'Hörlurar', category: 'elektronik', price: 250, image: './images/lurar.png' },
    { id: 3, name: 'Keps', category: 'kläder', price: 50, image: './images/keps.jpg' },
    { id: 4, name: 'Mobiltelefon', category: 'elektronik', price: 500, image: './images/mobbe.jpg' }
];

const cart = [];


//visa våra produkter - bara namn och pris
let productResults = things.map(thing => {
    return `
    <div class= "product-card">
    <h3> ${thing.name} </h3>
    <img src= "${thing.image}"> 
    <h4> ${thing.price}kr </h4>
    <button class= "buy-btn" id= "buy-btn${thing.id}"> Buy </button>
    </div>   `
})
//koppla till product-container
let productContainer = document.getElementById('product-container');

//lägga till i vår div
productContainer.innerHTML = productResults.join('');

/*länka till våra filter knappar/inputs */
//input pris
const priceInput = document.getElementById('price');
let priceQuery; //undefined
//input kategori
const categoryInput = document.getElementById('category');
let categoryQuery; // undefined

//knapp
const priceBtn = document.getElementById('price-btn');
priceBtn.addEventListener('click', () => {
    priceQuery = parseInt(priceInput.value); //blir en int
    categoryQuery = categoryInput.value.toLowerCase();
    //filter funktion
    let filteredThings = things.filter(thing => {
        //skapar två variabler som är villkor senare (booleans)
        let meetsPriceCriteria;
        let meetsCategoryCriteria;

        //jämför priceQuery (om det finns - användaren har angett ett värde)
        if (priceQuery) {
            //tilldelas värde   - om villkoret stämmer
            meetsPriceCriteria = thing.price <= priceQuery;
        } else {
            meetsPriceCriteria = true;
        }
        //samma sak, fast kategory
        if (categoryQuery) {
            //tilldelar värde ----- om villkoret stämmer (lowercase)
            meetsCategoryCriteria = thing.category.toLowerCase() === categoryQuery;
        } else {
            meetsCategoryCriteria = true;
        }
        
        //returnerar värdet av pris & kategori
        return meetsPriceCriteria && meetsCategoryCriteria;
    });
    //skapar HTML element enligt filter
    let productFilteredResults = filteredThings.map(thing => {
        return `
        <div class= "product-card">
        <h3> ${thing.name} </h3>
        <img src= "${thing.image}"> 
        <h4> ${thing.price}kr </h4>
        <button class= "buy-btn" id= "buy-btn${thing.id}"> Buy </button>
        </div>   `
    })
        // uppdaterar vår div med filtrerade resultat
        productContainer.innerHTML = productFilteredResults.join('');
        //tömma priceInput
        priceInput.value = '';
        for (let i = 0; i < things.length; i++) {
            let buyButton = document.getElementById(`buy-btn${things[i].id}`);
        
            if (buyButton) {
                buyButton.addEventListener('click', function() {
                    // Lägg till den klickade produkten i varukorgen
                    addToCart(things[i]);
                    //lägger till varan i vår cart array
                    cart.push(things[i]);
                    // Använd reduce() för att beräkna totalpriset
                    let totalPrice = cart.reduce(function(total, product) {
                        return total + product.price;
                    }, 0);
                    
                    // Skriv ut totalpriset
                    totalSum.textContent = `Total: ${totalPrice}kr`;
                    
                });
            }
        }
        
        function addToCart(product) {
            // Skapa HTML för den klickade produkten
            let cartResult = `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <img src= "${product.image}"> 
                    <h4>${product.price}kr</h4>
                </div>`;
        
            // Lägg till HTML för den klickade produkten i varukorgen
            cartDiv.innerHTML += cartResult;
        
        };
})
//hämta cart
const cartDiv = document.getElementById('cart');

//hämta total
const totalSum = document.getElementById('total');

//skapa event för köp-knapp
//hämta knapp
for (let i = 0; i < things.length; i++) {
    let buyButton = document.getElementById(`buy-btn${things[i].id}`);

    if (buyButton) {
        buyButton.addEventListener('click', function() {
            // Lägg till den klickade produkten i varukorgen
            addToCart(things[i]);
            //lägger till varan i vår cart array
            cart.push(things[i]);
            // Använd reduce() för att beräkna totalpriset
            let totalPrice = cart.reduce(function(total, product) {
                return total + product.price;
            }, 0);
            
            // Skriv ut totalpriset
            totalSum.textContent = `Total: ${totalPrice}kr`;
            
        });
    }
}

function addToCart(product) {
    // Skapa HTML för den klickade produkten
    let cartResult = `
        <div class="product-card">
            <h3>${product.name}</h3>
            <img src= "${product.image}"> 
            <h4>${product.price}kr</h4>
        </div>`;

    // Lägg till HTML för den klickade produkten i varukorgen
    cartDiv.innerHTML += cartResult;

};
//skapa argressivt meddelande


//hämta checkout
const checkoutBtn = document.getElementById('checkout');
//hämta main
const main = document.querySelector('main');
checkoutBtn.addEventListener('click', function(){
    main.innerHTML = `
    <h1 class= "angry-msg"> VI HADE INTE TID! </h1>`
})
