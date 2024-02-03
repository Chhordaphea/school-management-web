import teacherService from "@/service/teacher.service";
import {useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

    const useFetchTeacher = () => {
        const params = useSearchParams();
        const pageSize = params.get("page_size") || 10;
    
        let requestParams = {
            page_size: +pageSize > 100 ? 100 : pageSize,
            page_number: params.get("page_number") || 0,
            search_value: params.get("search_value") || "",
            sort_columns: params.get("sort_columns") || "",
        }

        const teacherQuery = useQuery(['teachers',{requestParams}], () => teacherService.getTeacherList(requestParams))
    
        return {
            teacherQuery,
            isLoading: teacherQuery?.isLoading,
            isError: teacherQuery.isError
        };
    }
export default useFetchTeacher;