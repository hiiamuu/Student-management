import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-8xl font-bold text-red-200">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-red-800">
            Page not found
        </h2>
        <p className="mb-6 text-sm text-red-500">
            The page you are looking for does not exist.
        </p>
        <Link
            to="/"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
            Go back home
        </Link>
    </div>
);

export default NotFoundPage;
