import React from 'react';
import './input.css';

const input = (props)=>{
    let inputElement = null;
    let validationError = null;
    const inputClasses = ["InputElement"]
    if(props.inValid && props.shouldValidate && props.touched){
        inputClasses.push("Invalid")
       
    }

    if(props.inValid && props.touched){
        validationError = <p>Enter a proper value!</p>
    }


    switch(props.elementType){
        case('input'):
            inputElement = <input 
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed} 
                                
                                />
            break;
        case('textarea'):
            inputElement =<textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />
            break;

        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

            default:
            inputElement = <input
                className= {inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input