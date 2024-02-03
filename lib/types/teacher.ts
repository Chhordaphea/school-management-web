import { Pagination } from "./auth";


export interface TeacherResponse {
    teacher_lists: Teacher[];
    pagination: Pagination;
}

export interface Teacher {
    id:            number;
    name:         string;
    username:     string;
    gender:        string;
    email:         string;
    phone_number:   string;
    profile_image: string;
    creaed_at:     any;

}
