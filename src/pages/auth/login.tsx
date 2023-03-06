import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";
import { SecureStorage } from "@/utils/storage";
import { LoginForm, loginValidationSchema } from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const mlAtName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
const mlAtExpiresAtName = import.meta.env.VITE_ACCESS_TOKEN_EXPIRES_AT_NAME;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors: formErrors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginValidationSchema) });

  const login = async (data: LoginForm) => {
    setLoading(true);

    try {
      const {
        data: { data: response },
      } = await AuthService.instance().authLogin(data);
      SecureStorage.instance().setItem(mlAtName, response.accessToken);
      SecureStorage.instance().setItem(mlAtExpiresAtName, response.expiresAt);

      // Fetch user data
      const {
        data: { data: user },
      } = await AuthService.instance().authUser();
      setUser(user);

      navigate("/loans");
    } catch (error) {
      if (isAxiosError(error) && error?.response) {
        const { data, status } = error.response;

        if (status === 422) {
          for (const [key, value] of Object.entries(data.errors)) {
            const err = (value as Array<string>)[0];

            if (key === "email") {
              setError("email", {
                type: "manual",
                message: err,
              });
            }
            if (key === "password") {
              setError("password", {
                type: "manual",
                message: err,
              });
            }
          }
        } else {
          setError("email", {
            type: "manual",
            message: data.message,
          });
        }
      } else {
        setError("email", {
          type: "manual",
          message: (error as Error).message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto my-auto w-full max-w-sm xl:container-fluid">
        <h4 className="mb-10 text-2xl font-semibold">Sign in</h4>

        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              type="text"
              name="email"
              id="email"
              className="form-input"
            />
            {formErrors?.email?.message && (
              <ErrorMessage message={formErrors?.email?.message} />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              name="password"
              id="password"
              className="form-input"
            />
            {formErrors?.password?.message && (
              <ErrorMessage message={formErrors?.password?.message} />
            )}
          </div>

          <div className="pt-4">
            <Button
              block
              loading={loading}
              variant="primary"
              size="md"
              type="submit"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
