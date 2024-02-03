import { Pagination } from "./auth";


export interface StudentResponse {
    student_list: Student[];
    pagination: Pagination;
}

export interface Student {
    id:            number;
    name:         string;
    username:     string;
    gender:        string;
    email:         string;
    phone_number:   string;
    profile_image: string;
    creaed_at:     any;

}
