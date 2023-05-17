let buscador= document.getElementById("buscador")
let btnBuscar= document.getElementById("btnBuscar")

let tituloVideo= document.getElementById("tituloVideo")
let imgChannel= document.getElementById("imgChannel")
let titleChannel= document.getElementById("titleChannel")
let seguidores= document.getElementById("seguidores")
let views= document.getElementById("views")
let likes= document.getElementById("likes")
let description= document.getElementById("description")
let comments= document.getElementById("comments")
let videoPut= document.getElementById("videoPut")
let commentContent= document.getElementById("commentContent")
let videoList= document.getElementById("videoList")

btnBuscar.addEventListener("click",actUrl)
let url=""
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '752a59ef9bmsh2da8de480701591p14bc2fjsn1b61398ec9a3',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

function actUrl()
{
    url=`https://youtube138.p.rapidapi.com/search/?q=${buscador.value}&hl=en&gl=US`;
    searchVideo(url,options)
}
async function searchVideo(url,options)
{
    try {
        const response = await fetch(url,options);
        const result = await response.json();

        let videoId= result.contents[0].video.videoId;
        let videoTitle = result.contents[0].video.title;
        let imgAutor=result.contents[0].video.author.avatar[0].url
        let titleCanal= result.contents[0].video.author.title        
        //const views= result.contents[0].video.author.stats.views
        videoPut.innerHTML=`<iframe class="w-full h-full aspect-video" src="https://www.youtube.com/embed/${videoId}" frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        tituloVideo.innerHTML=`${videoTitle}`
        imgChannel.innerHTML=`<img id="imgChannel" src="${imgAutor}" class="w-12 h-12 rounded-full">`
        titleChannel.innerHTML=`${titleCanal}`
        //console.log(videoId);
        //console.log(videoTitle);
        //console.log(imgAutor);
        //console.log(titleChannel);
        const urlVideo = `https://youtube138.p.rapidapi.com/video/details/?id=${videoId}&hl=en&gl=US`;

        const respuesta = await fetch(urlVideo,options);
        const resultado = await respuesta.json();

        let suscritos=resultado.author.stats.subscribersText
        let megusta=(resultado.stats.likes).toLocaleString()
        let comentarios=(resultado.stats.comments).toLocaleString()
        let vistas=(resultado.stats.views).toLocaleString()
        let descripcion=resultado.description

        seguidores.innerHTML=`${suscritos}`
        likes.innerHTML=`${megusta}`
        comments.innerHTML=`${comentarios}`
        views.innerHTML=`${vistas}`
        description.innerHTML=`${descripcion}`

        //console.log(suscritos) 
        //console.log(likes) 
        //console.log(comments)
        //console.log(views) 
        //console.log(description)        
        
        //console.log(result)
        //console.log(resultado) 
        
        const urlComments = `https://youtube138.p.rapidapi.com/video/comments/?id=${videoId}&hl=en&gl=US`;
        const respuesta_ = await fetch(urlComments,options);
        const resultado_= await respuesta_.json();

        for (i=0; i< resultado_.comments.length; i++)
        {
            
                
            let imgurl=resultado_.comments[i].author.avatar[0].url
            let commentId=resultado_.comments[i].author.title
            let commentCont=resultado_.comments[i].content

            commentContent.innerHTML+=` <div  class="flex items-center gap-4 p-4 text-white">
            <img class="w-12 h-12 rounded-full" src="${imgurl}">
            <div class="flex flex-col text-white">
                <strong id="commentId" class="text-white text-sm font-semibold  italic ">${commentId}</strong>
                <span id="commentContent" class="text-white text-sm text-justify w-full text-clip overflow-hidden">${commentCont}</span>
            </div>`
                

        }

        const urlRelacion = `https://youtube138.p.rapidapi.com/video/related-contents/?id=${videoId}&hl=en&gl=US`;
        const respuesta2 = await fetch(urlRelacion,options);
        const resultado2= await respuesta2.json();

        for (i=0; i< resultado2.contents.length; i++)        
        {
            let tipo=resultado2.contents[i].type
            if (tipo=="video")
            {
                let imgrela=resultado2.contents[i].video.thumbnails[0].url
            let titleVideo=resultado2.contents[i].video.title
            let vistas=(resultado2.contents[i].video.stats.views).toLocaleString()

            //console.log(imgrela)
            //console.log(titleVideo)
            //console.log(vistas)
            videoList.innerHTML+=`<div class="overflow-hidden rounded w-full h-full snap-center  shrink-0 relative first:pl-6 last:pr-[calc(100%-21.5rem)] flex flex-col gap-1 ">
            <img class="object-cover aspect-video shrink-0 w-2/5 h-3/4 rounded-lg shadow-xl bg-white" src="${imgrela}">                    
            <span>${titleVideo}</span>                    
            <span>${vistas} Vistas</span>         
            </div>`       
            }
        }       

        
    } catch (error) {
        console.error(error);
    }
}












