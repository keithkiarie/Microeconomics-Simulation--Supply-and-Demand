RunSimulationBtn.addEventListener("click", StartMarket);
BuyersDisplayFilter.addEventListener("change", DisplayOutput);
SellersDisplayFilter.addEventListener("change", DisplayOutput);

// show data about the market
function DisplayOutput() {

    Sellers.forEach(seller => {
        seller.Price = Math.round(seller.Price);
        seller.PriceAdjustmentFactor.Down = parseFloat(seller.PriceAdjustmentFactor.Down.toFixed(2));
    });

    let TotalSpent = 0;
    Buyers.forEach(buyer => TotalSpent += buyer.TotalSpent);

    let TotalProfit = 0;
    Sellers.forEach(seller => TotalProfit += seller.Profit);

    // display meta data
    MetaTbody.innerHTML = `
        <tr>
            <td>${numberWithCommas(RoundsOfTrading)}</td>
            <td>${numberWithCommas(NumberOfBuyers)}</td>
            <td>${numberWithCommas(NumberOfSellers)}</td>
            <td>${HowToChooseSeller() == "Randomly" ? "Randomly" : "Cheapest Price"}</td>
        </tr>
    `;
    // display stats
    StatsTbody.innerHTML = `
        <tr>
            <td>${numberWithCommas(Transactions)}</td>
            <td>${numberWithCommas(Math.round(TotalProfit * 100 / TotalSpent))}%</td>
            <td>${numberWithCommas(GetAverageFirstPrice())}</td>
            <td>${numberWithCommas(GetMedianFirstPrice())}</td>
            <td>${numberWithCommas(GetAveragePrice())}</td>
            <td>${numberWithCommas(GetMedianPrice())}</td>
        </tr>
    `;

    // display buyers
    BuyersTbody.innerHTML = "";
    let BuyersToDisplay = ChooseBuyersToShow();
    BuyersToDisplay.forEach(buyer => {
        BuyersTbody.innerHTML += `
            <tr>
                <td>${buyer.Position}</td>
                <td>${numberWithCommas(buyer.MaximumPayable)}</td>
                <td>${((buyer.Transactions * 100 / Transactions) || 0).toFixed(2)}</td>
                <td>${numberWithCommas(Math.round(buyer.TotalSpent))}</td>
            </tr>
        `;
    })


    // display sellers
    SellersTbody.innerHTML = "";
    let SellersToDisplay = ChooseSellersToShow();
    SellersToDisplay.forEach(seller => {
        SellersTbody.innerHTML += `
            <tr>
                <td>${seller.Position}</td>
                <td>${numberWithCommas(seller.MinimumAcceptable)}</td>
                <td>${numberWithCommas(seller.FirstPrice)}</td>
                <td>${numberWithCommas(seller.Price)}</td>
                <td>
                    ${numberWithCommas(Math.round(seller.SummedPrices / RoundsOfTrading))}
                </td>
                <td>${((seller.Transactions * 100 / Transactions) || 0).toFixed(2)}</td>
                <td>${numberWithCommas(Math.round(seller.Revenue))}</td>
                <td>${numberWithCommas(Math.round(seller.Profit))}</td>
            </tr>
        `;
    })
}

