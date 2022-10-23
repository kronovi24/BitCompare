

//Symbols dump list
var symbols = [];
var panelID = 1;
var delReady = false;

////api https://api1.binance.com


function getSymbols() {
    fetch("https://api.binance.com/api/v3/exchangeInfo")
        .then((response) => {
            return response.json();
        }).then(function (data) {
            console.log(data)
            for (let i = 0; i < data.symbols.length; i++) {
                symbols.push(data.symbols[i].symbol)
                //selection.add(new Option(data.symbols[i].symbol));
            }
            console.log(symbols)
            begin(1);
        })
}

function getPrice(id) {
    let panel = document.getElementById(`symbolList${id}`)
    let value = panel.options[panel.selectedIndex].text;

    let viewprice = document.querySelector(`.price${id}`)
    fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${value}`)
        .then((response) => {
            return response.json();
        }).then(function (data) {
            console.log(data);
            viewprice.innerHTML = data.price;
        }
        )
}

function begin(id) {
    let selection = document.getElementById(`symbolList${id}`);
    for (let i = 0; i < symbols.length; i++) {
        selection.add(new Option(symbols[i]));
    }
}


function addPanel() {
    panelID = panelID + 1;
    let view = document.querySelector(".mainview")
    view.insertAdjacentHTML("beforeend",
        `<div class="panels">
        <h2>Select Tokens</h2>
        <select name="symbolList" id="symbolList${panelID}">
        </select>
        <button id="${panelID}" onclick="getPrice(this.id)">Get Avg Price</button>
        <h2>Average Price</h2>
        <h1 class="price${panelID}">0.000</h1>
        <i class='deleter bx bx-x' id="deleter"></i>
        </div>`
    )
    begin(panelID);
    console.log("added panel")
    const deleter = document.querySelectorAll(".deleter");

    for (let i = 0; i < deleter.length; i++) {
        deleter[i].addEventListener("click", function () {
            deleter[i].parentElement.remove();
            console.log("deleted panel");
        });
    }

}

if (delReady == true) {
    console.log("adawdawd")
    const deleter = document.querySelector(".deleter");
    deleter.addEventListener("click", () => {
        deleter.parentElement.remove();
        console.log("dawdawdw")
    })
}



getSymbols();



