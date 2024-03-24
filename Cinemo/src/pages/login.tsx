/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, Fade } from "@mui/material";
import logo from "../../public/logo.png";
import { object, string } from "yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Alert from "@mui/lab/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import { USERS } from "../shared/utils/const";

import { AppFormTextField } from "../components/AppFormTextField";

const loginSchema = object({
  username: string().required("Please input username"),
  password: string().required("Please input password"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const method = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = method;

  const login = useCallback((value: { username: string; password: string }) => {
    const { username, password } = value;

    new Promise((resolve, reject) => {
      const user = USERS.find(
        (item) => item.username === username && item.password === password
      );
      if (user?.id) {
        resolve(user.id);
      } else {
        reject("Username or password is incorrect");
      }
    })
      .then((res) => {
        dispatch({ type: "set", payload: { authen: res?.toString() ?? "" } });
        navigate("/");
      })
      .catch((err: any) => {
        setErrorMsg(err);
      });
  }, []);

  useEffect(() => {
    if (state.authen) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-app">
      <section id="content" className="login-box p-3 md:p-5 rounded-2xl">
        <div className="font-bold text-[24px] leading-[140%] text-center min-w-[300px] max-w-[500px] text-[#e50914]">
          Cinemo
          <p className="text-[16px] leading-[140%] font-semibold mt-4 text-[#221f1f]">
            The Best Way To Discover Great Movie To Watch
          </p>
        </div>
        <img
          className="max-h-[300px] max-w-[300px] mx-auto my-4"
          src={logo}
          alt="web-logo"
        />

        <div className="flex-1 mt-4 pb-3">
          <form onSubmit={handleSubmit(login)} autoComplete="off">
            <Fade
              in={errorMsg !== null}
              className={`w-90 ${
                errorMsg !== null ? "h-auto z-10 mb-5" : "h-0 p-0 mb-5"
              }`}
            >
              <Alert severity="error" onClose={() => setErrorMsg(null)}>
                {errorMsg}
              </Alert>
            </Fade>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <AppFormTextField
                  {...field}
                  label="Username"
                  className="w-full"
                  required={false}
                  sx={{ width: "100%" }}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <AppFormTextField
                  {...field}
                  label="Password"
                  className="w-full"
                  required={false}
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              size="large"
              sx={{
                backgroundColor: "#b81d24 !important",
                color: "#f5f5f1",
                textTransform: "none",
              }}
              className="w-full"
              type="submit"
            >
              <span className="font-semibold">Login</span>
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
