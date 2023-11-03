import { FC } from 'react';
import style from "./TaskCard.module.css"
import { TaskTypes } from '../../typesInterface/typesInterface';

interface TaskCardProps {
    task: TaskTypes
};

const TaskCard: FC<TaskCardProps> = ({ task }) => {
    return (
        <div className={style.task_card}>
            <p className={style.todo_card_title}>
                {task.title}
            </p>
            <p
                className={style.todo_card_description}
                title={task.description}
            >
                {task.description}
            </p>
            <p>
                Status: <button>{task.state}</button>
            </p>
        </div>
    );
};

export default TaskCard;