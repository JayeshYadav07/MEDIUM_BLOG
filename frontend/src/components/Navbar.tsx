import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Navbar() {
    const name = localStorage.getItem("name") || "Anonyms";
    return (
        <div className="flex justify-between items-center py-2 border-b px-2 md:px-4 lg:px-12">
            <Link className="cursor-pointer hover:text-blue-600" to={"/blog"}>
                MEDIUM
            </Link>
            <div className="flex items-center">
                <Link className="px-4" to={"/publish"}>
                    <Button size="small" variant="contained" color="primary">
                        Publish
                    </Button>
                </Link>
                <Avatar name={name} />
            </div>
        </div>
    );
}

export default Navbar;
