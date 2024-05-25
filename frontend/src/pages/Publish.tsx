import { CreateType } from "jayeshyadav_medium_common";
import GrowingTextarea from "../components/GrowingTextarea";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Publish() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    function sendRequest() {
        const body: CreateType = {
            title: title,
            content: content,
            published: true,
        };
        axios
            .post(`${BACKEND_URL}/app/v1/blog`, body, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokens"),
                },
            })
            .then((response) => {
                console.log(response);
                const data = response.data;
                if (!data.error) {
                    toast.success("Post crated successfully", {
                        autoClose: 500,
                    });
                    navigate("/blog");
                } else {
                    toast.error(data.error, { autoClose: 3000 });
                }
            })
            .catch(() => {
                toast.error("Something Went wrong.", { autoClose: 3000 });
            });
    }

    return (
        <div>
            <ToastContainer />
            <Navbar />
            <div className="font-serif flex justify-center">
                <div className="w-9/12 p-5">
                    <GrowingTextarea
                        initialFontSize="2.5rem"
                        placeholder="Title"
                        name={title}
                        text={title}
                        setText={setTitle}
                    />
                    <GrowingTextarea
                        placeholder="Tell your story ..."
                        name={content}
                        text={content}
                        setText={setContent}
                    />
                    <div className="my-10 mx-2">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={sendRequest}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Publish;
