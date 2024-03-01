
{/* <div class="card col-12 col-md-7 border-0">
    <div class="position-relative">
        <img class="card-img rounded-5" src="img/img02.png" alt="food">
            <div class="position-absolute top-50 start-50 translate-middle text-center">
                <h1 class="title">Butter Chicken (Murgh Makhani)</h1>
                <div class="video-button btn">
                    <a class="video" href="#"><img src="img/fi-sr-play.png" alt="heart"> Watch the video</a>
                </div>
            </div>
    </div>
    <div class="my-4">
        <div class="d-flex justify-content-between my-4">
            <a class="btn btn-primary col-5 fs-5 active" aria-current="page" href="#"
                role="button">Ingredients</a>
            <a class="btn btn-primary col-5 fs-5" href="#" role="button">Details</a>
        </div>
        <h2>9 Items</h2>
        <ul class="ingredients px-3" style="list-style-type:none;">
            <li class="ingredient row align-items-center ps-3">800g chicken breast</li>
            <li class="ingredient row align-items-center ps-3">1/2 cup plain yogurt</li>
            <li class="ingredient row align-items-center ps-3">1/2 tablespoons minced garlic</li>
        </ul>
    </div>
</div> */}

// Pasirinko recepto užpildymas duomenimis
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => data=response.json())
    .then(data => {
        // console.log(data);
        const meal = data.meals[0];
        //clearResults('recipes');
        console.log(meal.strMealThumb);
        document.querySelector('.card-img').src = meal.strMealThumb;        ;
        document.querySelector('.title').textContent = meal.strMeal;
        document.querySelector('.video').href = meal.strYoutube;
        document.querySelector('.video').target = "_blank";
        // Ingredients
        const ingredientsList = document.querySelector('.ingredients');
        // ingredientsList.innerHTML = '';
        let item = 0;
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                const li = document.createElement('li');
                li.className = "ingredient row align-items-center ps-3";
                li.textContent = measure +" "+ ingredient;
                ingredientsList.appendChild(li);
                item += 1;
            }
        } 
        document.querySelector('h2').textContent = item + " Items";
        })
       
// Mygtukas grąžina į pradinį html    
const backButton = document.querySelector('.back');
backButton.addEventListener('click', ()=>{
    history.back();
})
