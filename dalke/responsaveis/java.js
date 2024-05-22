 
    function logar(){
 
        var login = document.getElementById('login').value;
        var senha= document.getElementById('senha').value;
       
        if(login == "Familia Dalke" && senha =="09052008"){
    alert('boa mãe');
    location.href = "inicio.html";
        }else{
            alert('tenta de novo mãe');
        }
 
}