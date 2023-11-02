export interface TaskTypes {
    _id: string;
    slNo: number;
    title: string;
    description: string;
    state: "todo" | "in-progress" | "done";
};

export interface TaskInfoTypes {
    taskList: TaskTypes[] | undefined;
    loading: boolean;
};