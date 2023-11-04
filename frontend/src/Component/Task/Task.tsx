import React, { FC, useState, useContext } from 'react';
import style from "./Task.module.css"
import { TaskTypes, EditTaskTypes } from '../../typesInterface/typesInterface';
import TaskCard from '../TaskCard/TaskCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TaskContext } from '../../context/TaskProvider';
import LoadingPage from '../LoadingPage/LoadingPage';
interface TaskProps {
    taskList: TaskTypes[]
};

const Task: FC<TaskProps> = ({ taskList }) => {

    const taskInfo = useContext(TaskContext);

    const [gragElementDiv, setgragElementDiv] = useState<HTMLDivElement | null>(null);
    const [gragElementData, setgragElementData] = useState<TaskTypes | null>(null);

    const todoTask = taskInfo?.taskList?.filter((task) => task.state === "todo");
    const progressTask = taskInfo?.taskList?.filter((task) => task.state === "in-progress");
    const doneTask = taskInfo?.taskList?.filter((task) => task.state === "done");

    // modify task function
    // const modifyTask = async (data: EditTaskTypes) => {
    //     try {
    //         const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/patch-task`, data);
    //         console.log('response.data:', response.data);
    //         toast.success("edit success")
    //         if (response.data?.success) {

    //         };
    //     } catch (error) {
    //         toast.error("Update task failed, Try again later.")
    //     }
    // };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: TaskTypes) => {
        // e.preventDefault();
        let selected = e.target as HTMLDivElement;
        e.currentTarget.classList.add("dragged");
        setgragElementDiv(selected);
        setgragElementData(task);
        console.log('selected:', selected);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("dragged");
        setgragElementDiv(null);
        setgragElementData(null);
        console.log("handleDragEnd");
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log('e.target:', e.target);
        // e.currentTarget.appendChild
        console.log("handleDragOver");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, statusName: string) => {
        e.preventDefault();
        // console.log('handleDrop:', e.target);
        // console.log('handleDrop-statusName:', statusName, "data-statusName", gragElementData?.state);

        console.log('handleDropData:', gragElementData);
        if (statusName !== gragElementData?.state) {
            // console.log('NOT_MATCH_handleDrop-statusName:', statusName, "data-statusName", gragElementData?.state);
            const newData = { ...gragElementData, state: statusName };
            if (gragElementData && newData) {

                const modifyTask = taskInfo?.modifyTask(newData);
                if (modifyTask) {
                    toast.success("edit success")
                }
                else {
                    toast.error("Update task failed, Try again later.");
                }
                e.currentTarget.appendChild(gragElementDiv!);
            }
        }
        else {
            e.currentTarget.appendChild(gragElementDiv!);
        }
    };

    console.log('taskInfo:', taskInfo);
    if (taskInfo?.loading) {
        return <LoadingPage />
    }

    return (
        <div>
            <div className={style.task_h1_tag}>
                <h1>Task</h1>
            </div>
            <div className={style.task_all_tasks}>
                <div
                    id='todo'
                    className={style.todo_progress_done}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "todo")}
                >
                    <h1>• Todo {todoTask ? todoTask.length : ""}</h1>
                    <div className={style.todo_card_list}>
                        {
                            !todoTask ?
                                ""
                                :
                                todoTask.map((task, index) => (
                                    <TaskCard
                                        key={index}
                                        task={task}
                                        handleDragStart={handleDragStart}
                                        handleDragEnd={handleDragEnd}
                                    />
                                ))
                        }
                    </div>
                </div>

                <div
                    id='in-progress'
                    className={style.todo_progress_done}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "in-progress")}
                >
                    <h1>• In-Progress {progressTask ? progressTask.length : ""}</h1>
                    <div className={style.todo_card_list}>
                        {
                            !progressTask ?
                                ""
                                :
                                progressTask.map((task, index) => (
                                    <TaskCard
                                        key={index}
                                        task={task}
                                        handleDragStart={handleDragStart}
                                        handleDragEnd={handleDragEnd}
                                    />
                                ))
                        }
                    </div>
                </div>
                <div
                    id='done'
                    className={style.todo_progress_done}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "done")}
                >
                    <h1>• Done {doneTask ? doneTask.length : ""}</h1>
                    <div className={style.todo_card_list}>
                        {
                            !doneTask ?
                                ""
                                :
                                doneTask.map((task, index) => (
                                    <TaskCard
                                        key={index}
                                        task={task}
                                        handleDragStart={handleDragStart}
                                        handleDragEnd={handleDragEnd}
                                    />
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;