export class Task {
    taskId!: string;
    title!: string;
    description!: string;
    dueDate!: Date;
    status!: string;
    category!: string;
    attachment!: string;
    createdAt!: Date;
    updateMessage!: string;

    constructor(data?: Partial<Task>) {
        Object.assign(this, data);
    }
}