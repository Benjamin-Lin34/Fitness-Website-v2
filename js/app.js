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
      bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
    } else {
      bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)
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
  // display the result
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Your BMI is ${bmi.toFixed(2)}</p>
    <p>Your BMR is ${bmr.toFixed(2)} calories per day.</p>
    <p>Your TDEE is ${tdee.toFixed(2)} calories per day.</p>
  `;
  // make an AJAX request to a recipe API
  // Breakfast
  let breakfast_per = Math.random() * (0.3 - 0.2) + 0.2
  let breakfast_tdee = breakfast_per * tdee;
  const xhr = new XMLHttpRequest();
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f22fbec0b9a40e1a933fcf9746735df&maxCalories=${breakfast_tdee}&sort=random`;
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const recipe = data.results[0];
      const recipeImg = document.getElementById("recipeImg");
      const recipeTitle = document.getElementById("recipeTitle");
      const recipeDetail = document.getElementById("recipeDetail");

      recipeTitle.innerHTML = `${recipe.title}`;
      recipeImg.src = recipe.image;
      recipeDetail.innerHTML = `${recipe.nutrition.nutrients[0].name}: ${recipe.nutrition.nutrients[0].amount} ${recipe.nutrition.nutrients[0].unit}`;
      // display the recipe information
      const recipeDiv = document.getElementById("recipe");

  
      
      recipeDiv.innerHTML = `
        <h2>Recommended Recipe:</h2>
        <p>${recipe.title}</p>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p>${calories} ${calUnit}</p>
      `;
    } 
  };
  xhr.send();
}  

// attach event listener to the button
const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", calculateBMI);

