import { createHashRouter } from "react-router";
import App from '../view/App';
import Delete from "../view/Delete";
import Update from "../view/Update";
import Add from "../view/Add";
import Find from "../view/Find";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/add",
        element: <Add />
    },
    {
        path: "/delete",
        element: <Delete />
    },
    {
        path: "/update",
        element: <Update />
    },{
        path: "/find",
        element: <Find />
    }
])