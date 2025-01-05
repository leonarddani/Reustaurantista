let currentIndex = 0;
const visibleItemsCount = 3;
let currentFoodPrice = 0;
let currentQuantity = 1;
async function fetchFoodData() {
  try {
    const response = await fetch("js/food.json");
    const foodData = await response.json();
    const intialCategory = "Lunch"
    renderFoodCarusel(foodData.categories[intialCategory])

    updateHeroImage(foodData.categories[intialCategory][0])

    setupArrowNavigation(foodData.categories[intialCategory])
  } catch (error) {
    console.log("error fetching food data");
    
  }
}

function renderFoodCarusel(foods){
    const foodItemsContainer = document.querySelector(".food-items");
    foodItemsContainer.innerHTML = "";

    foods.foreach((food, index) => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");
        if(index === 0){
            foodItem.classList.add("selected");
        }

        foodItem.innerHTML = `
        <img src="${food.image}" alt="${food.name}">

        <p>
        ${food.name} <br>
        <span class="item-price></span> <span class="valute>$</span> <span>${food.price.toFixed(2)}</span>
        </P>
        `

        if(index >= visibleItemsCount){
            foodItem.style.display = "none";
        }

        foodItem.addEventListener("click", () => {

            selectFoodItem(food, foodItem);
            currentIndex = index
        })
    })
    
}

function updateTotalPrice(){
    const totalPriceElement = querySelector(".order-info-total .price");
    const total = currentFoodPrice * currentQuantity;
    totalPriceElement.textContent = `$ ${total.toFixed(2)}`
}
updateTotalPrice()