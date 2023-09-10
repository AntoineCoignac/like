import React, { useState } from 'react';

import { useDropzone } from 'react-dropzone';
import "./Dropzone.css";
import Cross from '../../icons/cross/Cross';

import upload from '../../utils/upload';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Dropzone ({ order }) {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
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
            // Ajoutez uniquement les fichiers qui ne sont pas déjà présents
            const uniqueFiles = files.filter((file) => !acceptedFiles.some((existingFile) => existingFile.name === file.name));
            setAcceptedFiles([...acceptedFiles, ...uniqueFiles]);
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
