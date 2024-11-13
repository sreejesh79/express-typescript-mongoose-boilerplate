export interface IUserBodyPayloadDTO {
    fullname: string;
    email: string;
    password: string;
}

export interface IUserIDPayloadDTO {
    _id: string;
    email?: string;
    fullname: string;
    roles: string[];
}

export interface IRoleBodyPayloadDTO {
    name: string
}