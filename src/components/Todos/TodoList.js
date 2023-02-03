import React from 'react'

import './TodoList.css'
import TodoItem from './TodoItem'
import Card from '../UIElements/Card/Card'

const TodoList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className='todo-list center'>
                <Card>
                    <h2>No Todos found. Maybe</h2>
                    <button>Create Todo</button>
                </Card>
            </div>
        )
    }

    return <ul className='todo-list'>
        {props.items.map(todo => <TodoItem
            id={todo['_id']}
            key={todo['_id']}
            title={todo.title}
            description={todo.description}
            onDelete={props.onDeleteTodo}
            creatorId={todo.creator}
            token={props.token}
        />)}
    </ul>
}

export default TodoList