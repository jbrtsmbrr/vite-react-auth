import { useState } from "react";
import { Input } from "../../components/Input";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuthentication } from "../../context/Authentication";
import Logo from "../../components/Logo";
import PasswordInput from "../../components/PasswordInput";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //  Submition Status
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  //   Router functions
  //   const navigate = useNavigate();

  const { user, loading: authenticating } = useAuthentication();

  if (authenticating) return null;
  if (user) return <Navigate replace to="/" />;

  function clearForm() {
    setUsername("");
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    // Get Form Data
    const data = new FormData(e.currentTarget);

    // Build Payload
    const payload = {
      username: data.get("username"),
      password: data.get("password"),
    };

    // Submit form to API
    const response = await fetch("http://localhost:4004/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    // Parse result
    const result = (await response.json()) as {
      data: { token: string | null; refresh_token: string | null };
      errors: [{ message: string }];
      success: boolean;
    };

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.href = "/";
      }, 500);
    }

    // Update form
    setErrors(result.errors.map((error) => error.message));
    setLoading(false);
    clearForm();
  }

  return (
    <div className="relative flex h-screen min-h-screen justify-evenly items-center">
      {/* Form */}
      <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <Link reloadDocument to="/" className="w-fit mx-auto py-4">
          <Logo />
        </Link>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="p-8 flex flex-col gap-2">
            <p className="font-serif text-center text-4xl font-normal tracking-tight text-gray-900">
              Welcome Back
            </p>
            <p className="text-center text-sm text-gray-900">
              Enter your credentials to access your account
            </p>
          </div>
          <form
            action="#"
            method="POST"
            className="space-y-2 w-1/2"
            onSubmit={handleSubmit}
          >
            {/* Inputs */}
            <div>
              <label
                htmlFor="username"
                className="block font-semibold text-gray-800 tracking-wide text-xs/6"
              >
                Username
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  disabled={loading}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-semibold text-gray-800 tracking-wide text-xs/6"
              >
                Password
              </label>
              <div className="mt-2">
                <PasswordInput
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="password"
                  placeholder="Enter your password"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Forgot password */}
            <div>
              <Link reloadDocument to="/forgot_password">
                <p className="text-right text-xs text-indigo-500 font-medium hover:text-indigo-400 tracking-wide">
                  Forgot password?
                </p>
              </Link>
            </div>
            <div className="py-2">
              <button
                disabled={loading}
                type="submit"
                className="disabled:bg-black/70 disabled:pointer-events-none flex w-full justify-center rounded-md cursor-pointer bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                {loading ? "Verifying..." : "Login"}
              </button>
            </div>
          </form>

          {!loading && errors.length > 0 && (
            <div className="w-1/2 p-2 bg-red-100/60 text-red-500 mt-2 border border-red-200/50 text-xs tracking-wider">
              {errors.map((error) => (
                <p>{error}</p>
              ))}
            </div>
          )}

          {!loading && success && (
            <div className="w-1/2 p-2 bg-green-50 text-green-600 mt-2 border border-green-300/50 text-xs tracking-wider">
              <p>Great! You have successfully logged in</p>
            </div>
          )}
        </div>
        {/* Form footer */}
        <div>
          <p className="mt-10 text-center text-sm text-gray-900">
            Not a member yet?{" "}
            <Link
              reloadDocument
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Side UI */}
      <div className="bg-gray-500 flex-1 h-full">
        <div
          className="banner h-full"
          style={{
            background: "url(./src/assets/images/abstract.jpg)",
            // height: "100vh",
            // backgroundPosition: `65% 51%`,
            backgroundRepeat: "no-repeat",
            position: "relative",
            backgroundSize: "100% 100%",
          }}
        ></div>
        {/* <img
          src="./src/assets/images/abstract.jpg"
          className="h-full relative w-full object-fill"
        /> */}
      </div>
    </div>
  );
}
