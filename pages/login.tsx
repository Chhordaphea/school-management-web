import LoginForm from "@/components/layout/LoginForm";
import Head from "next/head";

function Login() {

    return (
        <div>
            <Head>
                <title>Log in Pgae</title>
            </Head>
            <main>
                <LoginForm />
            </main>
        </div>
    );
}
export default Login;
Login.getLayout = (page: any) => page;

