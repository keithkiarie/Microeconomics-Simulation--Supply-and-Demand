const RunSimulationBtn = document.getElementById("RunSimulationBtn");
const NoOfBuyersInput = document.getElementById("NoOfBuyersInput");
const NoOfSellersInput = document.getElementById("NoOfSellersInput");
const RoundsOfTradingInput = document.getElementById("RoundsOfTradingInput");
const OutputDiv = document.getElementById("OutputDiv");
const BuyersTbody = document.getElementById("BuyersTbody");
const SellersTbody = document.getElementById("SellersTbody");
const MetaTbody = document.getElementById("MetaTbody");
const BuyersDisplayFilter = document.getElementById("BuyersDisplayFilter");
const SellersDisplayFilter = document.getElementById("SellersDisplayFilter");
const HowBuyerChoosesSellerInput = document.getElementById("HowBuyerChoosesSellerInput");
const StatsTbody = document.getElementById("StatsTbody");
const OutputDivStatus = document.getElementById("OutputDivStatus");
const OutputDivData = document.getElementById("OutputDivData");
const SellersChartCanvas = document.getElementById("SellersChartCanvas");

function GetNumberOfBuyers() {
    let Default = 50;
    let NoOfBuyers = parseInt(document.getElementById("NoOfBuyersInput").value);

    if (NoOfBuyers < 1 || isNaN(NoOfBuyers)) {
        NoOfBuyersInput.value = Default;
        return Default;
    } else {
        return NoOfBuyers;
    }
}

function GetNumberOfSellers() {
    let Default = 50;
    let NoOfSellers = parseInt(document.getElementById("NoOfSellersInput").value);

    if (NoOfSellers < 1 || isNaN(NoOfSellers)) {
        NoOfSellersInput.value = Default;
        return Default;
    } else {
        return NoOfSellers;
    }
}

function GetNumberOfTradingRounds() {
    let Default = 1000;
    let NoOfRounds = parseInt(document.getElementById("RoundsOfTradingInput").value);

    if (NoOfRounds < 1 || isNaN(NoOfRounds)) {
        RoundsOfTradingInput.value = Default;
        return Default;
    } else {
        return NoOfRounds;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function HowToChooseSeller() {
    return HowBuyerChoosesSellerInput.value;
}