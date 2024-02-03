import React from 'react'

const ErrorMessage = ({ message }: { message: any }) => {
    return (
        <>
            {
                message &&
                <div className='custom_d_flex custom_alg_itm_ctr custom_gap_6rem custom_mt5'>               
                    <label style={{color:"red",marginLeft:"5px"}}>{message}</label>
                </div>
            }
        </>
    )
}

export default ErrorMessage