import { AnimatePresence, motion } from "framer-motion";
import CategoryItem from "./CategoryItem";

type Category = {
    id: string;
    name: string;
    created_at: string;
};

type Props = {
    categories: Array<Category> | null;
    searchFilter: string;
    onRename: (category: Category) => void;
    onDelete: (id: string) => void;
    onCreate: () => void;
};

export default function CategoryList({ categories, searchFilter, onRename, onDelete, onCreate }: Props) {
    return (
        <div className="relative w-full xl:w-7/10 flex flex-col gap-4 rounded-2xl overflow-y-scroll max-h-full">
            <div className="sticky top-0 bg-white font-semibold w-full px-6 py-3 rounded-lg shadow-sm grid grid-cols-3 gap-x-5 items-center text-gray-500 text-sm">
                <div>Name</div>
                <div className="text-center">Created</div>
                <div className="text-center">Actions</div>
            </div>

            <motion.div
                className="w-full px-6 py-5 rounded-xl shadow-sm flex justify-center items-center bg-white hover:bg-gray-50 cursor-pointer"
                layout
                onClick={onCreate}
                whileHover={{ scale: 0.99 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
            >
                <i className="bx bx-plus text-3xl text-gray-400" />
            </motion.div>

            <AnimatePresence>
                {categories
                    ?.filter((a) => a?.name?.toLowerCase().includes(searchFilter.toLowerCase()))
                    .sort((a, b) => (a?.name > b?.name ? 1 : -1))
                    .map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onRename={onRename}
                            onDelete={onDelete}
                        />
                    ))}
            </AnimatePresence>
        </div>
    );
}
