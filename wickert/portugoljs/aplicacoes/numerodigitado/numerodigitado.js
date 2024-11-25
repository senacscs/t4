function numerolegal() {
    const nd = document.getElementById('valordonumero').value;
    if (nd !== "") {
        console.log(nd)
        if (nd !== '69') {        
        document.getElementById('exibi').innerText = `Eu acho o número ${nd} um número muito legal !`
        }
        else {
        document.getElementById('exibi').innerText = `Esse número eu não acho tão legal não, muito SUS.`
        }
    }
    else {
        document.getElementById('exibi').innerText = `Você precisa primeiramente digitar algum número.`
    }
}