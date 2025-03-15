export function Navigation() {
  return (
    <div className="flex items-center justify-between p-2 px-6 bg-zinc-950 text-white">
      <div className="flex gap-6">
        <img
          alt="Your Company"
          src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
          className="mx-auto h-12 w-auto"
        />
        <ul className="flex gap-6 items-center text-sm tracking-wider">
          <li>Home</li>
          <li>Projects</li>
          <li>Testimonials</li>
          <li>Contacts</li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <img
          alt="Your Company"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="mx-auto h-8 w-auto rounded-full"
        />
        <button
          onClick={async () => {
            const response = await fetch("http://localhost:4004/auth/logout", {
              method: "POST",
              credentials: "include",
            });
            const result = (await response.json()) as { success: boolean };

            if (result.success) {
              window.location.href = "/login";
            }
          }}
          className="cursor-pointer hover:bg-red-800/90 p-2 px-4 rounded-md bg-red-800 text-red-200 text-sm tracking-wider font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
