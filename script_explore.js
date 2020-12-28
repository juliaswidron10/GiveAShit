const link = "https://spreadsheets.google.com/feeds/list/12fl10SBjNqDoDrhy2nTErFCWefzyTrKXfi3rvYMO3QY/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

function getData(){
    fetch(link)
    .then(res => res.json())
    .then(handleData);
}

function handleData(data){
    const myData = data.feed.entry;
    console.log(myData);
    myData.forEach(createCity);
}
function createCity(city){
    if (city.gsx$primary.$t == "1"){
    // link and clone template
    const template = document.querySelector("#City").content;
    const clone = template.cloneNode(true);
    //populate the copy
    clone.querySelector('article').dataset.id=city.gsx$id.$t;
    clone.querySelector("h1").textContent = city.gsx$city.$t;
    clone.querySelector(".linkCity").href = `city.html?city=${city.gsx$city.$t}`;
    // clone.querySelector('.linkCity').setAttribute('href',`${city.gsx$city.$t}.html`);
    clone.querySelector('.pic > img').setAttribute('src',`images/city_images/${city.gsx$city.$t}.jpg`);
    clone.querySelector('.pic > img').setAttribute('alt',`Photography of the city ${city.gsx$city.$t}`);
    clone.querySelector('.sect_class > h3').textContent = (Math.floor(Math.random() * 10)) + ' reviews';
    //counting the totall rating used on a website
    let bigRating = (( Number(city.gsx$pricerating.$t) + Number(city.gsx$smellrating.$t) + Number(city.gsx$weatherrating.$t) + Number(city.gsx$availabilityrating.$t)) / 4)
    bigRating = Math.floor(bigRating);
    console.log(bigRating);
    clone.querySelector(".total_rating").textContent = bigRating + "/5";


    //Jonas helped me to figure out how to select the right elements to show the rating 
    clone.querySelectorAll(`.poop:nth-child(-n+${bigRating})`).forEach(e=>{
        e.classList.add("empty_poop")
      })

    document.querySelector("main").appendChild(clone);
    }
}
