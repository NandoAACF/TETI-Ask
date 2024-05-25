import Button from "@/components/Button";
import Input from "@/components/Input";
import { register, useProtectedRoute } from "@/services/admin";
import Head from "next/head";
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
      // Handle password mismatch error
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
    <>
      <Head>
        <title>Unlock Your Admin Powers at TETI Ask!</title>
      </Head>
      <div className="registration-portal">
        <div className="portal-background">
          {/* Add an engaging background image or animation here */}
        </div>
        <div className="portal-overlay flex flex-col items-center justify-center min-h-screen relative">
          <img
            src="/assets/images/Login/logo_teti_ask_transparent.png" // Use transparent logo
            alt="TETI Ask Logo"
            className="portal-logo max-w-[200px] md:max-w-[300px] lg:max-w-[340px]"
          />
          <h1 className="portal-title text-center max-w-[600px] md:text-[48px] lg:text-[50px]">
            Level Up to TETI Ask Admin
          </h1>
          <form onSubmit={handleRegister} className="flex flex-col items-center justify-center w-full md:w-3/4 lg:w-1/2">
            <div className="input-group flex flex-col gap-4 w-full md:w-3/4 lg:w-2/3">
              <Input label="Name" type="text" className="w-full" name="name" error="nameError" />
              <Input label="Email" type="email" className="w-full" name="email" error="emailError" />
              <Input
                label="Password"
                type="password"
                className="w-full"
                name="password"
                error="passwordError"
              />
              <Input
                label="Confirm Password"
                type="password"
                className="w-full"
                name="confirmPassword"
                error="passwordError"
              />
            </div>
            <Button text="Join the Admin Force" type="login" size="md" className="w-full mt-[30px] lg:mt-[40px]" />
          </form>
          <h3 className="login-link text-center mt-[30px] mx-[20px] sm:mx-0">
            Already a TETI Ask Hero?{" "}
            <span onClick={() => router.push("/login")} className="text-link underline cursor-pointer">
              Login Here
            </span>
          </h3>

          {/* Added Ornamentation Elements */}
          <div className="portal-ornament top-0 left-0 w-full h-[100px] bg-gradient-to-r from-[#c92929] to-[#b83636] to-[#540b0b] opacity-20 absolute"></div>
          <div className="portal-ornament bottom-0 right-0 w-full h-[100px] bg-gradient-to-l from-[#c92929] to-[#b83636] to-[#540b0b] opacity-20 absolute"></div>
        </div>
      </div>
    </>
  );
}
