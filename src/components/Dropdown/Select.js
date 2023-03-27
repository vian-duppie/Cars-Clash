import React from 'react';
import styles from './Select.module.css';
import { forwardRef } from 'react';

const Select = forwardRef((props, ref) => { //Use forwardRef so that you can pass a useRef as a prop otherwise it won't work
    //const values = props.optionsValue;
    const values = props.value || []; //Take the given value or values is empty
    const carValue = props.items;
    const selectOptions = props.options.map((item, index) => <option  key={ props.key || index } value={ item[values] ||  values[index] || item } className={ item.selectContainer__options }>{ item[carValue] || item }</option>);

    return (
        <div className={`
            ${ styles.selectContainer }
            ${ props.className ? props.className : ''}  
        `}>
            <p className={`
                ${ styles.selectContainer__subTitle }
                p2
            `}>
                { props.label }
            </p>
            <select
                className={ styles.selectContainer__select }
                onChange={ props.onChange }
                ref={ ref }
            >
                <option key="first" value={ props.textValue } >{ props.text }</option>
                { selectOptions }
            </select>
        </div>
    );
});

export default Select;