import { useState } from "react";
import { Input } from "../../components/Input";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuthentication } from "../../context/Authentication";
import Logo from "../../components/Logo";

export default function Registration() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  //  Submition Status
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  //   Router functions
  const navigate = useNavigate();
  const { user, loading: authenticating } = useAuthentication();

  if (authenticating) return null;
  if (user) return <Navigate replace to="/" />;

  function clearForm() {
    setName("");
    setLastname("");
    setAge("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    // Get Form Data
    const data = new FormData(e.currentTarget);

    // Build Payload
    const payload = {
      name: data.get("first_name"),
      lastname: data.get("last_name"),
      age: data.get("age"),
      username: data.get("username"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
      email: data.get("email"),
    };

    // Submit form to API
    const response = await fetch("http://localhost:4004/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Parse result
    const result = (await response.json()) as {
      data: { inserted_id: string };
      errors: [{ message: string }];
      success: boolean;
    };

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/login", { replace: true });
      }, 1000);
    }

    // Update form
    setErrors(result.errors.map((error) => error.message));
    setLoading(false);
    clearForm();
  }

  return (
    <>
      <div className="relative flex h-screen min-h-screen justify-evenly items-center">
        {/* Form */}
        <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
          <Link to="/" className="w-fit mx-auto py-4">
            <Logo />
          </Link>
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="p-8 flex flex-col gap-2">
              <p className="font-serif text-center text-4xl font-normal tracking-tight text-gray-900">
                Welcome to ProTech
              </p>
              <p className="text-center text-sm text-gray-900">
                Please fill out all required fields
              </p>
            </div>
            <form
              action="#"
              method="POST"
              className="space-y-2 w-1/2"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full gap-2">
                <div className="flex-1">
                  <label
                    htmlFor="first_name"
                    className="block font-semibold text-gray-800 tracking-wide text-xs/6"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      autoComplete="first_name"
                      placeholder="Enter your name"
                      disabled={loading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="last_name"
                    className="block font-semibold text-gray-800 tracking-wide text-xs/6"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <Input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      autoComplete="last_name"
                      placeholder="Enter your last name"
                      disabled={loading}
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="Age"
                  className="block font-semibold text-gray-800 tracking-wide text-xs/6"
                >
                  Age
                </label>
                <div className="mt-2">
                  <Input
                    id="Age"
                    name="age"
                    type="number"
                    required
                    autoComplete="Age"
                    placeholder="Enter your age"
                    disabled={loading}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex w-full gap-2">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block font-semibold text-gray-800 tracking-wide text-xs/6"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your email"
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1">
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
                      disabled={loading}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
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
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
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
                  Password
                </label>
                <div className="mt-2">
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    required
                    placeholder="Confirm your password"
                    disabled={loading}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="py-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="disabled:bg-black/70 disabled:pointer-events-none flex w-full justify-center rounded-md cursor-pointer bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
                >
                  {loading ? "Sending Registration..." : "Submit Registration"}
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
                <p>Great! Registration successful</p>
              </div>
            )}
          </div>

          {/* Form footer */}
          <div>
            <p className="mt-10 text-center text-sm text-gray-900">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign in
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
    </>
  );
}
