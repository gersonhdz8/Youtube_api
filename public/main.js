let buscador= document.querySelector("#buscador")
let btnBuscar= document.querySelector("#btnBuscar")
buscador.addEventListener()
btnBuscar.addEventListener("click",buscarCanal)


console.log(buscador.value)

async function buscarCanal()
{
    console.log(buscador.value)
    /*const url =  ` https://youtube138.p.rapidapi.com/search/?q=${despacito}&hl=en&gl=US ` ;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '752a59ef9bmsh2da8de480701591p14bc2fjsn1b61398ec9a3',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
    };

    try 
    {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } 
    catch (error)
    {
    console.error(error);
    }
    */
}
