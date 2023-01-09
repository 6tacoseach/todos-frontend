import React, { useState } from 'react'
import Button from './UIElements/Button/Button'
import Card from './UIElements/Card/Card'
import './TodoItem.css'
import Modal from './UIElements/Modal/Modal'

const TodoItem = (props) => {
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const openDeleteWarningHandler = () => setShowDeleteWarning(true);

    const closeDeleteWarningMapHandler = () => setShowDeleteWarning(false);

    const onConfirmDeleteHandler = () => {
        console.log('deleted!!!!');
    }
    return (
        <React.Fragment>
            <Modal
                show={showDeleteWarning}
                onCancel={closeDeleteWarningMapHandler}
                header="Are you sure?"
                contentClass="todo-item__modal-content"
                footerClass="todo-item__modal-actions"
                footer={(
                    <React.Fragment>
                        <Button inverse onClick={closeDeleteWarningMapHandler}>Cancel</Button>
                        <Button danger onClick={onConfirmDeleteHandler}>Confirm Delete</Button>
                    </React.Fragment>
                )}
            >
                <div>
                    <p>Are you sure you want to delete todo?</p>
                </div>
            </Modal>
            <li className='todo-item'>
                <Card>
                    <div className='todo-item__info'>
                        <h2>{props.title}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div className='todo-item__actions'>
                        <Button inverse onClick={() => { }}>Mark Complete</Button>
                        <Button to={`/todos/${props.id}`}>EDIT</Button>
                        <Button onClick={openDeleteWarningHandler} danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default TodoItem