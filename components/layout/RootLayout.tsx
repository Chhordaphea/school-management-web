import NavBar from "./NavBar";
import Sidebar from "./Sidebar";


function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="custom_w100 custom_d_flex custom_alg_itm_strect custom_jt_cont_spc_around">
            <div className="custom_h100vh custom_col2 custom_sb_bg_clr custom_brd_rgt">
                <Sidebar/>
            </div>
            <div className="custom_col10 custom_wht_bg_clr custom_d_flex custom_flex_col custom_h100vh">
                <NavBar />
                {children}
            </div>
        </div>
    );
}

export default RootLayout;