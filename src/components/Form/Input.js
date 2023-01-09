import React, { useReducer, useEffect } from 'react'
import './input.css';
import { validate } from '../../utils/validators';

const inputReducer = (state, action) => {
    // returns new state based on action
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
}

const Input = (props) => {
    // when you have 2 or more connected states use useReducer
    // can manage more complex state and more complexr updates   
    // a reducer recieves an action and the current state
    // returns current state and a dispatch function
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouched: false
    })
    const { id, onInput } = props;
    const { value, isValid, isTouched } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        //store value and validate it
        // could use useState and have 2 different values to track and change
        //  useReducer can be used to manage state as well. 
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators })
    }

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const element = props.element === 'input' ?
        <input id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        /> :
        <textarea id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />

    return (
        <div className={`form-control ${!inputState.isValid && isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && isTouched && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input