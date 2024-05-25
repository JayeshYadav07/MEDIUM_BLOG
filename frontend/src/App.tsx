import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import Publish from "./pages/Publish";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
                <Route path="/publish" element={<Publish />} />
                <Route
                    path="*"
                    element={
                        <h1 className="p-5 font-bold text-center">
                            404 Not Found
                        </h1>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
