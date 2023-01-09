import React from 'react'

import './TodoList.css'
import TodoItem from './TodoItem'
import Card from './UIElements/Card/Card'

const TodoList = (props) => {
    console.log('props: ', props)
    if (props.items.length === 0) {
        return (
            <div className='place-list center'>
                <Card>
                    <h2>No Places found. Maybe</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        )
    }

    return <ul className='todo-list'>
        {props.items.map(todo => <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            creatorId={todo.creator}
        />)}
    </ul>
}

export default TodoList