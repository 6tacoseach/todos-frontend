import React, { useRef, useContext } from 'react';
import Input from '../Form/Input';
import { useForm } from '../../hooks/useForm';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators';
import './TodoForm.css';
import ErrorModal from '../UIElements/Modal/ErrorModal';
import LoadingSpinner from '../UIElements/Spinner/LoadingSpinner';
import Button from '../UIElements/Button/Button';
import { useHttpClient } from '../../hooks/useHttpClient';
import { AuthContext } from '../../context/auth-context';
import { TodoContext } from '../../context/todos-context';
import { fetchTodos } from '../../fetch/fetchTodos';

const CreateTodo = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const childRef = useRef();

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

    const auth = useContext(AuthContext);
    const todos = useContext(TodoContext);
    const todoSubmitHandler = async event => {
        event.preventDefault();
        const httpAbortCtrl = new AbortController();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL,
                httpAbortCtrl,
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    complete: false,
                    creatorId: auth.userId
                }),
                {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                }
            );
            // resetInputHandler();
        } catch (err) {
            console.log('err', err);
        }

        try {
            const loadedTodos = await fetchTodos(sendRequest, httpAbortCtrl, auth.userId, auth.token);
            console.log('loadedTodos: ', loadedTodos)
            todos.updateTodos(loadedTodos);
        } catch (err) { }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form onSubmit={todoSubmitHandler} className="todoForm">
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    ref={childRef}
                    id='title'
                    type="text"
                    label="Title"
                    element="input"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                // resetInput={resetInputHandler}
                />
                <Input
                    ref={childRef}
                    id="description"
                    label="Description"
                    element="textarea"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid description (at least 5 characters)"
                    onInput={inputHandler}
                // resetInput={resetInputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>ADD TODO</Button>
            </form>
        </React.Fragment>
    )
}

export default CreateTodo