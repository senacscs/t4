function logar(){
 
        
    var senha= document.getElementById('senha').value;
   
    if(senha =="150608"){
alert('Sucesso');
location.href = "home.html";
    }else{
        alert('Usuario ou senha incorretos');
    }

}