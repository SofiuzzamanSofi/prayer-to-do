import React from 'react';
import { Outlet } from 'react-router-dom';

const TodoLayout: React.FC = () => {
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