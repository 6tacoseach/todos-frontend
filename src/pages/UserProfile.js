import React, { useEffect, userParams, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/UIElements/Card/Card';
import image from '../assets/shaquon-2.jpeg';
import ErrorModal from '../components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../components/UIElements/Spinner/LoadingSpinner';


const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUser, setLoadedUser] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users/');
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUser(responseData.user);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }
        }

        sendRequest();
    }, []);

    const clearErrorModalHandler = () => {
        setError(null);
    }
    const { name, email } = loadedUser;

    return (
        <div>
            <ErrorModal error={error} onClear={clearErrorModalHandler} />
            {isLoading && (
                <LoadingSpinner />
            )}

            {!isLoading && loadedUser && (
                <Card>
                    <Link to={`/`}>
                        <div>
                            <img src={image} />

                        </div>
                    </Link>
                </Card>
            )}
        </div>
    )
}

export default UserProfile