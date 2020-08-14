const Buyer = require("./Buyer");
const Seller = require("./Seller");

const NumberOfBuyers = 5;
const NumberOfSellers = 2;
const RoundsOfTrading = 100000;

const Buyers = [];
const Sellers = [];

let Transactions = 0;

(function CreateTraders() {
    for (let i = 0; i < NumberOfBuyers; i++) Buyers.push(new Buyer);
    for (let i = 0; i < NumberOfSellers; i++) Sellers.push(new Seller);
})()

function GetRandomSeller() {
    let RandomSeller = Math.round(Math.random() * (Sellers.length - 1));
    return Sellers[RandomSeller];
}


// buyer and seller attempt to do a transction
(function Trade(Rounds) {

    for (let Round = 0; Round < Rounds; Round++) {
        Buyers.forEach(buyer => {
            let seller = GetRandomSeller();

            if (seller.MinimumPrice <= buyer.MaximumPrice) {
                // successful transaction
                seller.CompleteTransaction(true);
                buyer.CompleteTransaction(true);

                Transactions++;
                
            } else {
                // transaction not successful
                seller.CompleteTransaction(false);
                buyer.CompleteTransaction(false);
            }
        });
    }
})(RoundsOfTrading);


// show data about the market
(function AnalyseMarket() {
    console.log(`Rounds of trading: ${RoundsOfTrading}\n`);
    console.log(`Number of buyers: ${NumberOfBuyers}`);
    console.log(`Number of sellers: ${NumberOfSellers}`);
    console.log(`Number of transactions: ${Transactions}`);

    console.log("\n");

    // initial
    console.log("Sellers' first Minimum Price:");
    Sellers.forEach(seller => {
        console.log(`\t${seller.FirstMinimumPrice.toFixed(2)}`);
    });

    console.log("Buyers' first Maximum Price:");
    Buyers.forEach(buyer => {
        console.log(`\t${buyer.FirstMaximumPrice.toFixed(2)}`);
    });

    console.log("\n");

    // final
    console.log("Sellers' final Minimum Price:");
    Sellers.forEach(seller => {
        console.log(`\t${Math.ceil(seller.MinimumPrice)}`);
    });

    console.log("Buyers' final Maximum Price:");
    Buyers.forEach(buyer => {
        console.log(`\t${Math.ceil(buyer.MaximumPrice)}`);
    });
})();