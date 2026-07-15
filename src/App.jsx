import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home";
import AboutPage from "./pages/about/About";
import ContactPage from "./components/Contact";
import Navbar from "./components/NavBar";
import StudentDetailPage from "./components/StudentDetailPage";
import NotFoundPage from "./components/NotFound";
import StudentsPage from "./components/StudentsPage";

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/students/:id" element={<StudentDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
