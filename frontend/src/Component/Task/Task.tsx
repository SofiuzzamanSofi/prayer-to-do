import { FC } from 'react';
import style from "./Task.module.css"

interface TaskProps {

};

const Task: FC<TaskProps> = ({ }) => {

    console.log(':',);

    return (
        <div>
            <div className={style.task_h1_tag}>
                <h1>Task</h1>
            </div>
            <div className={style.task_all_tasks}>
                <div
                    id='todo'
                    className={style.todo_progress_done}
                >
                    todo
                </div>

                <div
                    id='in-progress'
                    className={style.todo_progress_done}
                >
                    doing
                </div>
                <div
                    id='done'
                    className={style.todo_progress_done}
                >
                    done
                </div>
            </div>
        </div>
    );
};

export default Task;