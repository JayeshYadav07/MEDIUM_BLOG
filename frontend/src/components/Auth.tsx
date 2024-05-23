import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { SignupType } from "jayeshyadav_medium_common";
import { BACKEND_URL } from "../config/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate();
    const [formInputs, setFormInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: "",
    });

    async function sendRequest() {
        try {
            const res = await axios.post(
                `${BACKEND_URL}/app/v1/user/${
                    type == "signup" ? "signup" : "signin"
                }`,
                formInputs
            );
            const data = res.data;
            if (!data.error) {
                toast.success(data.msg, { autoClose: 500 });
                setTimeout(() => {
                    localStorage.setItem("tokens", data.token);
                    localStorage.setItem("name", data.user.name);
                    navigate("/blog");
                }, 1000);
            } else {
                toast.error(data.error, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error(
                `Error while ${type == "signup" ? "signup" : "signin"} `,
                { autoClose: 3000 }
            );
        }
    }

    return (
        <>
            <ToastContainer />
            <div className=" h-screen flex flex-col justify-center items-center">
                <div>
                    <div className="px-7 my-4 text-center">
                        <h1 className="text-3xl font-bold">
                            {type == "signup"
                                ? "Create an account"
                                : "Login an account"}
                        </h1>
                        <p className="text-base text-gray-400">
                            {type == "signup"
                                ? "Already have an account?"
                                : "Don't have an account"}
                            <Link
                                className="text-blue-600 underline px-1"
                                to={type == "signup" ? "/signin" : "/signup"}
                            >
                                {type == "signup" ? "Login" : "Sign Up"}
                            </Link>
                        </p>
                    </div>
                    <div>
                        {type == "signup" && (
                            <LabelledInput
                                label="Username"
                                placeholder="Enter your name"
                                onChange={(e) => {
                                    setFormInputs((c) => ({
                                        ...c,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        )}
                        <LabelledInput
                            label="Email"
                            type="email"
                            placeholder="Enter your Email"
                            onChange={(e) => {
                                setFormInputs((c) => ({
                                    ...c,
                                    email: e.target.value,
                                }));
                            }}
                        />
                        <LabelledInput
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => {
                                setFormInputs((c) => ({
                                    ...c,
                                    password: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <button
                        onClick={sendRequest}
                        type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 w-full"
                    >
                        {type == "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
    label,
    type,
    placeholder,
    onChange,
}: LabelledInputType) {
    return (
        <div className="my-2">
            <label className="block mb-2 text-sm font-semibold text-gray-900">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder={placeholder}
                required
            />
        </div>
    );
}
export default Auth;
