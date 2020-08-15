RunSimulationBtn.addEventListener("click", StartMarket);
BuyersDisplayFilter.addEventListener("change", DisplayOutput);
SellersDisplayFilter.addEventListener("change", DisplayOutput);
ChooseRandomSellerInput.addEventListener("change", RandomSellerToggle);
ChooseBestPriceInput.addEventListener("change", BestPriceSellerToggle);


function RandomSellerToggle() {
    ChooseBestPriceInput.checked = !ChooseBestPriceInput.checked;
}
function BestPriceSellerToggle() {
    ChooseRandomSellerInput.checked = !ChooseRandomSellerInput.checked;
}

