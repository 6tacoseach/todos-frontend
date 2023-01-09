import React from 'react'
import TodoForm from '../components/TodoForm'
import UserTodos from '../components/UserTodos'
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