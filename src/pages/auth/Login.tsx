import { useState } from "react";
import { Input } from "../../components/Input";
import { Navigate, useNavigate } from "react-router";
import { useAuthentication } from "../../context/Authentication";

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

    // TODO: Handle Refresh token
    // 1. Setup Routing
    // 2. Add Authentication Context
    // 3. Create Custom fetch function to handle refresh token

    // const response2 = await fetch("http://localhost:4004/auth/current", {
    //     credentials: 'include'
    // });

    // const result2 = await response2.json();
    // console.log(result2)
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.href = "/"
      }, 1000);
    }

    // Update form
    setErrors(result.errors.map((error) => error.message));
    setLoading(false);
    clearForm();
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900 tracking-wide"
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
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 tracking-wide"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="disabled:bg-indigo-400 disabled:pointer-events-none flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Verifying..." : "Login"}
              </button>
            </div>
          </form>

          {!loading && errors.length > 0 && (
            <div className="p-4 bg-red-100 text-red-500 mt-2 border border-red-300/50 text-sm tracking-wide">
              {errors.map((error) => (
                <p>{error}</p>
              ))}
            </div>
          )}

          {!loading && success && (
            <div className="p-4 bg-green-50 text-green-600 mt-2 border border-green-300/50 text-sm tracking-wide">
              <p>Great! You have successfully logged in</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
