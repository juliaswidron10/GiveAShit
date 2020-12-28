window.addEventListener("load", homePage);
let p = 0;
function homePage() {
    hide();
    document.querySelector(".next").addEventListener("click",nextPage);
}


function hide(){
    document.querySelector("#page2").classList.add("hide");
    document.querySelector("#page3").classList.add("hide");
}

function nextPage(){
    document.querySelector(".next").removeEventListener("click",nextPage);
    document.querySelector("#next2").removeEventListener("click",nextPage);
    console.log("hello");
    p = p+1 ;
    if (p == 1){
        document.querySelector("#page1").classList.add("hide");
        document.querySelector("#page2").classList.remove("hide");
        console.log(p);

    } else if (p == 2){
        document.querySelector("#page2").classList.add("hide");
        document.querySelector("#page3").classList.remove("hide");
    }
    pageC();
}

function pageC (){
    console.log(p);
    document.querySelector("#next2").addEventListener("click",nextPage);
}
