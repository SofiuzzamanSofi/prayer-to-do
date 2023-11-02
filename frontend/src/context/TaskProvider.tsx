import axios from 'axios';
import { FC, createContext, useEffect, useState, ReactNode } from 'react';
import { TaskInfoTypes, TaskTypes } from '../typesInterface/typesInterface';

interface TaskProviderProps {
    children: ReactNode
}

const TaskContext = createContext<TaskInfoTypes | undefined>(undefined);

const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
    const [taskList, setTaskList] = useState<TaskTypes[]>();
    const [loading, setLoading] = useState<boolean>(true);

    console.log('taskList:', taskList);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

export default TaskProvider;

// ... (your interface definitions remain the same)
