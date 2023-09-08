import React, { useState } from 'react';

import { useDropzone } from 'react-dropzone';
import "./Dropzone.css";
import Cross from '../../icons/cross/Cross';

const Dropzone = (props) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);

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
            {
                    acceptedFiles.length > 0 ?
                        <button className="btn">
                            Envoyer
                        </button>
                    : 
                        <button className="btn" disabled>
                            Envoyer
                        </button>
            }   
            
        </section>
    );
}

export default Dropzone;
