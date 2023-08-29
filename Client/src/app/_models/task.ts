export class Task {
    id?: number;
    taskName?:"string";
    taskStatus : 'TODO' | 'Pending' | 'Done'|undefined | string;
    startDate?: Date;
    deadline?: Date;
    project?:number;
}