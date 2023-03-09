function calculateBMI() {
  // get input values
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const activity = document.getElementById("activity").value;

  // validate input values
  if (weight <= 0 || height <= 0 || age <= 0) {
    alert("Invalid input values. Please enter positive numbers.");
    return;
  }

  // calculate BMI
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  // calculate BMR
  let bmr;
  if (gender === "male") {
    bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  } else {
    bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }

  // calculate TDEE
  let tdee;
  switch (activity) {
    case "sedentary":
      tdee = bmr * 1.2;
      break;
    case "lightly-active":
      tdee = bmr * 1.375;
      break;
    case "moderately-active":
      tdee = bmr * 1.55;
      break;
    case "very-active":
      tdee = bmr * 1.725;
      break;
    case "super-active":
      tdee = bmr * 1.9;
      break;
  }

  const meal = document.getElementById("meal").value;
  let first;
  let second;
  let third;
  let random1 = ["bread", "side dish"];
  let random2 = ["beverage", "dessert"];
  switch (meal) {
    case "breakfast":
      first = "main course";
      let num = Math.round(Math.random());
      second = random1[num];
      third = random2[num];
      break;
    case "lunch":
      first = "main course";
      second = "side dish";
      third = "beverage";
      break;
    case "dinner":
      first = "main course";
      second = "side dish";
      third = "dessert";
      break;
  }
  // display the result
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="message">
    <article>
    <p>Your BMI is ${bmi.toFixed(2)}</p>
    <p>Your BMR is ${bmr.toFixed(2)} calories per day.</p>
    <p>Your TDEE is ${tdee.toFixed(2)} calories per day.</p>
    </article>
    </div>
  `;

  // make an AJAX request to a recipe API
  let breakfast_per = Math.random() * (0.3 - 0.2) + 0.2;
  let breakfast_tdee = breakfast_per * tdee;
  let lunch_per = (1 - breakfast_per) / 2;
  let lunch_tdee = lunch_per * tdee;
  let dinner_per = (1 - breakfast_per) / 2;
  let dinner_tdee = dinner_per * tdee;
  const xhr = new XMLHttpRequest();
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f22fbec0b9a40e1a933fcf9746735df&maxCalories=${breakfast_tdee}&number=2&sort=random&type=${first}&addRecipeInformation=true&addRecipeNutrition=true`;

  // Breakfast
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const recipe = data.results[0];
      const recipeImg = document.getElementById("firstDishImg");
      const recipeTitle = document.getElementById("firstDish");
      const recipeDetail = document.getElementById("firstDishDesc");
      const recipeIngr = document.getElementById("firstDishIngr");
      // const sliderValue = slider.value;
      // document.getElementById("value").innerHTML = sliderValue;
      recipeTitle.innerHTML = `<h3>${first}</h3><p>${recipe.title}</p>`;
      recipeImg.src = recipe.image;
      recipeDetail.innerHTML = `${recipe.nutrition.nutrients[0].name}: ${recipe.nutrition.nutrients[0].amount} ${recipe.nutrition.nutrients[0].unit}`;
      recipeIngr.innerHTML = `<button id="Indri1" class="readmore">show more</button><div id="recipe-summary1" class="message"><article>${recipe.summary.substring(
        0,
        100
      )}...</article></div>`;
      const ingridient = document.getElementById("Indri1");
      let showIngredients = false;
      ingridient.addEventListener("click", () => {
        showIngredients = !showIngredients;
        if (showIngredients) {
          const summaryDiv = document.getElementById("recipe-summary1");
          summaryDiv.innerHTML = `<article>${recipe.summary}</article>`;
          ingridient.innerText = "show less";
        } else {
          const summaryDiv = document.getElementById("recipe-summary1");
          summaryDiv.innerHTML = `<article>${recipe.summary.substring(0, 100)}...<article>`;
          ingridient.innerText = "show more";
        }
      });

      let modal = document.getElementById("recipe-modal1");

      recipeImg.onclick = function () {
        // recipeImg.style.display = "none";
        modal.style.display = "inline-block";
        let nutri = "";

        recipe.nutrition.nutrients.forEach(function (nutrient) {
          nutri += `<p class="nutrients">${nutrient.name}: ${nutrient.amount} ${nutrient.unit} percent of daily needs: %${nutrient.percentOfDailyNeeds}</p>`;
        });
        modal.innerHTML = nutri;
      };

      document.onclick = function (event) {
        if (
          event.target == modal ||
          event.target == document.getElementsByClassName("nutrients")
        ) {
          console.log(event.target);
          // recipeImg.style.display = "block";
          modal.style.display = "none";
          modal.innerHTML = ``;
        }
      };
    }
  };
  xhr.send();
  // Lunch
  const url2 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f22fbec0b9a40e1a933fcf9746735df&maxCalories=${breakfast_tdee}&number=2&sort=random&type=${second}&addRecipeInformation=true&addRecipeNutrition=true`;

  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", url2, true);
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4 && xhr2.status === 200) {
      const data = JSON.parse(xhr2.responseText);
      const recipe = data.results[0];
      const recipeImg = document.getElementById("SecondDishImg");
      const recipeTitle = document.getElementById("SecondDish");
      const recipeDetail = document.getElementById("SecondDishDesc");
      const recipeIngr = document.getElementById("SecondDishIngr");

      recipeTitle.innerHTML = `<h3>${second}</h3><p>${recipe.title}</p>`;
      recipeImg.src = recipe.image;
      recipeDetail.innerHTML = `${recipe.nutrition.nutrients[0].name}: ${recipe.nutrition.nutrients[0].amount} ${recipe.nutrition.nutrients[0].unit}`;
      recipeIngr.innerHTML = `<button id="Indri2" class="readmore">show more</button><div id="recipe-summary2">${recipe.summary.substring(
        0,
        100
      )}...</div>`;
      const ingridient = document.getElementById("Indri2");
      let showIngredients = false;
      ingridient.addEventListener("click", () => {
        showIngredients = !showIngredients;
        if (showIngredients) {
          const summaryDiv = document.getElementById("recipe-summary2");
          summaryDiv.innerHTML = recipe.summary;
          ingridient.innerText = "show less";
        } else {
          const summaryDiv = document.getElementById("recipe-summary2");
          summaryDiv.innerHTML = recipe.summary.substring(0, 100) + "...";
          ingridient.innerText = "show more";
        }
      });

      let modal = document.getElementById("recipe-modal1");

      recipeImg.onclick = function () {
        // recipeImg.style.display = "none";
        modal.style.display = "inline-block";
        let nutri = "";

        recipe.nutrition.nutrients.forEach(function (nutrient) {
          nutri += `<p class="nutrients">${nutrient.name}: ${nutrient.amount} ${nutrient.kcal} percent of daily needs: %${nutrient.percentOfDailyNeeds}</p>`;
        });
        modal.innerHTML = nutri;
      };

      document.onclick = function (event) {
        if (
          event.target == modal ||
          event.target == document.getElementsByClassName("nutrients")
        ) {
          console.log(event.target);
          // recipeImg.style.display = "block";
          modal.style.display = "none";
          modal.innerHTML = ``;
        }
      };
    }
  };
  xhr2.send();
  // Dinner
  const url3 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f22fbec0b9a40e1a933fcf9746735df&maxCalories=${breakfast_tdee}&number=2&sort=random&type=${third}&addRecipeInformation=true&addRecipeNutrition=true`;

  const xhr3 = new XMLHttpRequest();
  xhr3.open("GET", url3, true);
  xhr3.onreadystatechange = function () {
    if (xhr3.readyState === 4 && xhr3.status === 200) {
      const data = JSON.parse(xhr3.responseText);
      const recipe = data.results[0];
      const recipeImg = document.getElementById("ThirdDishImg");
      const recipeTitle = document.getElementById("ThirdDish");
      const recipeDetail = document.getElementById("ThirdDishDesc");
      const recipeIngr = document.getElementById("ThirdDishIngr");

      recipeTitle.innerHTML = `<h3>${third}</h3><p>${recipe.title}</p>`;
      recipeImg.src = recipe.image;
      recipeDetail.innerHTML = `${recipe.nutrition.nutrients[0].name}: ${recipe.nutrition.nutrients[0].amount} ${recipe.nutrition.nutrients[0].unit}`;
      recipeIngr.innerHTML = `<button id="Indri3" class="readmore">show more</button><div id="recipe-summary3">${recipe.summary.substring(
        0,
        100
      )}...</div>`;
      const ingridient = document.getElementById("Indri3");
      let showIngredients = false;
      ingridient.addEventListener("click", () => {
        showIngredients = !showIngredients;
        if (showIngredients) {
          const summaryDiv = document.getElementById("recipe-summary3");
          summaryDiv.innerHTML = recipe.summary;
          ingridient.innerText = "show less";
        } else {
          const summaryDiv = document.getElementById("recipe-summary3");
          summaryDiv.innerHTML = recipe.summary.substring(0, 100) + "...";
          ingridient.innerText = "show more";
        }
      });

      let modal = document.getElementById("recipe-modal1");

      recipeImg.onclick = function () {
        // recipeImg.style.display = "none";
        modal.style.display = "inline-block";
        let nutri = "";

        recipe.nutrition.nutrients.forEach(function (nutrient) {
          nutri += `<p class="nutrients">${nutrient.name}: ${nutrient.amount} ${nutrient.kcal} percent of daily needs: %${nutrient.percentOfDailyNeeds}</p>`;
        });
        modal.innerHTML = nutri;
      };

      document.onclick = function (event) {
        if (
          event.target == modal ||
          event.target == document.getElementsByClassName("nutrients")
        ) {
          console.log(event.target);
          // recipeImg.style.display = "block";
          modal.style.display = "none";
          modal.innerHTML = ``;
        }
      };
    }
  };
  xhr3.send();
}

const carbs = document.getElementById("carbs");
const carbsValue = document.getElementById("carbsValue");
carbsValue.innerHTML = carbs.value;

carbs.addEventListener("input", function() {
  carbsValue.innerHTML = this.value;
})

const protein = document.getElementById("protein");
const proteinValue = document.getElementById("proteinValue");
proteinValue.innerHTML = protein.value;

protein.addEventListener("input", function() {
  proteinValue.innerHTML = this.value;
})

const fat = document.getElementById("fat");
const fatValue = document.getElementById("fatValue");
fatValue.innerHTML = fat.value;

fat.addEventListener("input", function() {
  fatValue.innerHTML = this.value;
})
// attach event listener to the button
const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", calculateBMI);
