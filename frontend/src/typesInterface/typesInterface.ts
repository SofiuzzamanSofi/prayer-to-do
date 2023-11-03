export interface TaskTypes {
    _id: string;
    slNo: number;
    title: string;
    description: string;
    state: "todo" | "in-progress" | "done";
};
export interface EditTaskTypes {
    state: string;
    _id?: string | undefined;
    slNo?: number | undefined;
    title?: string | undefined;
    description?: string | undefined;
}

export interface TaskInfoTypes {
    taskList: TaskTypes[] | undefined;
    loading: boolean;
};