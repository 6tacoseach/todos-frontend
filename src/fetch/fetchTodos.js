export const fetchTodos = async (sendRequest, userId) => {

    const httpAbortCtrl = new AbortController();
    try {
        const responseData = await sendRequest(
            `http://localhost:5050/api/todos/user/${userId}`,
            httpAbortCtrl,
            'GET',
            null,
            { 'Content-Type': 'application/json' }
        );
        return responseData.todos
    } catch (err) {
        console.log('This is the current error; ', err);
    }
}