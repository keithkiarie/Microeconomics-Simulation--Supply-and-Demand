class Seller {

    MinimumPrice;

    constructor() {
        this.MinimumPrice = this.GetRandomPrice()
    }

    AdjustPrice(SuccessfulSale) {
        if (SuccessfulSale) {
            // price adjusted downwards if the previous transaction was successful

        } else {
            // price adjusted upwards if the previous transaction was not successful

        }
    }

    static GetRandomPrice() {
        return (Math.random() * 99) + 1;
    }
}