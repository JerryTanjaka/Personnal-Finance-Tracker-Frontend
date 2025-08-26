import changePassword from "../../utils/changePassword";
import { useState } from "react";

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                className="border p-2 rounded mb-4 w-auto"
                placeholder="Your current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                type="password"
                required
                className="border p-2 rounded mb-4 w-auto"
                placeholder="Your new Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
