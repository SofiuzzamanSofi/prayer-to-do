import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftMenu from '../Component/LeftMenu/LeftMenu';
import Task from '../Component/Task/Task';
import style from "./TodoLayout.module.css";
import menuClosed from "../assets/menu-closed.svg"

const TodoLayout: React.FC = () => {

    // const taskInfo = useContext(TaskContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    return (
        <section className={style.layout_menu}>
            <aside
                className={`${style.lef_menu} ${mobileMenuOpen ? style.lef_menu_position_show : style.lef_menu_position_hide}`}
            >
                <LeftMenu setMobileMenuOpen={setMobileMenuOpen} />
            </aside>

            {/* // scrollbar color not working  */}
            <aside className={style.right_main_view_menu}>
                {/* {
                    !taskInfo?.taskList ?
                        ""
                        : */}
                <Task />
                {/* } */}
            </aside>

            <button
                className={`${style.closed_button_image} ${mobileMenuOpen ? style.closed_button_image_hide : ""}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <img src={menuClosed} alt="menu-closed-button" />
            </button>
            <Outlet />
        </section>
    );
};

export default TodoLayout;