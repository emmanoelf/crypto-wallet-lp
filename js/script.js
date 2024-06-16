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
    }else{
        result_email.className = 'invalid-email';
        result_email.innerHTML = "Por favor, insira um e-mail válido.";
        element.style.border = "solid 2px #ff0000";
    }
}

function checkPattern(email){
    const pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return pattern.test(email);
}