import React from 'react';
import { Outlet } from 'react-router-dom';

const TodoLayout: React.FC = () => {

    console.log(import.meta.env.VITE_BACKEND_URL);

    console.log(import.meta.env.VITE_SOME_KEY) // 123
    console.log(import.meta.env.DB_PASSWORD) // undefined

    return (
        <div>
            <div>
                This is main TodoLayout
            </div>

            <Outlet />
        </div>
    );
};

export default TodoLayout;