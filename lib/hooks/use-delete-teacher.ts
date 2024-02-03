import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import { useResetRowSelectStore } from "../store";
import teacherService from "@/service/teacher.service";

const useDeleteTeacher = () => {
    const queryClient = useQueryClient()
    const {setRow,resetRow} = useResetRowSelectStore(state => state);
    const mutation = useMutation((req: any) => teacherService.deleteTeachers(req),{
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            toast.success('Success')
            resetRow(true)
            queryClient.invalidateQueries(['teachers'])
        }
    })

    return {
        mutation: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
    }
}
export default useDeleteTeacher;