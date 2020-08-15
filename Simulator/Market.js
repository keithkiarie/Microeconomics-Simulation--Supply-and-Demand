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

        Sellers.forEach(seller => seller.SummedPrices += seller.Price);
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
            <td>${numberWithCommas(RoundsOfTrading)}</td>
            <td>${numberWithCommas(NumberOfBuyers)}</td>
            <td>${numberWithCommas(NumberOfSellers)}</td>
            <td>${numberWithCommas(Transactions)}</td>
            <td>${numberWithCommas(Math.round(TotalSpent))}</td>
        </tr>
    `;

    BuyersTbody.innerHTML = "";

    BuyersToDisplay = ChooseBuyersToShow();

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

    SellersTbody.innerHTML = "";
    Sellers.forEach(seller => {
        SellersTbody.innerHTML += `
            <tr>
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

function StartMarket() {
    InitializeVariables();
    CreateTraders();
    Trade(RoundsOfTrading);

    OutputDiv.style.display = "block";

    DisplayOutput();
}