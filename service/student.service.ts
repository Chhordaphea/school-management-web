import { http } from "@/utils/http";

const ServiceId = {
    STUDENT: '/api/bo/v1/students'
}

function getStudentList(param: any){
    return http.get(ServiceId.STUDENT, { params: { ...param }}).then(res => res?.data?.data);
}
async function createStudent(reqBody: any) {
    return await http.post(ServiceId.STUDENT,reqBody);
}

async function deleteStudents(reqBody: any) {
    return await http.delete(ServiceId.STUDENT, { data: { student_ids: reqBody } });
}

async function updateStudent(reqBody: any,id: any) {
    return await http.patch(ServiceId.STUDENT + `/${id}`, reqBody);
}

function searchStudent(param: any){
    return http.get(ServiceId.STUDENT, { params: { search_value: param } }).then(res => res?.data?.data);
}




export const studentService = {
    getStudentList,
    createStudent,
    deleteStudents,
    updateStudent,
    searchStudent
}

export default studentService;

