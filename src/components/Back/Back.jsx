import React from 'react';
import { useNavigate } from "react-router-dom";
import BackArrow from '../../icons/back/BackArrow';
import "./Back.scss";

function Back() {

    const navigate = useNavigate();

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <button onClick={handleGoBack} className="back"><BackArrow/></button>
    )
}

export default Back;