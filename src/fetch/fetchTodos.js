export const fetchTodos = async (sendRequest, httpAbortCtrl, userId, token) => {
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
        console.log(err);
    }
}