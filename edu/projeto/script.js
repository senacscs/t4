let lang = "pt";
let pt = Array.from(document.getElementsByClassName("pt"));
let en = Array.from(document.getElementsByClassName("en"));
let sections = Array.from(document.getElementsByTagName("section"));


function trocarLingua() {
    switch (lang) {
        case "pt":
            console.log("pt");
            lang = "en";
            pt.forEach(element => {
                element.style.display = "none";
            });
            en.forEach(element => {
                element.style.display = "inline";
            });
            sections.forEach(element => {
                if(element.className.endsWith(" p")){
                    element.className = element.className.slice(0,-2);
                    element.className += " e";
                }
            });
            break;

        case "en":
            console.log("en");
            lang = "pt";
            en.forEach(element => {
                element.style.display = "none";
            });
            pt.forEach(element => {
                element.style.display = "inline";
            });
            sections.forEach(element => {
                if(element.className.endsWith(" e")){
                    element.className = element.className.slice(0,-2);
                    element.className += " p";
                }
            });
            break;
    }
}

document.getElementById("bot").addEventListener("click", function () { trocarLingua() });