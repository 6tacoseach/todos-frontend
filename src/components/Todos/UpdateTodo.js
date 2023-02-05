import React, { useState, useEffect, useContext } from 'react';
import Button from '../UIElements/Button/Button';
import Input from '../Form/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import Card from '../UIElements/Card/Card';
import LoadingSpinner from '../UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../UIElements/Modal/ErrorModal';
import { AuthContext } from '../../context/auth-context';

const UpdateTodo = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedTodo, setLoadedTodo] = useState();
    const history = useHistory();
    const auth = useContext(AuthContext);

    const todoId = useParams().todoId;
    const token = auth.token;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: true
        },
        description: {
            value: '',
            isValid: true
        },
        complete: {
            value: false,
            isValid: true
        }
    }, true);

    useEffect(() => {
        const getTodo = async () => {
            const httpAbortCtrl = new AbortController();
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/todos/${todoId}`, httpAbortCtrl, {
                    Authorization: 'Bearer ' + token
                });
                // console.log('todo: ', responseData.todo);
                setLoadedTodo(responseData.todo);
            } catch (err) { }

        }
        getTodo();
    }, [sendRequest, todoId])

    useEffect(() => {
        if (loadedTodo) {
            setFormData(
                {
                    title: {
                        value: loadedTodo.title,
                        isValid: true
                    },
                    description: {
                        value: loadedTodo.description,
                        isValid: true
                    },
                    complete: {
                        value: loadedTodo.complete,
                        isValid: true
                    }
                },
                true
            );
        };
        // setIsLoading(false);
    }, [setFormData, loadedTodo]);

    const submitHandler = async (event) => {
        const httpAbortCtrl = new AbortController();
        event.preventDefault();

        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/todos/${todoId}`, httpAbortCtrl, 'PATCH', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                complete: formState.inputs.complete.value,
            }), { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token });

            history.push(`/${auth.userId}`);
        } catch (err) { }
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedTodo && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedTodo && <form className="todo-form" onSubmit={submitHandler} >
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title"
                    onInput={inputHandler}
                    initialValid={true}
                    initialValue={loadedTodo.title}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (min. 5 characters)"
                    onInput={inputHandler}
                    initialValid={true}
                    initialValue={loadedTodo.description}
                />
                <div>
                    <h3>Status</h3>
                    <div>

                        <Input
                            id="complete"
                            validators={[]}
                            element=""
                            onInput={inputHandler}
                            initialValue={false}
                            initialValid={true}
                        />
                        <h4>{formState.inputs.complete.value ? 'Complete' : 'Not Complete'}</h4>
                    </div>
                </div>

                <Button type="submit" disabled={!formState.isValid}>
                    Update Todo
                </Button>
            </form>}
        </React.Fragment>
    )
};

export default UpdateTodo;