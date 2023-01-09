import React, { useState } from 'react'
import Button from './UIElements/Button/Button'
import Card from './UIElements/Card/Card'
import './TodoItem.css'

const TodoItem = (props) => {
    return (
        <React.Fragment>
            <li className='todo-item'>
                <Card>
                    <div className='todo-item__info'>
                        <h2>{props.title}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div className='todo-item__actions'>
                        <Button inverse onClick={() => { }}>Mark Complete</Button>
                        <Button to={`/Todos/${props.id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default TodoItem