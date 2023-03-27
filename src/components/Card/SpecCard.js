import React from 'react';
import styles from './SpecCard.module.css';

const SpecCard = (props) => {
    return(
        <div className={styles.card}> 
            <div className={` 
                ${ styles.icon }
                ${ props.iconClass ? props.iconClass : ''}  
            `}>
                <img
                    src={ require(`../../assets/SVG/${ props.icons }-icon.svg`)}
                />
            </div>
            <div className={`
                ${ styles.stats }
                ${ props.statsClass ? props.statsClass : ''}
            `}>
                <p>{ props.stat }</p>
                <p>{ props.statValue }</p>

            </div>
        </div>

    )
}

export default SpecCard;