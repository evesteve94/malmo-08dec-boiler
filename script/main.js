/* 
Ni väljer om ni använder produktdatan i js eller json och om ni vill lägga till 
fler properties som bilder etc.

Ni får också använda ett api som t.ex. https://fakestoreapi.com/ för att generara
ut fiktiva produkter därifrån istället för från en lokal js/json.
*/

const things = [
    { id: 1, name: 'T-shirt', category: 'kläder', price: 100 },
    { id: 2, name: 'Hörlurar', category: 'elektronik', price: 250 },
    { id: 3, name: 'Keps', category: 'kläder', price: 50 },
    { id: 4, name: 'Mobiltelefon', category: 'elektronik', price: 500 }
];

const cart = [];


//visa våra produkter - bara namn och pris
let productResults = things.map(thing => {
    return `
    <div class= "product-card">
    <h3> ${thing.name} </h3>
    <h4> ${thing.price} </h4>
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
    //console.log(priceQuery);
    //filter funktion
    let filteredThings = things.filter(thing => {
        return thing.price <= priceQuery;
    });
    let productFilteredResults = filteredThings.map(thing => {
        return `
        <div class= "product-card">
        <h3> ${thing.name} </h3>
        <h4> ${thing.price} </h4>
        </div>   `
    })
        // uppdaterar vår div med filtrerade resultat
        productContainer.innerHTML = productFilteredResults.join('');
})

