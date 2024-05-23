import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const name = localStorage.getItem("name") || "Anonyms";
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center py-2 border-b px-2 md:px-4 lg:px-12">
            <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => {
                    navigate("/blog");
                }}
            >
                MEDIUM
            </div>
            <div>
                <Avatar name={name} />
            </div>
        </div>
    );
}

export default Navbar;
