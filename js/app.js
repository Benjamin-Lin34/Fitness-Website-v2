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
      bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
      bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
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
  // make an AJAX request to a recipe API
  // const xhr = new XMLHttpRequest();
  // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=9f22fbec0b9a40e1a933fcf9746735df&minCalories=${tdee}&maxCalories=${tdee+500}&sort=random`;
  // xhr.open("GET", url, true);
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     const data = JSON.parse(xhr.responseText);
  //     const recipe = data.results[0];
  //     // display the recipe information
  //     const recipeDiv = document.getElementById("recipe");
  //     recipeDiv.innerHTML = `
  //       <h2>Recommended Recipe:</h2>
  //       <p>${recipe.title}</p>
  //       <img src="${recipe.image}" alt="${recipe.title}" />
  //       <p><a href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
  //     `;
  //   }
  // };
  // xhr.send();

    // display the result
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>Your BMI is ${bmi.toFixed(2)}</p>
    <p>Your BMR is ${bmr.toFixed(2)} calories per day.</p>
    <p>Your TDEE is ${tdee.toFixed(2)} calories per day.</p>
  `;
}  

// attach event listener to the button
const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", calculateBMI);


  
//   // display the BMI, BMR, and TDEE
//   const resultDiv = document.getElementById("result");
//   resultDiv.innerHTML = `
//     <p>Your BMI is ${bmi.toFixed(2)}</p>
//     <p>Your BMR is ${bmr.toFixed(2)} calories per day.</p>
//     <p>Your TDEE is ${tdee.toFixed(2)} calories per day.</p>
//   `;