import React, { useState, useEffect } from 'react';
import Button from '../components/UIElements/Button/Button';
import Input from './Form/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../utils/validators';
import { useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Card from './UIElements/Card/Card';

const DUMMY_TODOS = [
    {
        id: 't1',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world.',
        complete: 'false',
        creator: 'u1'
    },
    {
        id: 't2',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world.',
        complete: 'false',
        creator: 'u2'
    }
];

const UpdateTodo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const todoId = useParams().todoId;

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

    const identifiedTodo = DUMMY_TODOS.find(t => t.id === todoId);

    useEffect(() => {
        if (identifiedTodo) {
            setFormData(
                {
                    title: {
                        value: identifiedTodo.title,
                        isValid: true
                    },
                    description: {
                        value: identifiedTodo.description,
                        isValid: true
                    },
                    complete: {
                        value: identifiedTodo.complete,
                        isValid: true
                    }
                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedTodo]);

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedTodo) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }
    console.log("formState: ", formState);

    return (
        <form className="todo-form" onSubmit={submitHandler} >
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValid={formState.inputs.title.isValid}
                initialValue={formState.inputs.title.value}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)"
                onInput={inputHandler}
                initialValid={formState.inputs.description.isValid}
                initialValue={formState.inputs.description.value}
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
        </form>
    )
};

export default UpdateTodo;