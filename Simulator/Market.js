const Buyer = require("./Buyer");
const Seller = require("./Seller");

const NumberOfBuyers = 5;
const NumberOfSellers = 1;
const RoundsOfTrading = 1000000;

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
    Buyers.forEach(buyer => {
        buyer.MaximumPrice = parseFloat(buyer.MaximumPrice.toFixed(2));
    });
    Sellers.forEach(seller => {
        seller.MinimumPrice = parseFloat(seller.MinimumPrice.toFixed(2));
    });

    console.log(`Rounds of trading: ${RoundsOfTrading}\n`);
    console.log(`Number of buyers: ${NumberOfBuyers}`);
    console.log(`Number of sellers: ${NumberOfSellers}`);
    console.log(`Number of transactions: ${Transactions}`);

    console.log("\nSellers:");
    console.table(Sellers);

    console.log("\nBuyers:");
    console.table(Buyers);
})();