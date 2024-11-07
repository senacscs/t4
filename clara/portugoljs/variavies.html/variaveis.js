function troca(){
    let v3;
    let v1 = document.getElementById('var1').value;
    let v2 = document.getElementById('var2').value;

    v3 = v1;
    v1 = v2; 
    v2 = v3

    document.getElementById('res').innerText = `Valores antes da troca ${v2} e ${v1} \n valores após a troca ${v1} e ${v2}`;

}