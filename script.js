const burger = document.querySelector(".burger");
const navig = document.querySelector("#navig");
const logo = document.querySelector(".logo")
let menuOpen = false;

//burger menu

burger.addEventListener("click", open_menu);

function open_menu() {
    if (!menuOpen) {
        navig.classList.add("open");
        logo.classList.add("hidden");
        menuOpen = true;
        
    } else {
        navig.classList.remove("open");
        logo.classList.remove("hidden");
        document.querySelector("#filters").classList.remove("visible");
        menuOpen = false;
    }
}

//getting list of the categories
function init(){
    fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(r => r.json()).then(
        function(data){
            categoriesRecieved(data)
            console.log(data);
        }
    )
}
function categoriesRecieved(cats){
    createNavigation(cats);
    createSections(cats);
}

function createNavigation(cats){
    cats.forEach( cat =>{
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href",`#${cat}`);
        document.querySelector("#navig").appendChild(a);
    })
}

function createSections(cats){
    cats.forEach( cat=>{
        const div = document.createElement("div");
        div.setAttribute("id", cat);
        const section = document.createElement("section");
        section.classList.add(cat)
        const h1 = document.createElement("h1");
        h1.textContent = cat;
        document.querySelector("main").appendChild(div);
        div.appendChild(h1);
        div.appendChild(section);
    })
    fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        console.log("data was fetched");
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        dataRecived(data)
    })
    function dataRecived(meals) {
        meals.forEach(addMeal)
    }
}

init()




//loop through products


function addMeal(meal) {
    //link and clone the template
    const template = document.querySelector("#meal").content;
    const clone = template.cloneNode(true);

    //populate the copy
    clone.querySelector('article').dataset.id=meal.id
    clone.querySelector("article").addEventListener("click", function(){
        expandMeal(meal)
    });
    clone.querySelector("h1").textContent = meal.name;
    clone.querySelector(".description").textContent = meal.shortdescription;
    clone.querySelector(".mealphoto").setAttribute("src",`https://kea-alt-del.dk/t5/site/imgs/medium/${meal.image}-md.jpg`);

    if (meal.vegetarian) {
        clone.querySelector("article").classList.add("vegeterian")
        clone.querySelector(".vegan").textContent = "Vegan";
    } else {
        clone.querySelector(".vegan").textContent = " ";
    }

    if (meal.soldout) {
        clone.querySelector("article").classList.add("notaviailable")
        clone.querySelector(".sold").classList.add("visible");
    }

    if (meal.alcohol != 0) {
        clone.querySelector(".alcohol").classList.add("visible");
        clone.querySelector("article").classList.add("alcoholic")
    }

    if (meal.discount == 0) {
        clone.querySelector(".price").textContent = meal.price + ",-";
    } else {
        clone.querySelector("article").classList.add("deal")
        let discount = meal.price - (meal.price * meal.discount * 0.01);
        clone.querySelector(".regular_price").textContent = meal.price + ",-";
        clone.querySelector(".price").textContent = discount + ",-";
    }
    
    
    document.querySelector("section." + meal.category).appendChild(clone);
}




 //setting filters

 const veganfilter = document.querySelector("#vegeterian");
 const dealfilter = document.querySelector("#deals");
 const alcoholfilter = document.querySelector("#alcoholic");
 const availablefilter = document.querySelector("#available");

 veganfilter.addEventListener("click", e=>{
     const articles = document.querySelectorAll("article:not(.vegeterian)")
     veganfilter.classList.toggle("disabled");
     articles.forEach(elem =>{
         elem.classList.toggle("hidden");
     })
 })

 dealfilter.addEventListener("click", e=>{
     const articles = document.querySelectorAll("article:not(.deal)")
     dealfilter.classList.toggle("disabled");
     articles.forEach(elem =>{
         elem.classList.toggle("hidden")
     } )
 })

 alcoholfilter.addEventListener("click", e=>{
     const articles = document.querySelectorAll("article.alcoholic")
     alcoholfilter.classList.toggle("disabled");
     articles.forEach(elem =>{
         elem.classList.toggle("hidden")
     } )
 })

 availablefilter.addEventListener("click", e=>{
     const articles = document.querySelectorAll("article.notaviailable")
     availablefilter.classList.toggle("disabled");
     articles.forEach(elem =>{
         elem.classList.toggle("hidden")
     } )
 })

//show and hide filters
document.querySelector("#showfilt").addEventListener("click", e=>{
    document.querySelector("#showfilt").classList.toggle("visible");
    document.querySelector("#filters").classList.toggle("visible");
})



// this works
function expandMeal(meal) {
    //find the right artilce
    const article = document.querySelector(`article[data-id="${meal.id}"]`)
    //fethch data
    article.classList.toggle('span');
    console.log(article.classList.contains('span'))
    if(article.classList.contains('span')){
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${meal.id}`).then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data.longdescription);
        article.querySelector(".description").textContent = data.longdescription;
        if (data.allergens.length != 0){
            article.querySelector(".alergens").textContent = "Alergens: " + data.allergens;
        }else{
            article.querySelector(".alergens").textContent = " ";
        }
        
    })
    } else {
        article.querySelector(".description").textContent = meal.shortdescription;
    }
    

function getLongdescrtiption(article){
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${article.id}`)
        .then(function (response) {
            console.log(article.id);
            return response.json();
        })
        .then(function (data) {
            console.log(article.longdescription)
        })       
}}

//closing navigation after you clicked on a link//
document.querySelectorAll("#navig a").addEventListener("click", e=>{
    menuOpen = true;
    open_menu()
}) 