import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftMenu from '../Component/LeftMenu/LeftMenu';
import Task from '../Component/Task/Task';
import style from "./TodoLayout.module.css"

const TodoLayout: React.FC = () => {

    // console.log(import.meta.env.VITE_BACKEND_URL);

    return (
        <section className={style.layout_menu}>
            <aside className={style.lef_menu}>
                <LeftMenu />
            </aside>
            <aside className={style.right_main_view_menu}>
                <Task />
            </aside>

            <Outlet />
        </section>
    );
};

export default TodoLayout;