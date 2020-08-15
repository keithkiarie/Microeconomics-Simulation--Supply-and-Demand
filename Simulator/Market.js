let NumberOfBuyers = GetNumberOfBuyers();
let NumberOfSellers = GetNumberOfSellers();
let RoundsOfTrading = GetNumberOfTradingRounds();

let Buyers = [];
let Sellers = [];

let Transactions = 0;

function CreateTraders() {
    for (let i = 0; i < NumberOfBuyers; i++) Buyers.push(new Buyer);
    for (let i = 0; i < NumberOfSellers; i++) Sellers.push(new Seller);
}

function GetRandomSeller() {
    let RandomSeller = Math.round(Math.random() * (Sellers.length - 1));
    return Sellers[RandomSeller];
}


// buyer and seller attempt to do a transction
function Trade(Rounds) {

    for (let Round = 0; Round < Rounds; Round++) {
        Buyers.forEach(buyer => {
            let seller = GetRandomSeller();

            if (seller.Price <= buyer.MaximumPayable) {
                // successful transaction
                buyer.CompleteTransaction(true, seller.Price);
                seller.CompleteTransaction(true);

                Transactions++;

            } else {
                // transaction not successful
                seller.CompleteTransaction(false);
                buyer.CompleteTransaction(false);
            }
        });
    }
}

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

    MetaTbody.innerHTML = `
        <tr>
            <td>${RoundsOfTrading}</td>
            <td>${NumberOfBuyers}</td>
            <td>${NumberOfSellers}</td>
            <td>${Transactions}</td>
            <td>${Math.round(TotalSpent)}</td>
        </tr>
    `;

    BuyersTbody.innerHTML = "";
    Buyers.forEach(buyer => {
        BuyersTbody.innerHTML += `
            <tr>
                <td>${buyer.MaximumPayable}</td>
                <td>${((buyer.Transactions * 100 / Transactions) || 0).toFixed(2)}</td>
                <td>${Math.round(buyer.TotalSpent)}</td>
            </tr>
        `;
    })

    SellersTbody.innerHTML = "";
    Sellers.forEach(seller => {
        SellersTbody.innerHTML += `
            <tr>
                <td>${seller.MinimumAcceptable}</td>
                <td>${seller.FirstPrice}</td>
                <td>${seller.Price}</td>
                <td>${Math.round(seller.SummedPrices / RoundsOfTrading)}</td>
                <td>${((seller.Transactions * 100 / Transactions) || 0).toFixed(2)}</td>
                <td>${Math.round(seller.Revenue)}</td>
            </tr>
        `;
    })
}

function StartMarket() {
    InitializeVariables();
    CreateTraders();
    Trade(RoundsOfTrading);

    OutputDiv.style.display = "block";

    DisplayOutput();
}