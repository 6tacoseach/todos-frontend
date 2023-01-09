import React from 'react'
import { useParams } from 'react-router-dom'
import TodoList from './TodoList'

const DUMMY_TODOS = [
    {
        id: 't1',
        title: 'Wash Clothes',
        description: 'Do not forget to wash.',
        dueDate: '01/01/20',
        creator: 'u1'
    },
    {
        id: 't2',
        title: 'Clean dishes',
        description: 'Do not forget to clean.',
        dueDate: '01/02/20',
        creator: 'u1'
    }
]
const UserTodos = () => {
    console.log('RENDERRRREDD!!!!');
    const userId = useParams().userId;
    const loadedTodos = DUMMY_TODOS.filter(todo => todo.creator === userId)
    console.log('loadedTodos: ', loadedTodos);

    return (
        <TodoList items={loadedTodos} />
    )
}

export default UserTodos