const Buyer = require("./Buyer");
const Seller = require("./Seller");

const NumberOfBuyers = 1;
const NumberOfSellers = 1;
const Rounds = 50;

const Buyers = [];
const Sellers = [];

(function CreateTraders() {
    for (let i = 0; i < NumberOfBuyers; i++) Buyers.push(new Buyer);
    for (let i = 0; i < NumberOfSellers; i++) Sellers.push(new Seller);
})()

function GetRandomSeller() {
    let RandomSeller = Math.round(Math.random() * (Sellers.length - 1));
    return Sellers[RandomSeller];
}

(function Trade(Rounds) {

    for (let Round = 0; Round < Rounds; Round++) {
        Buyers.forEach(buyer => {
            let seller = GetRandomSeller();

            if (seller.MinimumPrice <= buyer.MaximumPrice) {
                // successful trade
                seller.CompleteTransaction(true);
                buyer.CompleteTransaction(true);

            } else {
                // trade not successful
                seller.CompleteTransaction(false);
                buyer.CompleteTransaction(false);
            }
        });
    }
})();

function AnalyseMarket() {
    
}