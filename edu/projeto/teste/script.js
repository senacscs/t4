let lang = "pt";
let pt = Array.from(document.getElementsByClassName("pt"));
let en = Array.from(document.getElementsByClassName("en"));


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
            break;
    }
}