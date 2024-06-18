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