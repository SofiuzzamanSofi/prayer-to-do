import { FC } from 'react';
import style from "./Task.module.css"
import { TaskTypes } from '../../typesInterface/typesInterface';

interface TaskProps {
    taskList: TaskTypes[]
};

const Task: FC<TaskProps> = ({ taskList }) => {

    console.log('taskList:', taskList);

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
                    <h1>• Todo</h1>
                    <div className={style.todo_card_list}>
                        {
                            !taskList ?
                                ""
                                :
                                taskList.map((task, index) => (
                                    <div key={index} className={style.task_card}>
                                        <p className={style.todo_card_title}>
                                            {task.title}
                                        </p>
                                        <p
                                            className={style.todo_card_description}
                                            title={task.description}
                                        >
                                            {task.description}
                                        </p>
                                        <p className={style.todo_card_state}>
                                            Status: <button>{task.state}</button>
                                        </p>
                                    </div>
                                ))
                        }
                    </div>
                </div>

                <div
                    id='in-progress'
                    className={style.todo_progress_done}
                >
                    <h1>• In-Progress</h1>
                    <div className={style.task_card}>
                        in-progress
                    </div>
                </div>
                <div
                    id='done'
                    className={style.todo_progress_done}
                >
                    <h1>• Done</h1>
                    <div className={style.task_card}>
                        done
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;