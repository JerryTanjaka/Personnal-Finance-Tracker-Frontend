import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function DeleteData() {
  const { t } = useTranslation();

  const removeData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    if (!window.confirm(t("delete_confirm_message", "Are you sure you want to delete all your data?"))) {
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete-data`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert(t("delete_error", "Something went wrong. Please try again."));
        return;
      }

      alert(t("delete_success", "All your data has been deleted."));
    } catch {
      alert(t("delete_error", "Something went wrong. Please try again."));
    }
  };

  return (
    <button
      onClick={removeData}
      className="flex items-center w-fit cursor-pointer active:scale-95 transition-all rounded-lg bg-red-600 px-4 py-2 text-white shadow-lg mt-4"
    >
      <FaTrash className="mr-2 size-4" />
      <span className="text-sm">{t("confirm_delete", "Remove all data")}</span>
    </button>
  );
}
