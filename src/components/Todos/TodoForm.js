import React from 'react';
import Input from '../Form/Input';
import { useForm } from '../../hooks/useForm';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import './TodoForm.css'
import Button from '../UIElements/Button/Button';

const TodoForm = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    });

    const todoSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send to backend
    };

    return (
        <form onSubmit={todoSubmitHandler} className="todoForm">
            <Input
                id='title'
                type="text"
                label="Title"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
            />
            <Input
                id="description"
                label="Description"
                element="textarea"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>ADD TODO</Button>
        </form>
    )
}

export default TodoForm