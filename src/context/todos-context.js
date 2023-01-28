import { createContext } from "react";

export const TodoContext = createContext({
    todosList: [],
    updateTodos: () => {},
});