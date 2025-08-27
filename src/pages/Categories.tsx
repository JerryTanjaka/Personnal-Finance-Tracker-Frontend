import { useEffect, useRef, useState } from "react";
import ErrorMessage from "../components/UI/ErrorMessage";
import { AnimatePresence, motion } from 'framer-motion'

type Category = {
    id: string;
    name: string;
    created_at: string;
}

type Message = {
    message: string;
    error?: string
}

export default function Categories() {

    const [categoryReload, setCategoryReload] = useState<boolean>(false)
    const [categoryList, setCategoryList] = useState<Array<Category> | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState<Message | null>(null)
    const [categoryName, setCategoryName] = useState<string>('')
    const categoryIdRef = useRef<string>('')

    useEffect(() => {
        fetch('http://localhost:8080/api/categories/',
            { headers: { "Authorization": "Bearer " + localStorage.getItem('accessToken') } }
        )
            .then(async res => {
                return await res.json()
                    .then((res) => {
                        if ('message' in res) {
                            setNotificationMessage(res)
                            return []
                        }
                        return res
                    })
            })
            .then(res => setCategoryList(res))
            .catch(async rej => await handleNotification(rej))
        setCategoryReload(false)
    }, [categoryReload])

    async function handleNotification(res: any) {
        return await res.json()
            .then((res: any) => {
                if ('message' in res) {
                    setNotificationMessage(res)
                }
            })
    }

    function handleCreate(categoryName: string) {
        fetch(`http://localhost:8080/api/categories/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('accessToken') },
            body: JSON.stringify({ name: categoryName })
        })
            .then(async res => await handleNotification(res))
            .then(() => setCategoryReload(true))
            .catch(async rej => await handleNotification(rej))
            .finally(() => clearSidePanel())
    }

    function handleUpdate(categoryId: string, categoryName: string) {
        fetch(`http://localhost:8080/api/categories/${categoryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('accessToken') },
            body: JSON.stringify({ name: categoryName })
        })
            .then(async res => await handleNotification(res))
            .then(() => setCategoryReload(true))
            .finally(() => clearSidePanel())
    }

    function handleDelete(categoryId: string) {
        if (window.confirm('Are you sure to delete this category ?')) {
            fetch(`http://localhost:8080/api/categories/${categoryId}`, {
                method: 'DELETE',
                headers: { 'Authorization': "Bearer " + localStorage.getItem('accessToken') },
            })
                .then(async res => await handleNotification(res))
                .then(() => setCategoryReload(true))
                .finally(() => clearSidePanel())
        }
        return;
    }

    function clearSidePanel() {
        setIsUpdating(false)
        setCategoryName('')
        categoryIdRef.current = ''
    }

    return (
        <>
            <AnimatePresence>
                {notificationMessage ? (
                    <ErrorMessage message={notificationMessage?.error || notificationMessage?.message} onClose={() => { setNotificationMessage(null) }} />
                ) : null}
            </AnimatePresence>
            <div className="h-[94vh] w-full p-5 bg-gray-100 rounded-lg">
                <div className="flex justify-between border-b border-gray-300 items-center mb-5">
                    <h3 className="text-3xl font-bold p-2 mb-3">Categories</h3>
                </div>
                <div className="w-full h-fit my-10 flex flex-col-reverse flex-wrap gap-2 justify-around items-center xl:items-start xl:flex-row-reverse">
                    <div className="w-full xl:w-7/10 h-[75vh] flex flex-col gap-3 rounded-2xl overflow-y-scroll">
                        <div className="bg-white font-semibold w-full p-3 rounded-[5px] shadow-xs grid grid-cols-4 gap-x-5 items-center">
                            <div>Name</div>
                            <div>ID</div>
                            <div className="text-center">Creation date</div>
                            <div className="text-center">Actions</div>
                        </div>
                        <AnimatePresence>
                            {categoryList?.sort((a, b) => (a?.name > b?.name)).map((category: Category) => {
                                const formattedDate = new Date(category['created_at']?.valueOf()).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

                                return (
                                    <motion.div
                                        key={category.id}
                                        className={`w-full p-3 rounded-[5px] shadow-md grid grid-cols-4 gap-x-5 items-center ${(isUpdating && category['id'] == categoryIdRef.current) ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'} transition-colors`}
                                        layout
                                        whileHover={{ scale: 0.995 }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1, transition: { ease: "backInOut" } }}
                                        exit={{ opacity: 0, rotateX: 90 }}>
                                        <div className="text-xl">{category['name']}</div>
                                        <div className="text-balance">{category['id']}</div>
                                        <div className="text-center">{formattedDate}</div>
                                        <div className="flex flex-wrap justify-evenly gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    clearSidePanel()
                                                    categoryIdRef.current = category['id']
                                                    setCategoryName(category['name'])
                                                    setIsUpdating(true)
                                                }
                                                }
                                                className="p-2 px-3 bg-blue-100 rounded-[5px] font-medium text-blue-500" type="button">Rename</motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleDelete(category.id)}
                                                className="p-2 px-3 border-2 border-red-400 rounded-[5px] font-medium text-red-500" type="button">Delete</motion.button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                    <div className="max-w-[350px] min-w-[250px] min-h-[150px] h-fit bg-white rounded-[10px] flex flex-col gap-3 shadow-lg items-center justify-center flex-1">
                        <h4 className="text-xl">{(isUpdating) ? 'Rename' : 'Create'} a category</h4>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (window.confirm(`You are about to ${(isUpdating) ? 'rename' : 'create'} category, proceed ?`)) {
                                (isUpdating) ? handleUpdate(categoryIdRef.current, categoryName) : handleCreate(categoryName)
                            } else { clearSidePanel() }
                        }} className="flex flex-col gap-3 justify-center items-center">
                            <input
                                type="text"
                                name="categoryNewName"
                                id="categoryNewName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="bg-gray-100 w-9/10 rounded-md h-[30px] text-center border-1 border-slate-300"
                            />
                            <div className="w-full h-fit flex justify-evenly">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={clearSidePanel}
                                    className="text-slate-800 font-medium border-2 border-slate-300 py-1 px-3 rounded-[7px]">Cancel</motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-green-900 font-medium bg-green-100 py-1 px-3 rounded-[7px]"
                                >{(isUpdating) ? 'Rename' : 'Create'}</motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}