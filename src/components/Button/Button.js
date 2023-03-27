import React from 'react';
import styles from './Button.module.css';

const Card = (props) => {
    return(
        <button>
            { props.label }
        </button>
    )
}

export default Card;