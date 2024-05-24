import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

interface blogCardPropsType {
    id: string;
    name: string;
    created_at: string;
    title: string;
    content: string;
}
function BlogCard({ id, name, created_at, title, content }: blogCardPropsType) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => {
                navigate(`/blog/${id}`);
            }}
            className="leading-normal max-w-xl border-b py-5 cursor-pointer"
        >
            <div className="flex items-center gap-2 flex-wrap">
                <Avatar name={name} />
                <div>{firstLetterUpperCase(name)}</div>
                <div className="text-gray-400">
                    {created_at.substring(0, 10)}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold my-1">
                    {firstLetterUpperCase(title)}
                </h2>
                <p className="font-serif tracking-wide w-full">
                    {firstLetterUpperCase(
                        content.length > 100
                            ? content.substring(0, 100) + "..."
                            : content
                    )}
                </p>
            </div>
        </div>
    );
}

function firstLetterUpperCase(str: string) {
    return str[0].toUpperCase() + str.substring(1);
}

export default BlogCard;
