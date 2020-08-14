class Buyer {

    MaximumPrice; // the maximum price a buyer can pay for the commodity
    FirstMaximumPrice;

    Transactions = 0;

    PriceAdjustmentFactor = {
        Up: (21/20),
        Down: (20/21)
    }

    constructor() {
        this.MaximumPrice = Buyer.GetRandomPrice();
        this.FirstMaximumPrice = this.MaximumPrice;
    }

    AdjustPrice(SuccessfulPurchase) {
        if (SuccessfulPurchase) {
            // price adjusted downwards if the previous transaction was successful
            this.MaximumPrice *= this.PriceAdjustmentFactor.Down;
        } else {
            // price adjusted upwards if the previous transaction was not successful
            this.MaximumPrice *= this.PriceAdjustmentFactor.Up;
        }
    }

    CompleteTransaction(SuccessfulPurchase) {
        if (SuccessfulPurchase) this.Transactions++;
        this.AdjustPrice(SuccessfulPurchase);
    }

    static GetRandomPrice() {
        return Math.round(Math.random() * 100);
    }
}

module.exports = Buyer;