import { Pagination } from "./auth";


export interface StudentResponse {
    class_lists: Class[];
    pagination: Pagination;
}

export interface Class {
    id:            number;
    name:         string;
    creaed_at:     any;
}
