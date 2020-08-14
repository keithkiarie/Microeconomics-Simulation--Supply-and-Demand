class Seller {

    ProductionCost;
    MinimumPrice; // the minimum price a seller can accept for the commodity
    FirstMinimumPrice;

    Transactions = 0;

    PriceAdjustmentFactor = {
        Up: (21/20),
        Down: (20/21)
    }

    constructor() {
        this.ProductionCost = Seller.GetRandomCost();
        this.MinimumPrice = Seller.GetRandomPrice(this.ProductionCost);
        this.FirstMinimumPrice = this.MinimumPrice;
    }

    AdjustPrice(SuccessfulSale) {
        if (SuccessfulSale) {
            // price adjusted upwards if the previous transaction was successful
            this.MinimumPrice *= this.PriceAdjustmentFactor.Up;
        } else {
            // price adjusted downwards if the previous transaction was not successful
            if (this.MinimumPrice * this.PriceAdjustmentFactor.Down < this.ProductionCost) this.MinimumPrice = this.ProductionCost;
            else this.MinimumPrice *= this.PriceAdjustmentFactor.Down;
        }
    }

    CompleteTransaction(SuccessfulSale) {
        if (SuccessfulSale) this.Transactions++;
        this.AdjustPrice(SuccessfulSale);
    }

    static GetRandomPrice(ProductionCost) {
        return Math.round(ProductionCost * (1 + Math.random())); // selling price must be above cost
    }
    static GetRandomCost() {
        return Math.round(Math.random() * 100) + 10;
    }
}

module.exports = Seller;