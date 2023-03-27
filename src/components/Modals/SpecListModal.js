import React from 'react';
import styles from './SpecListModal.module.css';
import Icon from '../Icon/Icon';
import LabelIcon from '../Icon/LabelIcon';

const SpecListModal = ({ openModal }) => {
    return (
        <div className={ styles.background }>
            <div className={ styles.specListContainer }>
                <div className={ styles.specListContainer__topContainer }>
                    <h6 className={ styles.specListContainer__topContainer__title }>
                        Full list of specs you can view...
                    </h6>
                    <Icon
                        icon='close'
                        click={ () => openModal(false) }
                    />
                </div>
                <div className={ styles.specListContainer__bottomContainer }>
                    <div className={ styles.specListContainer__bottomContainer__specList__left }>
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='car'
                            label='Model'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='fuel'
                            label='Fuel Consumption'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='gas-station'
                            label='Fuel Type'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='top-speed'
                            label='Top Speed'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='engine'
                            label='Engine Displacement'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='weight'
                            label='Weight'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='gears'
                            label='Number of Gears'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='acceleration'
                            label='Acceleration'
                        />
                    </div>
                    <div className={ styles.specListContainer__bottomContainer__specList__right }>
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='door'
                            label='Number of Doors'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='year'
                            label='Year'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='car-body'
                            label='Body Type'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='horsepower'
                            label='Power'
                        />
                        <LabelIcon
                            className={ styles.specListContainer__bottomContainer__specList__spec }
                            icon='torque'
                            label='Torque'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecListModal;