import classService from "@/service/class.service";
import {useQueries } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

    const useFetchClass= () => {
        const params = useSearchParams();
        const pageSize = params.get("page_size") || 10;
    
        let requestParams = {
            page_size: +pageSize > 100 ? 100 : pageSize,
            page_number: params.get("page_number") || 0,
            search_value: params.get("search_value") || "",
            sort_columns: params.get("sort_columns") || "",
        }

        const [classQuery] = useQueries({
            queries: [
                {
                    queryKey: ["classes", { requestParams }],
                    queryFn: () => classService.getClasses(requestParams),
                }
            ]
        })
    
        return {
           classQuery,
           isError: classQuery.isError,
              isLoading: classQuery.isLoading,
        };
    }
export default useFetchClass;