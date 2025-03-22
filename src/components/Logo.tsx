export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <img
        alt="Your Company"
        src="./src/assets/images/logo-transparent.png"
        className="h-8 w-8.5"
      />
      <p className="font-mono text-center text-lg font-semibold tracking-tight text-gray-900">
        Pro
        <span className="text-indigo-700 font-extrabold tracking-tighter">
          Tech
        </span>
      </p>
    </div>
  );
}
