import axios from "axios";

const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "likecdn");

    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dapo2rsct/auto/upload`, data);
        let {url} = res.data;
        url = url.replace("http://", "https://");
        url = url.replace("/upload/", "/upload/w_1000/q_70/");
        return url;
    } catch (err) {
        console.log(err)
    }
}

export default upload;