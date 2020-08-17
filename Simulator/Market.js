let NumberOfBuyers = GetNumberOfBuyers();
let NumberOfSellers = GetNumberOfSellers();
let RoundsOfTrading = GetNumberOfTradingRounds();


let Buyers = [];
let Sellers = [];

let Transactions = 0;



function InitializeVariables() {
    NumberOfBuyers = GetNumberOfBuyers();
    NumberOfSellers = GetNumberOfSellers();
    RoundsOfTrading = GetNumberOfTradingRounds();

    Buyers = [];
    Sellers = [];
}

// show data about the market
function DisplayOutput() {

    Sellers.forEach(seller => {
        seller.Price = Math.round(seller.Price);
        seller.PriceAdjustmentFactor.Down = parseFloat(seller.PriceAdjustmentFactor.Down.toFixed(2));
    });

    let TotalSpent = 0;
    Buyers.forEach(buyer => TotalSpent += buyer.TotalSpent);

    // display meta data
    MetaTbody.innerHTML = `
        <tr>
            <td>${numberWithCommas(RoundsOfTrading)}</td>
            <td>${numberWithCommas(NumberOfBuyers)}</td>
            <td>${numberWithCommas(NumberOfSellers)}</td>
            <td>${HowToChooseSeller() == "Randomly" ? "Randomly" : "Cheapest Price"}</td>
        </tr>
    `;
    // display stats
    StatsTbody.innerHTML = `
        <tr>
            <td>${numberWithCommas(Transactions)}</td>
            <td>${numberWithCommas(Math.round(TotalSpent))}</td>
            <td>${numberWithCommas(GetAverageFirstPrice())}</td>
            <td>${numberWithCommas(GetMedianFirstPrice())}</td>
            <td>${numberWithCommas(GetAveragePrice())}</td>
            <td>${numberWithCommas(GetMedianPrice())}</td>
        </tr>
    `;

    // display buyers
    BuyersTbody.innerHTML = "";
    let BuyersToDisplay = ChooseBuyersToShow();
    BuyersToDisplay.forEach(buyer => {
        BuyersTbody.innerHTML += `
            <tr>
                <td>${buyer.Position}</td>
                <td>${numberWithCommas(buyer.MaximumPayable)}</td>
                <td>${((buyer.Transactions * 100 / Transactions) || 0).toFixed(2)}</td>
                <td>${numberWithCommas(Math.round(buyer.TotalSpent))}</td>
            </tr>
        `;
    })


    // display sellers
    SellersTbody.innerHTML = "";
    let SellersToDisplay = ChooseSellersToShow();
    SellersToDisplay.forEach(seller => {
        SellersTbody.innerHTML += `
            <tr>
                <td>${seller.Position}</td>
                <td>${numberWithCommas(seller.MinimumAcceptable)}</td>
                <td>${numberWithCommas(seller.FirstPrice)}</td>
                <td>${numberWithCommas(seller.Price)}</td>
                <td>
                    ${numberWithCommas(Math.round(seller.SummedPrices / RoundsOfTrading))}
                </td>
                <td>${((seller.Transactions * 100 / Transactions) || 0).toFixed(2)}</td>
                <td>${numberWithCommas(Math.round(seller.Revenue))}</td>
            </tr>
        `;
    })
}


function ChooseBuyersToShow() {
    let BuyersToDisplay = Buyers;

    BuyersToDisplay.sort((a, b) => b[BuyersDisplayFilter.value] - a[BuyersDisplayFilter.value]);

    for (let i = 0; i < BuyersToDisplay.length; i++) BuyersToDisplay[i].Position = i + 1; // give them positions

    if (Buyers.length > 10) {
        let FirstFive = Buyers.slice(0, 5);
        BuyersToDisplay = FirstFive;
        let LastFive = Buyers.slice(Buyers.length - 5);
        LastFive.forEach(item => BuyersToDisplay.push(item));
    }

    return BuyersToDisplay;
}

function ChooseSellersToShow() {
    let SellersToDisplay = Sellers;

    SellersToDisplay.sort((a, b) => b[SellersDisplayFilter.value] - a[SellersDisplayFilter.value]);

    for (let i = 0; i < SellersToDisplay.length; i++) SellersToDisplay[i].Position = i + 1; // give them positions

    if (Sellers.length > 10) {
        let FirstFive = Sellers.slice(0, 5);
        SellersToDisplay = FirstFive;
        let LastFive = Sellers.slice(Sellers.length - 5);
        LastFive.forEach(item => SellersToDisplay.push(item));
    }

    return SellersToDisplay;
}


// Stats

function GetAverageFirstPrice() {
    let Total = 0;
    Sellers.forEach(seller => Total += seller.FirstPrice);

    return Math.round(Total / Sellers.length);
}

function GetAveragePrice() {
    let Total = 0;
    Sellers.forEach(seller => Total += seller.Price);

    return Math.round(Total / Sellers.length);
}

function GetMedianFirstPrice() {
    Sellers.sort((a, b) => a.FirstPrice - b.FirstPrice);

    let Median;
    if (Sellers.length % 2 == 0) Median = (Sellers[(Sellers.length / 2)].FirstPrice + Sellers[(Sellers.length / 2) + 1].FirstPrice) / 2;
    else Median = Sellers[Math.ceil(Sellers.length / 2)].FirstPrice;

    return Math.round(Median);
}

function GetMedianPrice() {
    Sellers.sort((a, b) => a.Price - b.Price);

    let Median;
    if (Sellers.length % 2 == 0) Median = (Sellers[(Sellers.length / 2)].Price + Sellers[(Sellers.length / 2) + 1].Price) / 2;
    else Median = Sellers[Math.ceil(Sellers.length / 2)].Price;

    return Math.round(Median);
}

function StartMarket() {

    RunSimulationBtn.innerHTML = "Running...";
    RunSimulationBtn.removeEventListener("click", StartMarket);

    InitializeVariables();

    //create a worker to do the trading
    let TradeWorker = new Worker("Simulator/Trade.js");
    TradeWorker.postMessage({
        NumberOfBuyers: NumberOfBuyers,
        NumberOfSellers: NumberOfSellers,
        HowToChooseSeller: HowToChooseSeller(),
        RoundsOfTrading: RoundsOfTrading
    })

    // after trading done
    TradeWorker.onmessage = function (e) {
        Sellers = e.data.Sellers;
        Buyers = e.data.Buyers;
        Transactions = e.data.Transactions;

        DisplayOutput();
        OutputDiv.style.visibility = "visible";
        RunSimulationBtn.innerHTML = "Run Simulation";
        RunSimulationBtn.addEventListener("click", StartMarket);
    }
}