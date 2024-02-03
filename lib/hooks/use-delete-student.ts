import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import studentService from "@/service/student.service";
import { useResetRowSelectStore } from "../store";

const useDeleteStudent = () => {
    const queryClient = useQueryClient()
    const {setRow,resetRow} = useResetRowSelectStore(state => state);
    const mutation = useMutation((req: any) => studentService.deleteStudents(req),{
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            toast.success('Success')
            resetRow(true)
            queryClient.invalidateQueries(['students'])
        }
    })

    return {
        mutation: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess,
    }
}
export default useDeleteStudent;