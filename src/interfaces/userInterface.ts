export interface IUser {
    name: string;
    email: string;
    pass: string;
    isDeleted?: boolean;
    dateofCreated?: Date;
    dateUpated: Date;
}