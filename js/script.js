function scrollTo(hash){
    location.hash = "#" + hash;
}

function validateEmail(element){
    const email = element.value;
    const result_email = document.getElementById("result-email");
    const validate_email = checkPattern(email);
    if(validate_email){
        result_email.className = 'valid-email';
        result_email.innerHTML = "E-mail válido";
        element.style.border = "solid 2px #049f04";
        document.getElementById("send-form").disabled = false;
    }else{
        result_email.className = 'invalid-email';
        result_email.innerHTML = "Por favor, insira um e-mail válido.";
        element.style.border = "solid 2px #ff0000";
        document.getElementById("send-form").disabled = true;
    }
}

function checkPattern(email){
    const pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return pattern.test(email);
}

function showToast() {
    const toast = document.getElementById("toast");
    toast.className = "show";
    setTimeout(() => { 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

function validateForm() {
    let empty_fields = "";

    for(let i = 0; i < document.forms[0].length -1; i++){
        let element_value = document.forms[0].elements.item(i).value;
        if(isEmpty(element_value)){
            empty_fields += document.forms[0].elements.item(i).id + " ";
        }
    }

    if(isEmpty(empty_fields)){
        const toast = document.getElementById("toast");
        toast.style.backgroundColor = "#125b32";
        toast.innerHTML = "Mensagem enviada com sucesso!";
        showToast();
    }else{
        const toast = document.getElementById("toast");
        toast.style.backgroundColor = "#ff0000";
        toast.innerHTML = `Os campos ${empty_fields} precisam ser preenchidos.`;
        showToast();
    }

}

function isEmpty(str) {
    return (!str || str.length === 0 );
}


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle')
    const nav = document.querySelector('nav')

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active')
    })
});

document.getElementById('demo').onclick = function() {
    document.getElementById('popup').style.display = 'block';
    document.querySelector('.tablinks').click();
};

document.querySelector('.close').onclick = function() {
    document.getElementById('popup').style.display = 'none';
};

function openTab(event, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.className += ' active';
    loadContent(tabName);
}

function loadContent(tabName) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', tabName + '.html', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById(tabName).innerHTML = xhr.responseText;
            if(tabName === 'profit-loss-tab'){
                renderProfitOrLoss()
            }
        }
    };
    xhr.send();
}

function renderProfitOrLoss(){
    let profit_or_loss = parseFloat(localStorage.getItem("profit_or_loss"));
    let h3 = document.createElement('h3');
    h3.style.fontWeight = 'bold';
    h3.className = 'tab-p title rem-3';

    if(profit_or_loss < 0 || isNaN(profit_or_loss)){
        h3.textContent = `Você está com prejuízo de R$ ` + profit_or_loss.toFixed(2);
        h3.style.color = '#ff0000';
    }else{
        h3.textContent = `Você está com lucro de R$ ` + profit_or_loss.toFixed(2);
        h3.style.color = '#125b32';
    }

    let h2 = document.createElement('h2');
    h2.innerHTML = 'Sentimento do mercado';
    h2.className = 'title title-tab'

    let h3_fear_and_greed = document.createElement('h3');
    h3_fear_and_greed.innerHTML = 'Fear and greed index';
    h3_fear_and_greed.className = 'title title-tab rem-1-5';

    let p_fear = document.createElement('p');
    p_fear.innerHTML = 'O Fear and Greed Index é um indicador que vai de 0 a 100 que mede o sentimento social em relação ao preço do Bitcoin. O indicador é desenvolvido pela Alternative.me e busca estimar o sentimento médio dos participantes do mercado em relação ao preço da principal criptomoeda.';

    let p_font = document.createElement('p');
    p_font.innerHTML = 'Fonte: ';
    let a_href_fear = document.createElement('a');
    a_href_fear.href = 'https://coinext.com.br/blog/fear-and-greed-index';
    a_href_fear.target = '_blank';
    a_href_fear.innerHTML = 'https://coinext.com.br/blog/fear-and-greed-index';

    let div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'center';

    let img = document.createElement('img');
    img.src = 'https://alternative.me/crypto/fear-and-greed-index.png';
    img.alt = 'Latest Crypto Fear & Greed Index';
    img.style.maxWidth = '500px';

    document.getElementById('profit-loss-tab').appendChild(h3);
    document.getElementById('profit-loss-tab').appendChild(h2);
    document.getElementById('profit-loss-tab').appendChild(h3_fear_and_greed);
    document.getElementById('profit-loss-tab').appendChild(p_fear);
    document.getElementById('profit-loss-tab').appendChild(p_font).appendChild(a_href_fear);
    document.getElementById('profit-loss-tab').appendChild(div).appendChild(img);
}

function changeTheme(){
    if(document.body.classList.length > 0){
        document.body.classList.remove('contrast');
        document.body.style.background = '#fff';
        document.getElementById('theme').children.item(0).setAttribute('src', '../img/night.png');
    }else{
        document.body.classList.add('contrast');
        document.body.style.background = '#000';
        document.getElementById('theme').children.item(0).setAttribute('src', '../img/sun.png');
        
    }
}

const image = document.getElementById('hover-image');
const audio = document.getElementById('hover-audio');

image.addEventListener('mouseenter', () => {
    audio.play();
});

image.addEventListener('mouseleave', () => {
    audio.pause();
});