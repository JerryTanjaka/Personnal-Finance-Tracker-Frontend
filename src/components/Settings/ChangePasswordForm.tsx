import changePassword from "../../utils/changePassword";
import { useRef } from "react";

export default function ChangePasswordForm() {
    const currentPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentPassword = currentPasswordRef.current?.value || "";
        const newPassword = newPasswordRef.current?.value || "";

        try {
            const result = await changePassword(currentPassword, newPassword);
            console.log("Password changed successfully:", result);
        } catch (err) {
            console.error("Error changing password:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-w-1/3">
            <input
                type="password"
                required
                ref={currentPasswordRef}
                className="border p-2 rounded mb-4 w-auto"
                placeholder="Your current Password"
            />
            <input
                type="password"
                required
                ref={newPasswordRef}
                className="border p-2 rounded mb-4 w-auto"
                placeholder="Your new Password"
            />
            <button
                type="submit"
                className="bg-blue-500 w-fit cursor-pointer active:scale-95 text-white p-2 rounded"
            >
                Change Password
            </button>
        </form>
    );
}
