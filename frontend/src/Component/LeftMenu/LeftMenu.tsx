import { FC } from 'react';
import menuClosed from "../../assets/menu-closed.svg"
import style from "./LeftMenu.module.css"


interface LeftMenuProps {

};

const LeftMenu: FC<LeftMenuProps> = ({ }) => {
    return (
        <div>
            LeftMenu

            <div>
                <button>
                    <img src={menuClosed} alt="" />
                </button>
            </div>
        </div>
    );
};

export default LeftMenu;