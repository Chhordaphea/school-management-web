import { useRouter } from "next/router";
import cn from 'clsx'
import { Pagination } from "@/lib/types/auth";
import PreviousIcon from "../icon/PreviousIcon";
import NextIcon from "../icon/NextIcon";

const PaginationComponent = ({data: { total_pages, current_page, size, first, last, total_elements }}: { data: Pagination}) => {
    const router = useRouter();

    return (
        <div className="custom_d_flex custom_flex_row custom_alg_itm_ctr custom_ptb20">
            <div className="custom_d_flex custom_alg_itm_ctr custom_comp_blk6">
                <span className="custom_lbl custom_mg0">Page</span>
                <div className="custom_ml20">
                    <select defaultValue={size} className="custom_select"  onChange={(e) => {
                        e.preventDefault()
                        router.push({
                            pathname: router.pathname,
                            query:{
                                ...router.query,
                                page_size: e.target.value,
                                page_number: 0,
                            }
                        })
                    }}>
                        {[10, 25, 50, 100].map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="custom_ml25">
                    <div className="custom_lbl custom_mg0">
                        {last ? total_elements : (current_page + 1) * size} {"of"}{" "}
                        {total_elements}
                    </div>
                </div>
            </div>
            <div className="custom_d_flex custom_alg_itm_ctr">
                <div className="">
                    <span title="previous">
                        <a onClick={async() => {
                            router.push({
                                pathname: router.pathname,
                                query:{
                                    ...router.query,
                                    page_number: current_page - 1,
                                }
                            })
                        }} className={cn("custom_wth24 custom_hgt24 custom_prev_svg custom_ml20", {['disabled-page']: first})}>
                            <PreviousIcon/>
                        </a>
                    </span>
                    <span title="next">
                        <a onClick={async () => {
                            await router.push({
                                pathname: router.pathname,
                                query:{
                                    ...router.query,
                                    page_number: current_page + 1
                                }
                            })
                        }} className={cn("custom_wth24 custom_hgt24 custom_nx_svg custom_ml20", {['disabled-page']: last})}>
                            <NextIcon/>
                        </a>
                    </span>
                
                </div>
            </div>
        </div>
    );
};

export default PaginationComponent;
