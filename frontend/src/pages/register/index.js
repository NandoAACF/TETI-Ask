import Button from "@/components/Button";
import Input from "@/components/Input";
import { register, useProtectedRoute } from "@/services/admin";
import { router } from "next/router";
import { toast } from "react-toastify";

export default function Register() {
    useProtectedRoute();
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newAdmin = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
        };
        if (newAdmin.password != form.confirmPassword.value) {
        }
        try {
            const res = await register(newAdmin);
            router.replace("/admin-dashboard");
            toast.success(res.data);
        } catch (error) {
            toast.error("Failed to register : " + error.response.data);
        }
    };
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen overflow-hidden relative my-[50px] lg:my-0">
            <div className="flex flex-col items-center justify-center w-full h-full lg:ml-[50px] lg:-mt-[40px]">
                <h1 className="text-[50px] md:text-[64px] font-bold text-center mx-[30px] md:mx-0">
                    Register{" "}
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
                <form
                    className="flex flex-col items-start justify-center w-full h-full gap-[14px] px-[16%] md:px-[18%] relative"
                    onSubmit={handleRegister}
                >
                    <Input label="Name" type="text" className="w-full" name="name" error="nameError" />
                    <Input label="Email" type="email" className="w-full" name="email" error="emailError" />
                    <Input label="Password" type="password" className="w-full" name="password" error="passwordError" />
                    <Input
                        label="Confirm Password"
                        type="password"
                        className="w-full"
                        name="confirmPassword"
                        error="passwordError"
                    />
                    <Button text="Register" type="login" size="md" className="w-full mt-[30px] lg:mt-[40px]" />
                </form>
                <h3 className="text-[17px] sm:text-[19px] text-center mt-[30px] mx-[20px] sm:mx-0">
                    Already have an account?{" "}
                    <span
                        onClick={() => router.push("/login")}
                        className="underline cursor-pointer text-[#c92929] hover:text-[#ab2424]"
                    >
                        Login
                    </span>
                </h3>
            </div>
        </div>
    );
}
