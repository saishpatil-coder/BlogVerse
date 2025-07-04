import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
function LogOutBtn({className}) {
    const dispatch = useDispatch()

    const logouthanlder = () => {
        authService.logout().then(() => {
            dispatch(logout());
        }).catch((err) => {
            console.error("Logout failed:", err);
        });
    }
    return (
        <button
                className={`inline-block px-6 py-2.5 font-semibold text-sm text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 ${className}`}
            onClick={logouthanlder}
        >
            Log Out
        </button>
    );
}
export default LogOutBtn;