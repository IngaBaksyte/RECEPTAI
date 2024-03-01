////////////////////////////////////////////////////////////////////////
// FUNKCIJOS

// F-ja, kuri išvalo konteinerį užduotai klasei
function clearResults(containerName) {
    let reloadContainer = document.getElementsByClassName(containerName)[0];
    reloadContainer.innerHTML = ''; 
}        


{/* <div class="recipes row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
        <a href="details.html?id=${meal.idMeal}"
            <article class="col">
                <div class="card rounded-5 shadow">
                    <img class="card-img-top rounded-top-5" src="img/img01.png" alt="food">
                    <div class="card-img-overlay row row-cols-auto justify-content-end p-0 px-3">
                        <a class="button p-0" href="#"><img src="img/heart.svg" alt="heart"></a>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6 class="card-title col-9">Vegetable Biryani With Baked Tofu</h6>
                            <div>
                                <img src="img/star.svg" alt="star">
                                <p class="rating">4.6</p>
                            </div>
                        </div>
                        <ul class="card-text p-0">
                            <li class="d-inline-flex">25 min</li>
                            <li class="d-inline-flex">&bull;</li>
                            <li class="d-inline-flex">Indian cuisine</li>
                        </ul>
                    </div>
                </div>
            </article>
        </a>
    </div> */}

// Receptu isvedimas pagal rakta
function makeCards(searchQuery) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then((response) => response.json())
    .then(data => {
        clearResults('recipes');
        const meals = data.meals;
        //console.log(meals);
        const divRecipes = document.querySelector('.recipes');
        meals.forEach(meal => {
            //console.log(meal.strMeal);
            const detailsLink = document.createElement('a');
            detailsLink.href = `indexDetails.html?id=${meal.idMeal}`;
            const recipe = document.createElement('article');
            recipe.className = "col";
            const divCard = document.createElement('div');
            divCard.className = "card rounded-5 shadow";
            const image = document.createElement('img');
            image.className = "card-img-top rounded-top-5";
            image.alt = "food";
            image.src = meal.strMealThumb;
            divCard.appendChild(image);
            const divOverlay = document.createElement('div');
            divOverlay.className = "card-img-overlay row row-cols-auto justify-content-end p-0 px-3";
            const aButton = document.createElement('a');
            aButton.className = "button p-0";
            aButton.href = `details.html?id=${meal.idMeal}`;
            const imgHeart = document.createElement('img');
            imgHeart.src = "img/heart.svg";
            imgHeart.alt = "heart";
            aButton.appendChild(imgHeart);
            divOverlay.appendChild(aButton);
            divCard.appendChild(divOverlay);
            const divCardBody = document.createElement('div');
            divCardBody.className = "card-body";
            const divFlex = document.createElement('div');
            divFlex.className = "d-flex justify-content-between";
            const cardTitle = document.createElement('h6');
            cardTitle.className = "card-title col-9";
            cardTitle.textContent = meal.strMeal;
            divFlex.appendChild(cardTitle);
            const divv = document.createElement('div');
            divv.className = "text-center";
            const imgStar = document.createElement('img');
            imgStar.className = "mx-auto"
            imgStar.src = "img/star.svg";
            imgStar.alt = "star";
            divv.appendChild(imgStar);
            const pRating = document.createElement('p');
            pRating.className = "rating";
            pRating.textContent = meal.idMeal;
            divv.appendChild(pRating);
            divFlex.appendChild(divv);
            divCardBody.appendChild(divFlex);
            const ulCard = document.createElement('ul');
            ulCard.className = "card-text p-0 py-1";
            var li = document.createElement('li');
            li.className = "d-inline-flex";
            li.textContent = meal.strArea;
            ulCard.appendChild(li);
            var li = document.createElement('li');
            li.className = "d-inline-flex";
            li.textContent = " • ";
            ulCard.appendChild(li);
            var li = document.createElement('li');
            li.className = "d-inline-flex";
            li.textContent = meal.strCategory;
            ulCard.appendChild(li);
            divCardBody.appendChild(ulCard);
            divCard.appendChild(divCardBody);
            recipe.appendChild(divCard);
            detailsLink.appendChild(recipe);
            divRecipes.appendChild(detailsLink);


        })
        //document.querySelector('input').value = '';
    })
}
////////////////////////////////////////////////////////////////////////////////////


//<div class="categories">
//    <h3>Category</h3>
//    <div class="catButtons d-flex flex-wrap my-4 gap-3">
//        <a class="btn btn-primary" href="#" role="button">All</a>
//        <a class="btn btn-primary" href="#" role="button">Breakfast</a>
//        <a class="btn btn-primary active" aria-current="page" href="#" role="button">Indian food</a>
//        <a class="btn btn-primary" href="#" role="button">Japanese food</a>
//    </div>
//</div>

// Išveda visas kategorijas iš api duomenų
const divCat = document.querySelector('.categories');
fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
.then((response) => response.json())
.then(data => {
    const categories = data.meals.map(meal => meal.strCategory);
    //console.log(categories)
    categories.forEach(category => {
        const button = document.createElement('a');
        button.className = "btn btn-primary";
        button.href = "#";
        button.role = "button";
        button.textContent = category;
        //console.log(category);
        divCat.appendChild(button);
    })
})
.then(data => {
//Kategorijos pasirinkimas ir su ja susijusių receptų išvedimas
const allCategories = document.querySelectorAll('.categories a');
//console.log(allCategories);
    for(const cat of allCategories){
        cat.addEventListener('click', (e)=>{
            //e.target.className = "btn btn-primary active";
            const activeCat = e.target.textContent;
            makeCards(activeCat);
        })
    }
})
////////////////////////////////////////////////////////

// Paieškos laukas, ir su ja susijusių receptų išvedimas
document.querySelector('form').addEventListener("input",(e)=>{
    e.preventDefault();
    let searchQuery = document.querySelector('input').value;
    makeCards(searchQuery);
})
////////////////////////////////////////////////////////