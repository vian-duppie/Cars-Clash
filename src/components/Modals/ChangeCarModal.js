
import React from 'react';
import styles from './ChangeCarModal.module.css';
import { forwardRef } from 'react';
import Icon from '../Icon/Icon';
import Select from '../Dropdown/Select';

const SpecListModal = forwardRef((props, ref) => {

    const cars = ['RS 4', 'RS 5', 'RS 6', 'RS Q3', 'RS Q8']; //This is the list of cars that can be selected
    const openCarModal = props.openCarModal; //This value is used to check if the modal should be displayed or not

    return (
        <div className={ styles.background }>
            <div className={ styles.carChangeContainer }>
                <div className={ styles.carChangeContainer__topContainer }>
                    <h6 className={ styles.carChangeContainer__topContainer__title }>
                        Select a car you want to view on the dashboard
                    </h6>
                    <Icon
                        icon='close'
                        click={ () => openCarModal(false) }
                    />
                </div>
                <div className={ styles.carChangeContainer__bottomContainer }>
                    <Select
                        className={ styles.carChangeContainer__bottomContainer__select}
                        label={'Model'}
                        text='RS 3'
                        textValue={ 'RS 3' }
                        options={ cars }
                        ref={ ref }
                        onChange={ props.onChange }
                    />
                </div>
            </div>
        </div>
    );
});

export default SpecListModal;