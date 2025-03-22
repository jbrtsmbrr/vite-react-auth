import { useState } from "react";
import { Input } from "../../components/Input";
import { Link, Navigate, useSearchParams } from "react-router";
import { useAuthentication } from "../../context/Authentication";
import Logo from "../../components/Logo";

export default function RecoverAccountPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [confirmPassword, setConfirmPassword] = useState("");
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
    setConfirmPassword("");
    setPassword("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    // Get Form Data
    const data = new FormData(e.currentTarget);

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      setLoading(false);
      return;
    }

    // Build Payload
    const payload = {
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
      token: token,
    };

    // Submit form to API
    const response = await fetch(
      "http://localhost:4004/auth/change_forgotten_password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    // Parse result
    const result = (await response.json()) as {
      data: { password_changed: boolean };
      errors: { message: string }[];
      success: boolean;
    };

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.href = "/login";
      }, 1000);
    }

    // Update form
    setErrors(
      result.errors.length ? ["Error occured when recovering your account"] : []
    );
    setLoading(false);
    clearForm();
  }

  return (
    <div className="relative flex h-screen min-h-screen justify-evenly items-center">
      {/* Form */}
      <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <Link to="/" className="w-fit mx-auto py-4">
          <Logo />
        </Link>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="p-8 flex flex-col gap-2">
            <p className="font-serif text-center text-4xl font-normal tracking-tight text-gray-900">
              Account Recovery
            </p>
            <p className="text-center text-sm text-gray-900">
              Enter your new password to recover your account
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
                htmlFor="password"
                className="block font-semibold text-gray-800 tracking-wide text-xs/6"
              >
                New Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="password"
                  placeholder="Enter new password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block font-semibold text-gray-800 tracking-wide text-xs/6"
              >
                Confirm New Password
              </label>
              <div className="mt-2">
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  autoComplete="confirm_password"
                  placeholder="Confirm new password"
                  disabled={loading}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="py-2">
              <button
                disabled={loading}
                type="submit"
                className="disabled:bg-black/70 disabled:pointer-events-none flex w-full justify-center rounded-md cursor-pointer bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                {loading ? "Recovering Account..." : "Recover Account"}
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
              <p>You have successfully recovered your account</p>
            </div>
          )}
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
