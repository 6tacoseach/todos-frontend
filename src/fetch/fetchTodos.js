export const fetchTodos = async (sendRequest, httpAbortCtrl, userId, token) => {
    try {
        const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/todos/user/${userId}`,
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