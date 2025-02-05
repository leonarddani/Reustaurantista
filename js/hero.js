let currentIndex = 0;
const visibleItemsCount = 3;
let currentFoodPrice = 0;
let currentQuantity = 1;
async function fetchFoodData() {
    try {
        const response = await fetch("js/food.json");
        const foodData = await response.json();
        const intialCategory = "Lunch";
        renderFoodCarusel(foodData.categories[intialCategory]);

        updateHeroImage(foodData.categories[intialCategory][0]);

        setupArrowNavigation(foodData.categories[intialCategory]);
    } catch (error) {
        console.log("error fetching food data");
    }
}

function renderFoodCarusel(foods) {
    const foodItemsContainer = document.querySelector(".food-items");
    foodItemsContainer.innerHTML = "";

    foods.foreach((food, index) => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");
        if (index === 0) {
            foodItem.classList.add("selected");
        }

        foodItem.innerHTML = `
        <img src="${food.image}" alt="${food.name}">

        <p>
        ${food.name} <br>
        <span class="item-price></span> <span class="valute>$</span> <span>${food.price.toFixed(
            2
        )}</span>
        </P>
        `;

        if (index >= visibleItemsCount) {
            foodItem.style.display = "none";
        }

        foodItem.addEventListener("click", () => {
            selectFoodItem(food, foodItem);
            currentIndex = index;
        });
    });
}

function updateTotalPrice() {
    const totalPriceElement = querySelector(".order-info-total .price");
    const total = currentFoodPrice * currentQuantity;
    totalPriceElement.textContent = `$ ${total.toFixed(2)}`;
}

document.getElementById("increase").addEventListener("click", () => {
    updateQuantity(currentQuantity + 1);
});

document.getElementById("decrease").addEventListener("click", () => {
    if (currentQuantity > 1) {
        updateQuantity(currentQuantity - 1);
    }
});

function updateQuantity(newQuantity) {
    currentQuantity = newQuantity;
    document.querySelector(".quantity").textContent = currentQuantity;
    updateTotalPrice();
}

function selectFoodItem(selectedFood, selectedElement) {
    updateHeroImage(selectedFood);

    currentFoodPrice = selectedFood.price;
    currentQuantity = 1;
    updateQuantity(currentQuantity);

    const allFodItems = document.querySelectorAll(".food-item");
    allFodItems.forEach((item) => item.classList.remove(selected));
    selectedElement.classList.add("selected");
}

function updateHeroImage(food) {
    const heroImage = document.querySelector(".hero-main-image");
    const foodTitle = document.querySelector(".food-title p:first-of-type");
    const foodRating = document.querySelector(".food-title p:first-of-type");
    const perparationTime = document.querySelector(".perpare-time");
    heroImage.src = food.image;
    heroImage.alt = food.name;
    foodTitle.textContent = food.name;
    foodRating.innerHTML = `<i class="fa-solid fa-star"</i>${food.rate}`;
    perparationTime.innerHTML = `<i class="fa-solid fa-clock"</i>${food.perparationTime}`;
}

function updateVIsibleItems(foods) {
    const foodItems = document.querySelectorAll(".food-item");

    foodItems.forEach((item, index) => {
        if (index <= currentIndex && index < currentIndex + visibleItemsCount) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    });
}

function setupArrowNavigation(foods) {
    const lefArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateVisibleItems(foods);
        }
    });

    rightArrow.addEventListener("click", () => {
        if (currentIndex < foods.length - visibleItemsCount) {
            currentIndex++;
            updateVisibleItems(foods);
        } else {
            currentIndex = 0;
        }
        updateVisibleItems(foods);
    });
}

function addToCard(selectedFood) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exestingItemIndex = cart.findIndex(
        (item) => item.name === selectedFood.name
    );
    if (exestingItemIndex !== -1) {
        cart[exestingItemIndex].quantity += currentQuantity;
    } else {
        cart.push({
            name: selectedFood.name,
            price: seleectedFood.price,
            image: selectedFood.image,
            quantity: currentQuantity,
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCardBadge();
}

function updateCardBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalUniqueItems = addToCard.length;
    document.getElementById("cart-badge").textContent = totalUniqueItems;
}

document.querySelector(".add-to-cart").addEventListener("click", () => {
    const selectedFood = {
        name: document.querySelector(".food-title p:first-of-type").textContent,
        price: currentFoodPrice,
        image: document.querySelector(".hero-main-image").src,
    };
    addToCard(selectedFood);
});

document.addEventListener("DOMContentLoaded", () => {
    fetchFoodData();
    updateCardBadge();
});
