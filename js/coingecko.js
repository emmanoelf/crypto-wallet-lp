async function getValueBitcoin(){
    try{
        const response = await fetch('https://young-wave-d1f4.emmanoelf-dev.workers.dev/');
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

    const toast = document.getElementById("toast");
    toast.innerHTML = "Aporte realizado com sucesso!";
    showToast();

    localStorage.setItem("qt_contribution", total_contributions);
    this.calculateQtSatoshis(actual_value_bitcoin, "sum", contribution);
}

async function removeContribution(){
    const remove_contribution = parseFloat(document.getElementById('remove-contribution').value);

    const actual_value_bitcoin = await getValueBitcoin();

    let total_contributions = parseFloat(localStorage.getItem("qt_contribution"));

    if(total_contributions >= remove_contribution){
        this.calculateQtSatoshis(actual_value_bitcoin, "subtract", remove_contribution);
        total_contributions -= remove_contribution;
        return localStorage.setItem("qt_contribution", total_contributions);
    }

    const toast = document.getElementById("toast");
    toast.style.backgroundColor = "#ff0000";
    toast.innerHTML = "Você não tem saldo suficiente!";
    showToast();
}

function calculateQtSatoshis(actual_value_bitcoin, operation, value_operation){
    let qt_satoshis = parseFloat(localStorage.getItem("qt_satoshis"));

    if(isNaN(qt_satoshis)){
        qt_satoshis = 0;
    }

    if(operation === "sum"){
        qt_satoshis += value_operation / actual_value_bitcoin
        localStorage.setItem("qt_satoshis", qt_satoshis);
    }

    if(operation === "subtract"){
        qt_satoshis -= value_operation / actual_value_bitcoin
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

    return profit_or_loss;
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
