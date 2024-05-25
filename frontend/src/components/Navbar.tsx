import Avatar from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TbLogout } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
    const name = localStorage.getItem("name") || "Anonyms";
    const navigate = useNavigate();
    const performLogout = () => {
        localStorage.clear();
        toast.success("Logout successfully", {
            autoClose: 200,
        });
        setTimeout(() => {
            navigate("/signin");
        }, 1000);
    };
    return (
        <>
            <ToastContainer />
            <div className="flex justify-between items-center py-2 border-b px-2 md:px-4 lg:px-12">
                <Link
                    className="cursor-pointer hover:text-blue-600"
                    to={"/blog"}
                >
                    MEDIUM
                </Link>
                <div className="flex items-center">
                    <Link to={"/publish"}>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                        >
                            Publish
                        </Button>
                    </Link>
                    <div className="px-4">
                        <Avatar name={name} />
                    </div>
                    <div>
                        <TbLogout
                            className="text-2xl"
                            onClick={performLogout}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
