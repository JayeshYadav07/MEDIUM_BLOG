import {
    useEffect,
    useRef,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from "react";

interface GrowingTextareaProps {
    initialFontSize?: string;
    placeholder?: string;
    name: string;
    text: string;
    setText: Dispatch<SetStateAction<string>>;
}

const GrowingTextarea: React.FC<GrowingTextareaProps> = ({
    initialFontSize = "1.5rem",
    placeholder,
    name,
    text,
    setText,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [name]);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const newValue = e.target.value;
        setText(newValue);
    }
    return (
        <div>
            <textarea
                ref={textareaRef}
                name={name}
                value={text}
                onChange={handleChange}
                rows={1}
                style={{
                    fontSize: initialFontSize,
                    lineHeight: initialFontSize,
                }}
                className="w-full p-2 border-none outline-none text-xl resize-none overflow-hidden font-serif"
                placeholder={placeholder}
            />
        </div>
    );
};
export default GrowingTextarea;
