class Seller {

    MinimumPrice; // the minimum price a seller can accept for the commodity
    FirstMinimumPrice;

    Transactions = 0;

    PriceAdjustmentFactor = {
        Up: 1.05,
        Down: 0.95
    }

    constructor() {
        this.MinimumPrice = Seller.GetRandomPrice();
        this.FirstMinimumPrice = this.MinimumPrice;
    }

    AdjustPrice(SuccessfulSale) {
        if (SuccessfulSale) {
            // price adjusted upwards if the previous transaction was successful
            this.MinimumPrice *= this.PriceAdjustmentFactor.Up;
        } else {
            // price adjusted downwards if the previous transaction was not successful
            this.MinimumPrice *= this.PriceAdjustmentFactor.Down;
        }
    }

    CompleteTransaction(SuccessfulSale) {
        if (SuccessfulSale) this.Transactions++;
        this.AdjustPrice(SuccessfulSale);
    }

    static GetRandomPrice() {
        return Math.round(Math.random() * 99) + 1;
    }
}

module.exports = Seller;