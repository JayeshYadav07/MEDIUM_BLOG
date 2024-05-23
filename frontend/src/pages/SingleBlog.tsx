import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import Navbar from "../components/Navbar";

interface setBlogType {
    author: { name: string };
    authorId: string;
    content: string;
    created_at: string;
    id: string;
    published: boolean;
    title: string;
}

function SingleBlog() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState<setBlogType | null>(null);
    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/app/v1/blog/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokens"),
                },
            })
            .then((res) => {
                const data = res.data;
                if (!data.error) {
                    setBlog(data);
                    console.log(data);
                } else {
                    navigate("/signin");
                }
            });
    }, [id, navigate]);

    return (
        <div>
            <Navbar />
            <div className="p-10 grid grid-cols-12">
                <div className="col-span-2"></div>
                <div className="col-span-8">
                    <div className="text-4xl font-bold">{blog?.title}</div>
                    <div className="text-gray-300 text-sm py-2">
                        {blog?.created_at &&
                            "Posted on " + formatDate(blog.created_at)}
                    </div>
                    <p>{blog?.content}</p>
                </div>
                <div className="col-span-2">
                    <div className="font-semibold">Author</div>
                    <div className="flex items-center py-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <div className="text-xl font-bold px-2">
                            {blog?.author.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default SingleBlog;
