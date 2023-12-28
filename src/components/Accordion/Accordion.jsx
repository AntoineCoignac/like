import React from 'react';
import { useState } from 'react';
import "./Accordion.scss";

function Accordion({ title, price, content }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
                <span className='title'>{title}</span>
                <span className='price'>{price} €</span>
            </div>
            {isExpanded && <div className="accordion-content">{content.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}</div>}
        </div>
    )
}

export default Accordion;