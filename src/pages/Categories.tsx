import { useEffect, useRef, useState } from "react";
import NavBar from "../component/NavBar";
import ErrorMessage from "../component/ErrorMessage";
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
        fetch('http://localhost:3000/api/categories/',
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
        fetch(`http://localhost:3000/api/categories/`, {
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
        fetch(`http://localhost:3000/api/categories/${categoryId}`, {
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
            fetch(`http://localhost:3000/api/categories/${categoryId}`, {
                method: 'DELETE',
                headers: { 'Authorization': "Bearer " + localStorage.getItem('accessToken') },
            })
                .then(res => handleNotification(res))
                .then(() => setCategoryReload(true))
                .catch(async rej => await handleNotification(rej))
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
            <NavBar />
            <AnimatePresence>
                {notificationMessage ? (
                    <ErrorMessage message={notificationMessage?.error || notificationMessage?.message} onClose={() => { setNotificationMessage(null) }} />
                ) : null}
            </AnimatePresence>
            <div className="absolute top-0 left-0 w-full p-10 pl-30">
                <div className="w-full p-10 bg-gray-100 xl:px-15 rounded-[10px]">
                    <h3 className="text-3xl pl-10">Available expense category:</h3>
                    <div className="w-full h-fit my-10 flex flex-col-reverse flex-wrap gap-2 justify-around items-center xl:items-start xl:flex-row-reverse">
                        <div className="w-full xl:w-7/10 h-[70vh] flex flex-col gap-3 rounded-2xl overflow-y-scroll">
                            <div className="bg-white w-full p-3 rounded-[5px] shadow-xs grid grid-cols-4 gap-x-5 items-center">
                                <div>Name</div>
                                <div>ID</div>
                                <div className="text-center">Creation date</div>
                                <div className="text-center">Actions</div>
                            </div>
                            <AnimatePresence>
                                {categoryList?.sort((a, b) => (a?.name > b?.name)).map((category: Category) => {
                                    return (
                                        <motion.div
                                            key={category.id}
                                            className={`bg-white w-full p-3 rounded-[5px] shadow-md grid grid-cols-4 gap-x-5 items-center ${(isUpdating && category['id'] == categoryIdRef.current) ? 'shadow-blue-300' : null} transition-shadow`}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1, transition: { ease: "backInOut" } }}
                                            exit={{ opacity: 0, rotateX: 90 }}>
                                            <div className="text-xl">{category['name']}</div>
                                            <div className="text-balance">{category['id']}</div>
                                            <div className="text-center">{category['created_at']?.replace('T', '\n')?.replace('Z', '')}</div>
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
                                    className="bg-gray-100 w-9/10 rounded-2xl h-[30px] text-center"
                                />
                                <div className="w-full h-fit flex justify-evenly">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={clearSidePanel}
                                        className="text-slate-800 font-medium border-3 border-slate-300 py-1 px-3 rounded-[4px]">Cancel</motion.button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-green-800 font-medium border-3 border-green-700 py-1 px-3 rounded-[4px]"
                                    >{(isUpdating) ? 'Rename' : 'Create'}</motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}