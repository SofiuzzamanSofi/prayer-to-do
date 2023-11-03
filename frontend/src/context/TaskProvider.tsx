import axios from 'axios';
import { FC, createContext, useEffect, useState, ReactNode } from 'react';
import { TaskInfoTypes, TaskTypes } from '../typesInterface/typesInterface';

interface TaskProviderProps {
    children: ReactNode
}

export const TaskContext = createContext<TaskInfoTypes | undefined>(undefined);

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
    const [taskList, setTaskList] = useState<TaskTypes[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [reloadData, setreloadData] = useState<boolean>(true);

    // console.log('taskList:', taskList);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log('fetch-data-effect-call:');
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-task`);
                setTaskList(response.data.data);
                setLoading(false);
            } catch (error) {
                // Handle error
            }
        };
        fetchData();
    }, []);

    const taskInfo: TaskInfoTypes = { taskList, loading };

    return (
        <TaskContext.Provider value={taskInfo}>
            {children}
        </TaskContext.Provider>
    );
};