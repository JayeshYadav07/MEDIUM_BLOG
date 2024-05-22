function Avatar({ name }: { name: string }) {
    return (
        <div className="bg-green-400 text-xl flex justify-center items-center h-10 w-10 rounded-full">
            {name[0]}
        </div>
    );
}

export default Avatar;
