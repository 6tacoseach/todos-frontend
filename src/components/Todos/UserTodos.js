import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import TodoList from './TodoList';
import { useHttpClient } from '../../hooks/useHttpClient';
import ErrorModal from '../UIElements/Modal/ErrorModal';
import LoadingSpinner from '../UIElements/Spinner/LoadingSpinner';
import { fetchTodos } from '../../fetch/fetchTodos';
import { TodoContext } from '../../context/todos-context';

const UserTodos = () => {
    const { isLoading, error, clearError, sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);
    const todos = useContext(TodoContext);

    const userId = auth.userId;
    const token = auth.token;

    useEffect(() => {
        let loadedTodos = async () => {
            try {
                const result = await fetchTodos(sendRequest, userId, token);
                const filteredTodos = result.filter((todo) => todo.isDeleted !== true);
                todos.updateTodos(filteredTodos);
            } catch (err) { }
        }
        loadedTodos();
    }, [sendRequest, userId]);

    const todoDeleteHandler = (deletedTodoId) => {
        todos.updateTodos(prevTodos => prevTodos.filter(todo => todo.id !== deletedTodoId));
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {
                isLoading &&
                <div className='center'>
                    <LoadingSpinner />
                </div>
            }
            {
                !isLoading && todos.todosList &&
                <TodoList items={todos.todosList} onDeleteTodo={todoDeleteHandler} token={token} />
            }
        </React.Fragment>
    );
};

export default UserTodos