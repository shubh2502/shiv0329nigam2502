let catArray = [
    { "name": "cathy", "image": "./cat.jpg","count":0 },
    { "name": "eathy", "image": "./cat.jpg","count":0 },
    { "name": "patty", "image": "./cat.jpg" ,"count":0},
    { "name": "ella", "image": "./cat.jpg","count":0 },
    { "name": "bella", "image": "./cat.jpg","count":0 },
    { "name": "roly", "image": "./cat.jpg","count":0 },
    { "name": "stuart", "image": "./cat.jpg","count":0 },
    { "name": "getto", "image": "./cat.jpg","count":0 },
    { "name": "kily", "image": "./cat.jpg","count":0 }
];

var $ = function (selector) {
    return document.querySelector(selector);
}

document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < catArray.length; i++) {
        let li = document.createElement("LI");
        let div = document.createElement("DIV");
        let span = document.createElement("SPAN");
        span.appendChild(document.createTextNode(catArray[i]["name"]));
        div.appendChild(span);
        li.appendChild(div);
        document.getElementById('cat').appendChild(li);
        addEventHandlers(li,i);
    }
});

function addEventHandlers(item,index) {
    item.addEventListener("click",displayCatDetailsOnClick.bind(this,index),true);
}

function displayCatDetailsOnClick(index){
    catArray[index]["count"] = catArray[index]["count"]+1; 
    let dom = $("#cat-details");
    let div = document.createElement("DIV");
    let image = document.createElement("IMG");
    image.setAttribute("src", catArray[index]["image"]);
    let span = document.createElement("SPAN");
    span.appendChild(document.createTextNode( catArray[index]["name"] +" No of times Clicked : "+ catArray[index]["count"]));
    div.appendChild(span);
    div.appendChild(image);
    dom.innerHTML = null;
    dom.appendChild(div); 
}

function reset(){
    catArray = [
        { "name": "cathy", "image": "./cat.jpg","count":0 },
        { "name": "eathy", "image": "./cat.jpg","count":0 },
        { "name": "patty", "image": "./cat.jpg" ,"count":0},
        { "name": "ella", "image": "./cat.jpg","count":0 },
        { "name": "bella", "image": "./cat.jpg","count":0 },
        { "name": "roly", "image": "./cat.jpg","count":0 },
        { "name": "stuart", "image": "./cat.jpg","count":0 },
        { "name": "getto", "image": "./cat.jpg","count":0 },
        { "name": "kily", "image": "./cat.jpg","count":0 }
    ];
    let dom = $("#cat-details");
    dom.innerHTML = null;
    dom.innerHTML = "display cat details here.";
    // dom.appendChild(div); 
}