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


    // display sellers
    SellersTbody.innerHTML = "";
    let SellersToDisplay = ChooseSellersToShow();
    MakeGraph();


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

}

function ChooseBuyersToShow() {
    let BuyersToDisplay = Buyers;

    BuyersToDisplay.sort((a, b) => b[BuyersDisplayFilter.value] - a[BuyersDisplayFilter.value]);

    for (let i = 0; i < BuyersToDisplay.length; i++) BuyersToDisplay[i].Position = i + 1; // give them positions

    if (Buyers.length > 10) {
        let FirstFive = Buyers.slice(0, 5);
        BuyersToDisplay = FirstFive;
        let LastFive = Buyers.slice(Buyers.length - 5);
        LastFive.forEach(item => BuyersToDisplay.push(item));
    }

    return BuyersToDisplay;
}

function ChooseSellersToShow() {
    let SellersToDisplay = Sellers;

    SellersToDisplay.sort((a, b) => b[SellersDisplayFilter.value] - a[SellersDisplayFilter.value]);

    for (let i = 0; i < SellersToDisplay.length; i++) SellersToDisplay[i].Position = i + 1; // give them positions

    if (Sellers.length > 10) {
        let FirstFive = Sellers.slice(0, 5);
        SellersToDisplay = FirstFive;
        let LastFive = Sellers.slice(Sellers.length - 5);
        LastFive.forEach(item => SellersToDisplay.push(item));
    }

    return SellersToDisplay;
}

function MakeGraph() {

    let Highest = Sellers[0][SellersDisplayFilter.value];

    let Width = Math.ceil(Highest / 10);
    
    let CategoryNames = [];
    let CategoriesData = [];

    for (let i = 0; i < 10; i++) CategoriesData.push(0);

    let Category = 0;
    for (let i = 0; i < Highest; i += Width) {
        Sellers.forEach(seller => {
            if (seller[SellersDisplayFilter.value] >= i && seller[SellersDisplayFilter.value] < (i + Width)) CategoriesData[Category]++;
        });
        CategoryNames.push(`${i} - ${i + Width}`);
        Category++;
    }

    SellersChartCanvas.width = screen.width * 0.8;
    SellersChartCanvas.height = screen.height * 0.7;

    let ctx = SellersChartCanvas;

    let SellersChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: CategoryNames,
            datasets: [{
                label: 'Sellers',
                data: CategoriesData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: false
        }
    });
}