import React from 'react';
import CreateTodo from '../components/Todos/CreateTodo';
import UserTodos from '../components/Todos/UserTodos';
import './Home.css';

const Home = () => {
    return (
        <main className='main'>
            <CreateTodo />
            <UserTodos />
        </main>
    )
}

export default Home