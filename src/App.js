


import { useLocation } from "react-router-dom"; // Import useLocation to access current route
import ManagerHeader from "./components/ManagerHeader"; // Import ManagerHeader
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./AppRouter";
import "./global.scss";

function App() {
    const location = useLocation(); // Access the current route location

    // Define the condition for rendering ManagerHeader
    const isManagerOrEmployeeOrTaskPage =
        location.pathname === "/managerhomepage" ||
        location.pathname.startsWith("/employee-details") ||
        location.pathname.includes("/tasks/") ||
        location.pathname.startsWith("/edit-employee");

    return (
        <div className="App">
            {/* Render ManagerHeader on specific pages */}
            {isManagerOrEmployeeOrTaskPage ? <ManagerHeader /> : <Header />}
            <AppRouter />
            <Footer />
        </div>
    );
}

export default App;

