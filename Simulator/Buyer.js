class Buyer {

    MaximumPrice; // the maximum price a buyer can pay for the commodity
    Transactions = 0;

    PriceAdjustmentFactor = {
        Up: 1.05,
        Down: 0.95
    }

    constructor() {
        this.MaximumPrice = this.GetRandomPrice()
    }

    AdjustPrice(SuccessfulPurchase) {
        if (SuccessfulPurchase) {
            // price adjusted downwards if the previous transaction was successful
            this.MaximumPrice *= this.PriceAdjustmentFactor.Down
        } else {
            // price adjusted upwards if the previous transaction was not successful
            this.MaximumPrice *= this.PriceAdjustmentFactor.Up
        }
    }

    CompleteTransaction(SuccessfulPurchase) {
        if (SuccessfulPurchase) this.Transactions++;
        this.AdjustPrice(SuccessfulPurchase);
    }

    static GetRandomPrice() {
        return Math.random() * 100;
    }
}

module.exports = Buyer;