import { useState } from "react";
import { Input } from "../../components/Input";
import { Navigate, useNavigate } from "react-router";
import { useAuthentication } from "../../context/Authentication";

export default function Registration() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register Account
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
                htmlFor="first_name"
                className="block text-sm/6 font-medium text-gray-900"
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block text-sm/6 font-medium text-gray-900"
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
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Age"
                className="block text-sm/6 font-medium text-gray-900"
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
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
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
                className="block text-sm/6 font-medium text-gray-900"
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
                {loading ? "Sending Registration..." : "Send Registration"}
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
              <p>Successfully Registered!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
