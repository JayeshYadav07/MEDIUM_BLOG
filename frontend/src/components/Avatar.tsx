function Avatar({ name }: { name: string }) {
    return (
        <div className="bg-gray-300 text-xl flex justify-center items-center h-10 w-10 rounded-full">
            {name[0].toUpperCase()}
        </div>
    );
}

export default Avatar;
