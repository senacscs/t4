let count = 1;
document.getElementById("radio1").checked = true;
 
setInterval( function() {
    nextImage();
}, 8000);
 
function nextImage(){
    count++;
    if(count>6){
        count = 1
    }
 
    document.getElementById("radio"+count).checked = true;
 
}