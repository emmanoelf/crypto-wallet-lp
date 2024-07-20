async function getValueBitcoin(){
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl', options);

        const actual_value_bitcoin = await response.json();

        return actual_value_bitcoin.bitcoin.brl;
    }catch(error){
        console.log(error)
    }
}

async function makeContribution(){
    const contribution = parseFloat(document.getElementById('add-contribution').value);

    const actual_value_bitcoin = await getValueBitcoin();

    let total_contributions = parseFloat(localStorage.getItem("qt_contribution"));

    if(isNaN(total_contributions)){
        localStorage.setItem("qt_contribution", 0);
        total_contributions = 0;
    }

    total_contributions += contribution;
    localStorage.setItem("qt_contribution", total_contributions);
    this.calculateQtSatoshis(actual_value_bitcoin, "sum");
}

async function removeContribution(){
    const contribution = parseFloat(document.getElementById('remove-contribution').value);

    const actual_value_bitcoin = await getValueBitcoin();

    let total_contributions = parseFloat(localStorage.getItem("qt_contribution"));

    if(total_contributions >= contribution){
        this.calculateQtSatoshis(actual_value_bitcoin, "subtract");
        total_contributions -= contribution;
        return localStorage.setItem("qt_contribution", total_contributions);
    }

    console.log("Você não tem saldo suficiente");
}

function calculateQtSatoshis(actual_value_bitcoin, operation){
    let qt_contribution = parseFloat(localStorage.getItem("qt_contribution"));
    let qt_satoshis = parseFloat(localStorage.getItem("qt_satoshis"));
    
    if(isNaN(qt_contribution)){
        qt_contribution = 0;
    }

    if(isNaN(qt_satoshis)){
        qt_satoshis = 0;
    }

    if(operation === "sum"){
        qt_satoshis += qt_contribution / actual_value_bitcoin
        localStorage.setItem("qt_satoshis", qt_satoshis);
    }

    if(operation === "subtract"){
        qt_satoshis -= qt_contribution / actual_value_bitcoin
        localStorage.setItem("qt_satoshis", qt_satoshis);
    }
    
    return qt_satoshis;
}

function calculateProfitOrLoss(actual_value_bitcoin, qt_satoshis){
    const total_contribution = parseFloat(localStorage.getItem("qt_contribution"));

    if(isNaN(total_contribution)){
        localStorage.setItem("qt_contribution", 0);
    }

    const profit_or_loss = (actual_value_bitcoin * qt_satoshis.toFixed(8)) - total_contribution;

    return profit_or_loss.toFixed(2);
}

async function showProfitLoss(){
    const actual_value_bitcoin = await getValueBitcoin();
    const qt_satoshis = this.calculateQtSatoshis(actual_value_bitcoin);

    const profit_or_loss = this.calculateProfitOrLoss(actual_value_bitcoin, qt_satoshis);

    if(isNaN(profit_or_loss)){
        return localStorage.setItem("profit_or_loss", 0);    
    }

    localStorage.setItem("profit_or_loss", profit_or_loss);
}
