 
    function logar(){
 
        var login = document.getElementById('login').value;
        var senha= document.getElementById('senha').value;
       
        if(login == "familia franck" && senha =="04052004"){
    alert('boa pai');
    location.href = "inicio.html";
        }else{
            alert('tenta de novo pai');
        }
 
}