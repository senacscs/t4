function calcularMedia() {
    let altura1 = parseFloat(document.getElementById("altura1").value);
    let altura2 = parseFloat(document.getElementById("altura2").value);
    let altura3 = parseFloat(document.getElementById("altura3").value);
 
    let media_altura = (altura1 + altura2 + altura3) / 3;
 
    document.write("A média das alturas é: ", media_altura)
}