import React, { useState, useParams } from 'react'
import Button from '../UIElements/Button/Button'
import Card from '../UIElements/Card/Card'
import './TodoItem.css'
import Modal from '../UIElements/Modal/Modal'
import { useHttpClient } from '../../hooks/useHttpClient'
import ErrorModal from '../UIElements/Modal/ErrorModal'
import LoadingSpinner from '../UIElements/Spinner/LoadingSpinner'

const TodoItem = (props) => {
    const { isLoading, error, clearError, sendRequest } = useHttpClient()
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const openDeleteWarningHandler = () => setShowDeleteWarning(true);

    const closeDeleteWarningMapHandler = () => setShowDeleteWarning(false);

    const onConfirmDeleteHandler = async () => {
        const httpAbortCtrl = new AbortController();
        closeDeleteWarningMapHandler(false);
        try {
            await sendRequest(`http://localhost:5050/api/todos/${props.id}`, httpAbortCtrl, 'DELETE', null, {
                Authorization: 'Bearer ' + props.token
            });
            props.onDelete(props.id);
        } catch (err) { }

    }
    return (
        <React.Fragment>
            <ErrorModal clearError={clearError} error={error} />
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
                    {isLoading && <LoadingSpinner overlay />}
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