import { useRef } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Home() {

    const messageRef = useRef<HTMLInputElement | null>(null);
    const ref = collection(firestore, "messages");
    

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const data = {
            message: messageRef.current?.value || "",
        };
        
        try {
            await addDoc(ref, data); // ✅ Added await
            console.log("Message saved successfully!");
            
            // Optional: Clear the input after saving
            if (messageRef.current) {
                messageRef.current.value = "";
            }
        } catch (error) {
            console.error("Error saving message:", error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSave}>
                <label>Enter a message</label>
                <input type="text" ref={messageRef} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}