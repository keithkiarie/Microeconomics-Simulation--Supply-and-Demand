class Buyer {

    MaximumPay;

    constructor() {
        this.MaximumPay = this.GetRandomPrice()
    }

    AdjustPrice(SuccessfulPurchase) {
        if (SuccessfulPurchase) {
            // price adjusted downwards if the previous transaction was successful

        } else {
            // price adjusted upwards if the previous transaction was not successful

        }
    }

    static GetRandomPrice() {
        return Math.random() * 100;
    }
}