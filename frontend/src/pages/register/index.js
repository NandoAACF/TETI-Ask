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
        <div className="portal-overlay">
          <img
            src="/assets/images/Login/logo_teti_ask_transparent.png" // Use transparent logo
            alt="TETI Ask Logo"
            className="portal-logo"
          />
          <h1 className="portal-title">Level Up to TETI Ask Admin</h1>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <Input label="Name" type="text" className="w-full" name="name" error="nameError" />
              <Input label="Email" type="email" className="w-full" name="email" error="emailError" />
            </div>
            <div className="input-group">
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
          <h3 className="login-link">
            Already a TETI Ask Hero?{" "}
            <span onClick={() => router.push("/login")} className="text-link underline cursor-pointer">
              Login Here
            </span>
          </h3>
        </div>
      </div>
    </>
  );
}
