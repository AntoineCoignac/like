import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "./Dropzone.css";
import Cross from '../../icons/cross/Cross';
import upload from '../../utils/upload';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Dropzone ({ order }) {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [fileTooLargeError, setFileTooLargeError] = useState(false); // Ajout de l'état pour gérer l'erreur
    const navigate = useNavigate();

    const handleSubmitDelivery = async () => {
        try {
            const urls = await Promise.all(acceptedFiles.map(async (file) => {
                const url = await upload(file);
                return url;
            }));
    
            urls.forEach((url) => {
                console.log(url);
            });
    
            const submitDelivery = await newRequest.post(`/deliveries/create`, {
                orderId: order._id,
                docs: urls,
            });

            navigate("/work/orders")
        } catch (err) {
            console.log(err);
        }
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        onDrop: (files) => {
            // Créer une variable pour suivre si un fichier dépasse la limite
            let fileTooLarge = false;

            // Vérifier la taille de chaque fichier
            files.forEach((file) => {
                const maxSize = file.type.startsWith('image/') ? 10 * 1024 * 1024 : (file.type.startsWith('video/') ? 100 * 1024 * 1024 : 10 * 1024 * 1024); // Tailles maximales en octets

                if (file.size > maxSize) {
                    fileTooLarge = true;
                }
            });

            if (fileTooLarge) {
                // Afficher un message d'erreur
                setFileTooLargeError(true);
            } else {
                // Réinitialiser l'erreur
                setFileTooLargeError(false);

                // Ajoutez uniquement les fichiers qui ne sont pas déjà présents
                const uniqueFiles = files.filter((file) => !acceptedFiles.some((existingFile) => existingFile.name === file.name));
                setAcceptedFiles([...acceptedFiles, ...uniqueFiles]);
            }
        },
    });

    const handleDelete = (fileToDelete) => {
        const updatedFiles = acceptedFiles.filter((file) => file !== fileToDelete);
        setAcceptedFiles(updatedFiles);
    }

    return (
        <section className="dropzone-container">
            <div {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : null}` })}>
                <input {...getInputProps()} />
                <p>Déposez vos fichiers ici</p>
                {fileTooLargeError && <p className="error-message">Un ou plusieurs fichiers dépassent la taille maximale autorisée.</p>}
            </div>

            <aside>
                <p className='big-title name'>Fichiers</p>
                {
                    acceptedFiles.length > 0 ?
                        <ul className='files'>
                            {
                                acceptedFiles.map(file => (
                                    <li key={file.path}>
                                        <span>{file.path}</span>
                                        <button className='delete' onClick={() => handleDelete(file)}>
                                            <Cross />
                                        </button>
                                    </li>
                                ))
                            }
                        </ul> :
                        <p className='nofile'>Aucun fichier n'a été déposé</p>
                }
            </aside>
            <div className="send-order">
                {
                    acceptedFiles.length > 0 ?
                        <button className="btn" onClick={handleSubmitDelivery}>
                            Envoyer
                        </button>
                    : 
                        <button className="btn" disabled>
                            Envoyer
                        </button>
                }   
            </div>       
        </section>
    );
}

export default Dropzone;
