import { FC } from 'react';
import style from "./Task.module.css"
import { TaskTypes } from '../../typesInterface/typesInterface';
import TaskCard from '../TaskCard/TaskCard';

interface TaskProps {
    taskList: TaskTypes[]
};

const Task: FC<TaskProps> = ({ taskList }) => {

    // console.log('taskList:', taskList);

    const todoTask = taskList.filter((task) => task.state === "todo");
    const progressTask = taskList.filter((task) => task.state === "in-progress");
    const doneTask = taskList.filter((task) => task.state === "done");

    console.log('todoTask, :', todoTask,);
    console.log('progressTask, :', progressTask,);
    console.log('doneTask:', doneTask);

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
                    <h1>• Todo {todoTask ? todoTask.length : ""}</h1>
                    <div className={style.todo_card_list}>
                        {
                            !todoTask ?
                                ""
                                :
                                todoTask.map((task, index) => (
                                    <TaskCard key={index} task={task} />
                                ))
                        }
                    </div>
                </div>

                <div
                    id='in-progress'
                    className={style.todo_progress_done}
                >
                    <h1>• In-Progress {progressTask ? progressTask.length : ""}</h1>
                    <div className={style.todo_card_list}>
                        {
                            !progressTask ?
                                ""
                                :
                                progressTask.map((task, index) => (
                                    <TaskCard key={index} task={task} />
                                ))
                        }
                    </div>
                </div>
                <div
                    id='done'
                    className={style.todo_progress_done}
                >
                    <h1>• Done {doneTask ? doneTask.length : ""}</h1>
                    <div className={style.todo_card_list}>
                        {
                            !doneTask ?
                                ""
                                :
                                doneTask.map((task, index) => (
                                    <TaskCard key={index} task={task} />
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;