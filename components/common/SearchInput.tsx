import {useState} from "react";
import {useRouter} from "next/router";
import { SearchIcon } from "../icon/SearchIcon";

const SearchInput = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState(router.query?.search_value || '')

    return (
        <form onSubmit={async (e)=> {
            e.preventDefault()
            await router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page_number: 0,
                    search_value: searchValue
                }
            })
        }} className="custom_d_flex custom_flex_col custom_pos_rlt custom_mr10">
            <input style={{
                paddingRight: '38px'
            }} value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} className="custom_inp custom_search_inp" maxLength={256} name="parent_account_no" placeholder={"search"} id="search-2"/>
            <SearchIcon/>
            <svg className="custom_svg_clear_inp custom_cs_pointer" viewBox="0 0 24 24" onClick={async ()=> {
                    setSearchValue('')
                    await router.push({
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            page_number: 0,
                            search_value: ''
                        }
                    })
                }} style={{
                    position: 'absolute',
                    right: '38px',
                    cursor: 'pointer',
                    visibility: searchValue ? 'visible' : 'hidden'
                }}>
                <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" />
            </svg>
        </form>
    )
}
export default SearchInput