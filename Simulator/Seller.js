class Seller {

    MinimumAcceptable; // the minimum price a seller can accept for the commodity
    FirstPrice;
    Price;
    SummedPrices = 0;

    Transactions = 0;
    Revenue = 0;

    PriceAdjustmentFactor = {
        Up: (21/20),
        Down: (20/21)
    }

    constructor() {
        this.MinimumAcceptable = Seller.GetRandomCost();
        this.Price = Seller.GetRandomPrice(this.MinimumAcceptable);
        this.FirstPrice = this.Price;
    }

    AdjustPrice(SuccessfulSale) {
        if (SuccessfulSale) {
            // price adjusted upwards if the previous transaction was successful
            this.Price *= this.PriceAdjustmentFactor.Up;
        } else {
            // price adjusted downwards if the previous transaction was not successful
            if (this.Price * this.PriceAdjustmentFactor.Down < this.MinimumAcceptable) this.Price = this.MinimumAcceptable;
            else this.Price *= this.PriceAdjustmentFactor.Down;
        }
    }

    CompleteTransaction(SuccessfulSale) {
        if (SuccessfulSale) {
            this.Transactions++;
            this.Revenue += this.Price; 
        }
        this.AdjustPrice(SuccessfulSale);
    }

    static GetRandomPrice(ProductionCost) {
        return Math.round(ProductionCost * (1 + Math.random())); // selling price must be above cost
    }
    static GetRandomCost() {
        return Math.round(Math.random() * 100) + 10;
    }
}