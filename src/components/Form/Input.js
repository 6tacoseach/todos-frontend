import React, { useReducer, useEffect, useImperativeHandle, forwardRef } from 'react'
import './input.css';
import { validate } from '../../utils/validators';
import { Switch } from 'antd';

const inputReducer = (state, action) => {
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

const Input = forwardRef((props, ref) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouched: false
    });

    const { id, onInput } = props;
    const { value, isValid, isTouched } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        if (id === 'complete') {
            dispatch({ type: 'CHANGE', val: event, validators: props.validators })
        } else {
            dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators })
        }
    }

    const resetInputHandler = () => {
        dispatch({ type: 'CHANGE', val: '', validators: [] });
    }

    useImperativeHandle(ref, () => ({ resetInputHandler }));

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    let element;
    if (props.element === 'input') {
        element = <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />
    } else if (props.element === 'textarea') {
        element = <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
        />
    } else {
        element = <Switch
            id={props.id}
            defaultChecked={false}
            checked={inputState.value}
            onChange={changeHandler}
        />
    }

    return (
        <div className={`form-control ${!inputState.isValid && isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && isTouched && <p>{props.errorText}</p>}
        </div>
    )
})

export default Input