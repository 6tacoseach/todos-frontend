export const fetchTodos = async (sendRequest, userId, token) => {
    const httpAbortCtrl = new AbortController();
    console.log('token: ', token)
    try {
        const responseData = await sendRequest(
            `http://localhost:5050/api/todos/user/${userId}`,
            httpAbortCtrl,
            'GET',
            null,
            {
                Authorization: 'Bearer ' + token
            }
        );
        return responseData.todos
    } catch (err) {
        console.log('This is the current error; ', err);
    }
}