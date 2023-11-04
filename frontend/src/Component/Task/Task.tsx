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

    const [gragElementDiv, setgragElementDiv] = useState<HTMLDivElement | null>(null);
    const [gragElementData, setgragElementData] = useState<TaskTypes | null>(null);

    const todoTask = taskInfo?.taskList?.filter((task) => task.state === "todo");
    const progressTask = taskInfo?.taskList?.filter((task) => task.state === "in-progress");
    const doneTask = taskInfo?.taskList?.filter((task) => task.state === "done");

    // drag start 
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: TaskTypes) => {
        // e.preventDefault();
        const selected = e.target as HTMLDivElement
        e.currentTarget.classList.add("dragged");
        setgragElementDiv(selected);
        setgragElementData(task);
        // console.log('selected:', selected);
    };

    // dragOver || draging 
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // drop and edit the data of mongodb 
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, statusName: "todo" | "in-progress" | "done") => {
        e.preventDefault();
        if (statusName !== gragElementData?.state) {
            const newData = { ...gragElementData, state: statusName };
            const modifyTask = taskInfo?.modifyTask(newData);
            if (modifyTask) {
                toast.success("edit success");

                // after mongodb modify data work locally
                const elementModifyDiv = document.createElement('div');
                elementModifyDiv.draggable = true;
                elementModifyDiv.classList.add("task_card");

                elementModifyDiv.addEventListener('dragstart', (e: Event) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, newData));
                elementModifyDiv.addEventListener('dragend', (e: Event) => handleDragEnd(e as unknown as React.DragEvent<HTMLDivElement>));

                elementModifyDiv.innerHTML = `
                    <p class="todo_card_title">
                        ${newData.title}
                    </p>
                    <p class="todo_card_description" title="${newData.description}">
                        ${newData.description}
                    </p>
                    <p>
                        Status: <button>${newData.state}</button>
                    </p>
                `;
                setgragElementDiv(elementModifyDiv)
                e.currentTarget.appendChild(gragElementDiv!);
            }
            else {
                toast.error("Update task failed, Try again later.");
            }
        }
        else {
            e.currentTarget.appendChild(gragElementDiv!);
            toast.success("edit success")
        }
    };

    // drag end 
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("dragged");
        setgragElementDiv(null);
        setgragElementData(null);
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