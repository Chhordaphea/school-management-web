import { useReducer, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import cn from "clsx";

function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const [loginRequest, dispatch] = useReducer((state: any, action: any) => {
    return { ...state, ...action }
  }, {
    username: '',
    password: '',
    loginError: ''
  })

  function checkError(result: any) {

    if (result?.error == "User role is not active" && result?.status == 401) {
      dispatch({ loginError: result?.error! })
      dispatch({ usernameError: true, passwordError: false })
      return;
    } else if (result?.error == "User not found" && result?.status == 401) {
      dispatch({ loginError: result?.error! })
      dispatch({ usernameError: true, passwordError: false })
      return;
    }
    else if (result?.error == "Password is incorrect" && result?.status == 401) {
      dispatch({ loginError: result.error! })
      dispatch({ usernameError: false, passwordError: true })
      return;
    }
    else {
      dispatch({ loginError: result?.error! })
      return;
    }
  }

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    if (loginRequest.submitting) return;

    dispatch({ submitting: true })

    const toastId = toast.loading('Logging...')

    try {
      const result = await signIn("credentials", {
        username: loginRequest.username.replace(/\s/g, ''),
        password: loginRequest.password,
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.ok) {
        if (result?.ok) {
          toast.success('Logged in successfully')
          router.push(result?.url!)
          return;
        }
      }
      toast.error('Login failed')
      checkError(result);
    } catch (e) {
      console.log('error', e)
    } finally {
      toast.dismiss(toastId)
      dispatch({ submitting: false })
    }
  }


  function handleChange(e: any) {
    dispatch({ loginError: '' })
    dispatch({ [e.target.name]: e.target.value })
  }

  return (
    <>
      <section className="custom_w100 custom_h100vh custom_d_flex custom_flex_col custom_jt_cont_st custom_alg_itm_strect custom_p23 custom_scrollable">
        <div className="custom_w100 custom_d_flex custom_flex_col custom_jt_cont_st custom_alg_itm_ctr">
          <section className="custom_w100 custom_d_flex custom_flex_col custom_jt_cont_st custom_alg_itm_ctr custom_grid_col_20 custom_grid_rw_20 custom_mt115">
            <Image className="custom_wb_logo_svg custom_ml10 custom_mt5" src="/asset/logo/school_logo.png" width={90} height={70} priority alt="" />
            <span className="custom_fs18 custom_wth250 custom_fw_md">Helps schools to manage their admissions, teachers, students</span>
          </section>
          <div className="custom_mt30 custom_mb30 custom_d_flex custom_flex_col custom_jt_cont_st custom_alg_itm_ctr">
            <form method="post" className="custom_d_flex custom_flex_col custom_jt_cont_st custom_alg_itm_ct" onSubmit={handleClick}>
              <div className="custom_wth310 custom_d_flex custom_flex_col custom_jt_cont_betw custom_alg_itm_start">
                <div className="custom_w100 custom_pos_rlt">
                  <input className={cn("custom_w100 custom_form_inp  custom_mb8", { custom_error: loginRequest.usernameError })}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    value={loginRequest.username}
                    type="text"
                    name="username"
                    maxLength={30}
                  />
                  {/* <svg className="custom_form_svg_inp custom_wth20 custom_hgt20" viewBox="0 0 20 20">
                    <path d="M10 10C10.5933 10 11.1734 9.82405 11.6667 9.49441C12.1601 9.16477 12.5446 8.69623 12.7716 8.14805C12.9987 7.59987 13.0581 6.99667 12.9424 6.41473C12.8266 5.83279 12.5409 5.29824 12.1213 4.87868C11.7018 4.45912 11.1672 4.1734 10.5853 4.05765C10.0033 3.94189 9.40013 4.0013 8.85195 4.22836C8.30377 4.45543 7.83524 4.83994 7.50559 5.33329C7.17595 5.82664 7 6.40666 7 7C7 7.79565 7.31607 8.55871 7.87868 9.12132C8.44129 9.68393 9.20435 10 10 10ZM10 11.5C8 11.5 4 12.505 4 14.5V16H16V14.5C16 12.505 12 11.5 10 11.5Z" />
                  </svg> */}
                </div>

                <div className="custom_w100 custom_pos_rlt">
                  <input className={cn("custom_w100 custom_form_inp  custom_mb8", { custom_error: loginRequest.passwordError })}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    value={loginRequest.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    maxLength={30}
                  />
                  {/* <svg className="custom_form_svg_inp custom_wth20 custom_hgt20" viewBox="0 0 20 20">
                    <path d="M15 6.66597H14.167V4.99997C14.15 3.90613 13.7036 2.86282 12.9241 2.09527C12.1446 1.32773 11.0945 0.897522 10.0005 0.897522C8.90652 0.897522 7.85642 1.32773 7.07689 2.09527C6.29736 2.86282 5.85094 3.90613 5.83399 4.99997V6.66597H4.99999C4.55828 6.66729 4.13504 6.84334 3.8227 7.15568C3.51036 7.46802 3.33431 7.89126 3.33299 8.33297V16.666C3.33431 17.1077 3.51036 17.5309 3.8227 17.8433C4.13504 18.1556 4.55828 18.3317 4.99999 18.333H15C15.4417 18.3317 15.8649 18.1556 16.1773 17.8433C16.4896 17.5309 16.6657 17.1077 16.667 16.666V8.33297C16.6657 7.89126 16.4896 7.46802 16.1773 7.15568C15.8649 6.84334 15.4417 6.66729 15 6.66597ZM9.99999 14.166C9.67029 14.166 9.34799 14.0682 9.07386 13.885C8.79972 13.7019 8.58606 13.4415 8.45989 13.1369C8.33371 12.8323 8.3007 12.4971 8.36502 12.1738C8.42935 11.8504 8.58811 11.5534 8.82125 11.3202C9.05438 11.0871 9.35141 10.9283 9.67478 10.864C9.99814 10.7997 10.3333 10.8327 10.6379 10.9589C10.9425 11.085 11.2029 11.2987 11.3861 11.5728C11.5692 11.847 11.667 12.1693 11.667 12.499C11.6657 12.9407 11.4896 13.3639 11.1773 13.6763C10.8649 13.9886 10.4417 14.1647 9.99999 14.166ZM12.583 6.66597H7.41599V4.99997C7.41599 4.31478 7.68818 3.65766 8.17268 3.17316C8.65718 2.68866 9.31431 2.41647 9.99949 2.41647C10.6847 2.41647 11.3418 2.68866 11.8263 3.17316C12.3108 3.65766 12.583 4.31478 12.583 4.99997V6.66597Z" />
                  </svg> */}
                  {showPassword ?
                    (<div className="custom_pos_abs icon_password" onClick={() => setShowPassword(!showPassword)} >
                      <Image height={18} width={18} src={"/asset/icon/view.png"} alt="show" />
                    </div>)
                    : (<div className="custom_pos_abs icon_password"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      <Image
                        height={18}
                        width={18}
                        src={"/asset/icon/hide.png"}
                        alt="hide"
                      />
                    </div>
                    )}
                </div>

                <button className="custom_w100 custom_btn custom_form_btn_pm custom_mt20" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginForm;