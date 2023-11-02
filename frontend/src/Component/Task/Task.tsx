import { FC } from 'react';
import style from "./Task.module.css"

interface TaskProps {

};

const Task: FC<TaskProps> = ({ }) => {



    return (
        <div>
            <div className={style.task_h1_tag}>
                <h1>Task</h1>
            </div>
            <div className={style.task_all_tasks}>
                <div id='todo'>
                    todo
                </div>

                <div id='in-progress'>
                    doing
                </div>
                <div id='done'>
                    done
                </div>
            </div>
        </div>
    );
};

export default Task;