// inclua biblioteca Matematica --> mat
	
// 	funcao inicio ()
// 	{
// 		real m1, m2, m3, media

// 		escreva ("Informe a média 1: " )
// 		leia (m1)
// 		escreva( "Informe a média 2: ")
// 		leia (m2)
// 		escreva ("Informe a média 3: ")
// 		leia (m3)

// 		media = (m1 + m2 + m3) / 3 

// 		limpa()
// 		escreva ("A média final é: ", mat.arredondar(media, 2), "\n\n")


// 		se (m1 < media)
// 		{ 
// 			escreva ("A média 1 é menor que a média final\n") 
// 		}
		
// 		se (m2 < media) 
// 		{
// 			escreva ("A média 2 é menor que a média final\n")
// 		}
		
// 		se (m3 < media)
// 		{
// 			escreva ("A média 3 é menor que a média final\n")
// 		}		
// 	}

function medias() {

	let m1, m2, m3, media

     m1 = parseFloat(document.getElementById("medida1").value)
     m2 = parseFloat(document.getElementById("medida2").value)
     m3 = parseFloat(document.getElementById("medida3").value)

 	 media = (m1 + m2 + m3) / 3 

    document.write("A média final é: ", Math.round(media, 2), "\n\n")

 		if (m1 < media)
		{ 
			document.write ("A média 1 é menor que a média final\n") 
		}
		
		if (m2 < media) 
		{
			document.write ("A média 2 é menor que a média final\n")
		}
		
		if (m3 < media)
		{
			document.write ("A média 3 é menor que a média final\n")
		}	

}