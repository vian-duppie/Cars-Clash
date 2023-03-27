// Project Imports
import styles from './LabelIcon.module.css';
import Icon from '../Icon/Icon';

const LabelIcon = (props) => {
    return (
        <div className={`
            ${ styles.labelIconContainer }
        `}>
            <Icon
                className={`
                ${ props.className ? props.className : ' '}
                ${ styles.labelIconContainer__iconContainer }
            `}
                icon={ props.icon }
            />
            <p className={`
                ${ styles.labelIconContainer__label } 
                p2
            `}>
                { props.label }
            </p>
        </div>
    )
} 

export default LabelIcon;