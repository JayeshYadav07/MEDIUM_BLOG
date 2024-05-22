import Avatar from "./Avatar";

function Navbar({ name = "A" }: { name?: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b px-2 md:px-4 lg:px-12">
            <div>MEDIUM</div>
            <div>
                <Avatar name={name} />
            </div>
        </div>
    );
}

export default Navbar;
