import axios from "axios";

const upload = async (file) => {
    let ext = file.name.split('.').pop().toLowerCase();

    console.log(ext)

    // Tableau des extensions de fichiers vidéo
    const extensionsVideo = ['mp4', 'avi', 'mov', 'webm'];

    // Tableau des extensions de fichiers image
    const extensionsImage = ['jpg', 'jpeg', 'png', 'webp'];

    // Créer un objet FormData
    let formData = new FormData();
    
    // Vérifier si l'extension correspond à une vidéo
    if (extensionsVideo.includes(ext)) {
        console.log("video");
        formData.append("video", file);
    }

    // Vérifier si l'extension correspond à une image
    if (extensionsImage.includes(ext)) {
        console.log("image");
        formData.append("image", file);
    }

    // Boucle sur les entrées de FormData pour vérifier ce qui a été ajouté
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    try {
        // Envoyer la requête avec le bon en-tête
        const res = await axios.post(`https://likestorageapp.azurewebsites.net/${extensionsVideo.includes(ext) ? 'video' : 'image'}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Spécifier le type de contenu approprié
            }
        });
        let url = res.data.url;
        return url;
    } catch (err) {
        console.log(err)
    }
}

export default upload;