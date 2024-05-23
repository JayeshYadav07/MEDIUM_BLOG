import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

interface blogType {
    id: string;
    author: { name: string };
    created_at: string;
    title: string;
    content: string;
}
function Blog() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/app/v1/blog/bulk`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("tokens"),
                },
            })
            .then((res) => {
                const data = res.data;
                if (!data.error) {
                    setBlogs(data);
                } else {
                    navigate("/signin");
                }
            });
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center p-5">
                {blogs.map((blog: blogType) => {
                    return (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            name={blog.author.name}
                            created_at={blog.created_at}
                            title={blog.title}
                            content={blog.content}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Blog;
