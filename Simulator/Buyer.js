class Buyer {

    MaximumPayable; // the maximum price a buyer can pay for the commodity

    Transactions = 0;

    constructor() {
        this.MaximumPayable = Buyer.GetRandomAmount();
    }

    CompleteTransaction(SuccessfulSale) {
        if (SuccessfulSale) this.Transactions++;
    }

    static GetRandomAmount() {
        return Math.round(Math.random() * 150);
    }
}

module.exports = Buyer;