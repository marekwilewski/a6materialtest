export class GenderType {
    id: number;
    name: string;
}

export class MaritalStatus {
    id: number;
    name: string;
}

export class Client {
    id: number;
    firstName: string;
    lastName: string;
    pesel?: string;
    nip?: string;
    birthDate?: Date;
    gender?: GenderType;
    maritalStatus?: MaritalStatus;
}

export interface PagedResponse {
    content: any;
    first: Boolean;
    last: Boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}
