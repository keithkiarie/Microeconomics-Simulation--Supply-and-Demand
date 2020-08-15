class Buyer {

    MaximumPayable; // the maximum price a buyer can pay for the commodity

    Transactions = 0;
    TotalSpent = 0;

    constructor() {
        this.MaximumPayable = Buyer.GetRandomAmount();
    }

    CompleteTransaction(SuccessfulSale, Price) {
        if (SuccessfulSale) {
            this.Transactions++;
            this.TotalSpent += Price;
        }
    }

    static GetRandomAmount() {
        return Math.round(Math.random() * 150);
    }
}