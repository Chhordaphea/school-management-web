import profileService from "@/service/profile.service";
import {useQueries } from "@tanstack/react-query";

    const useFetchProfile = () => {
        const [profileQuery] = useQueries({
            queries: [
                {
                    queryKey: ["profile"],
                    queryFn: () => profileService.getAccountProfile(),
                    retry: 2
                }
            ]
        })
    
        return {
            profileQuery,
            isLoading: profileQuery?.isLoading,
            isError: profileQuery.isError
        };
    }
export default useFetchProfile;