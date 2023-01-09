import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import './Home.css'

const Home = () => {
    return (
        <main className='main'>
            <TodoForm />
            <TodoList />
        </main>
    )
}

export default Home