import React, { FC, useState, useContext } from 'react';
import style from "./Task.module.css"
import { TaskTypes } from '../../typesInterface/typesInterface';
import TaskCard from '../TaskCard/TaskCard';
import toast from 'react-hot-toast';
import { TaskContext } from '../../context/TaskProvider';
import LoadingPage from '../LoadingPage/LoadingPage';
import menuClosed from "../../assets/menu-closed.svg"

interface TaskProps {
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mobileMenuOpen: boolean;
}

const Task: FC<TaskProps> = ({ setMobileMenuOpen, mobileMenuOpen }) => {

    const taskInfo = useContext(TaskContext);

    const [grabElementDiv, setGrabElementDiv] = useState<HTMLDivElement | null>(null);
    const [grabElementData, setGrabElementData] = useState<TaskTypes | null>(null);

    const todoTask = taskInfo?.taskList?.filter((task) => task.state === "todo");
    const progressTask = taskInfo?.taskList?.filter((task) => task.state === "in-progress");
    const doneTask = taskInfo?.taskList?.filter((task) => task.state === "done");

    // drag start 
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: TaskTypes) => {
        // e.preventDefault();
        const selected = e.target as HTMLDivElement
        e.currentTarget.classList.add("dragged");
        setGrabElementDiv(selected);
        setGrabElementData(task);
    };

    // dragOver || draging 
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // drop and edit the data of mongodb 
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, statusName: "todo" | "in-progress" | "done") => {
        e.preventDefault();
        if (statusName !== grabElementData?.state) {
            const newData = { ...grabElementData, state: statusName };

            //edit mongodb data
            const modifyTask = await taskInfo?.modifyTask(newData);
            if (modifyTask === true) {
                e.currentTarget.appendChild(grabElementDiv!);
                toast.success("edit success");
            }
            else {
                toast.error("Update task failed, Try again later.");
            }
        }
        else {
            e.currentTarget.appendChild(grabElementDiv!);
            toast.success("edit success")
        }
    };

    // drag end 
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("dragged");
        setGrabElementDiv(null);
        setGrabElementData(null);
    };

    if (taskInfo?.loading) {
        return <LoadingPage />
    }

    return (
        <div>
            <div className={style.task_h1_tag}>
                <h1>Task</h1>
                {/* //mobile menu button  */}
                <button
                    className={`${style.closed_button_image} ${mobileMenuOpen ? style.closed_button_image_hide : ""}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <img src={menuClosed} alt="menu-closed-button" />
                </button>
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