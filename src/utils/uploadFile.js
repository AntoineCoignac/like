import newRequest from "./newRequest";

const uploadFile = async (file) => {
    let ext = file.name.split('.').pop().toLowerCase();

    // Créer un objet FormData
    let formData = new FormData();
    
    formData.append("file", file);

    try {
        // Envoyer la requête avec le bon en-tête
        const res = await axios.post(`https://likestorageapp.azurewebsites.net/file`, formData, {
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

export default uploadFile;