import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/router";

export default function Login() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen overflow-hidden relative my-[50px] lg:my-0">
            <div className="flex flex-col items-center justify-center w-full h-full lg:ml-[50px] lg:-mt-[40px]">
                <h1 className="text-[50px] md:text-[64px] font-bold text-center mx-[30px] md:mx-0">
                    Login{" "}
                    <span className="bg-gradient-to-r from-[#c92929] via-[#b83636] to-[#540b0b] text-transparent bg-clip-text">
                        Admin
                    </span>
                </h1>
                <img
                    src="/assets/images/Login/logo_teti_ask.png"
                    className="w-[200px] md:w-[300px] lg:w-[340px] mt-[10px] md:mt-[30px]"
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full mt-[40px] md:mt-[40px]">
                <form className="flex flex-col items-start justify-center w-full h-full gap-[14px] px-[16%] md:px-[18%] relative">
                    <Input label="Email" type="email" className="w-full" name="email" error="emailError" />
                    <Input label="Password" type="password" className="w-full" name="password" error="passwordError" />
                    <h5
                        onClick={() => router.push("/forgot-password")}
                        className="text-[14px] underline cursor-pointer hover:text-[#c92929] hover:scale-110 transition-all ease-in-out duration-300"
                    >
                        Forgot Password?
                    </h5>
                    <Button text="Login" type="login" size="md" className="w-full mt-[30px] lg:mt-[40px]" />
                </form>
                <h3 className="text-[17px] sm:text-[19px] text-center mt-[30px] mx-[20px] sm:mx-0">
                    Don&apos;t have an account?{" "}
                    <span
                        onClick={() => router.push("/register")}
                        className="underline cursor-pointer text-[#c92929] hover:text-[#ab2424]"
                    >
                        Register
                    </span>
                </h3>
            </div>
        </div>
    );
}