import React from 'react'
import TodoForm from '../components/Todos/TodoForm'
import UserTodos from '../components/Todos/UserTodos'
import './Home.css'

const Home = () => {
    return (
        <main className='main'>
            <TodoForm />
            <UserTodos />
        </main>
    )
}

export default Home