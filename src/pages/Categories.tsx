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
    const [isCreating, setIsCreating] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState<Message | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [searchFilter, setSearchFilter] = useState<string>('')
    const searchFilterRef = useRef<string>('')
    const categoryIdRef = useRef<string>('')
    const categoryNameRef = useRef<string>('')

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

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
            .finally(() => clearModal())
    }

    function handleUpdate(categoryId: string, categoryName: string) {
        fetch(`http://localhost:8080/api/categories/${categoryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('accessToken') },
            body: JSON.stringify({ name: categoryName })
        })
            .then(async res => await handleNotification(res))
            .then(() => setCategoryReload(true))
            .finally(() => clearModal())
    }

    function handleDelete(categoryId: string, force?: boolean) {
        fetch(`http://localhost:8080/api/categories/${categoryId}?force=${force}`, {
            method: 'DELETE',
            headers: { 'Authorization': "Bearer " + localStorage.getItem('accessToken') },
        })
            .then(async res => await handleNotification(res))
            .then(() => setCategoryReload(true))
            .finally(() => clearModal())
    }

    function clearModal() {
        closeModal()
        setIsUpdating(false)
        setIsCreating(false)
        categoryNameRef.current = ''
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
                <div className="w-full  flex flex-col-reverse flex-wrap gap-2 justify-around items-center xl:items-start xl:flex-row-reverse">
                    <div className="relative w-full h-[75vh] max-h-[75vh] xl:w-7/10 flex flex-col gap-3 rounded-lg overflow-y-scroll">
                        <div className="sticky top-0 bg-white font-semibold w-full z-10 p-3 rounded-[5px] shadow-xs grid grid-cols-4 gap-x-5 items-center">
                            <div>Name</div>
                            <div>ID</div>
                            <div className="text-center">Creation date</div>
                            <div className="text-center">Actions</div>
                        </div>
                        <AnimatePresence>
                            <motion.div
                                className={`w-full p-3 rounded-[5px] shadow-md flex justify-center items-center bg-white hover:bg-gray-50 transition-colors`}
                                layout
                                onClick={() => {
                                    setIsCreating(true)
                                    openModal()
                                }}
                                whileHover={{ scale: 0.995 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1, transition: { ease: "backInOut" } }}
                                exit={{ opacity: 0, rotateX: 90 }}>
                                <i className='bxr  bx-plus text-4xl text-gray-500' />
                            </motion.div>

                        </AnimatePresence>
                        <AnimatePresence>
                            {categoryList?.filter(a => a?.name?.toLowerCase().includes(searchFilter.toLowerCase())).filter(() => true).sort((a, b) => (a?.name > b?.name)).map((category: Category) => {

                                const formattedDate = new Date(category['created_at']?.valueOf()).toLocaleDateString("en-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                                return (
                                    <motion.div
                                        key={category.id}
                                        className={`w-full h-fit p-3 rounded-[5px] shadow-md grid grid-cols-4 gap-x-5 items-center bg-white hover:bg-gray-50 transition-colors`}
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
                                                    categoryIdRef.current = category['id']
                                                    setIsUpdating(true)
                                                    openModal()
                                                }
                                                }
                                                className="p-2 px-3 bg-blue-100 rounded-[5px] font-medium text-blue-500" type="button">Rename</motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    categoryIdRef.current = category['id']
                                                    setIsUpdating(false)
                                                    openModal()
                                                }}
                                                className="p-2 px-3 border-2 border-red-400 rounded-[5px] font-medium text-red-500" type="button">Delete</motion.button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                    <div className="relative max-w-[350px] min-w-[250px] min-h-[150px] h-fit bg-white rounded-[10px] flex flex-col gap-3 shadow-lg items-center justify-center flex-1">
                        <h4 className="text-xl">Search</h4>
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                setSearchFilter(searchFilterRef.current)
                            }}
                            className="flex flex-col gap-3 justify-center items-center">
                            <input
                                type="text"
                                name="searchFilter"
                                id="searchFilter"
                                onChange={(e) => searchFilterRef.current = (e.target.value)}
                                className="bg-gray-100 w-9/10 rounded-md h-[30px] text-center border-1 border-slate-300"
                            />
                            <div className="w-full h-fit flex justify-evenly">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        document.getElementById('searchFilter')!.value = ''
                                        searchFilterRef.current = ('')
                                        setSearchFilter('')
                                    }}
                                    className="text-slate-800 font-medium border-2 border-slate-300 py-1 px-3 rounded-[7px]">Cancel</motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-green-900 font-medium bg-green-100 py-1 px-3 rounded-[7px]"
                                >Confirm</motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.05 } }}
                        exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    >
                        <div className="w-fit flex flex-col items-center gap-5 max-w-md rounded-xl bg-white p-6 shadow-lg">
                            {(!isCreating) ? (<h2 className="text-2xl font-bold w-fit">Are you sure to {(isUpdating) ? 'rename' : 'delete'} ?</h2>) :
                                <h2 className="text-2xl font-bold w-fit">Create a category ?</h2>
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                (isCreating) ? handleCreate(categoryNameRef.current) : (isUpdating) ? handleUpdate(categoryIdRef.current, categoryNameRef.current) : handleDelete(categoryIdRef.current, document.getElementById("forceCategoryDelete")!.checked)
                            }} className="flex flex-col w-full px-5 gap-6 justify-center items-center">
                                {(isUpdating || isCreating) ? (
                                    <div className="flex flex-row gap-5 items-center justify-center">
                                        <p className="font-medium w-max">New name:</p>
                                        <input
                                            type="text"
                                            name="categoryNewName"
                                            id="categoryNewName"
                                            onChange={(e) => categoryNameRef.current = (e.target.value)}
                                            className="w-6/10 text-center border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors"
                                            placeholder={`Enter a name`}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-row gap-5 w-full items-center justify-center">
                                        <p className="font-medium w-full">Force <p>(Ignore if in use)</p></p>
                                        <input
                                            type="checkbox"
                                            name="forceCategoryDelete"
                                            id="forceCategoryDelete"
                                            className="w-6/10 text-center border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors"
                                            placeholder={`Enter a name`}
                                        />
                                    </div>
                                )}
                                <div className="w-full h-fit flex justify-center gap-5">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={clearModal}
                                        className="text-slate-800 font-medium border-2 border-slate-300 py-1 px-3 rounded-[7px]">Cancel</motion.button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-green-900 font-medium bg-green-100 py-1 px-3 rounded-[7px]"
                                    >Confirm</motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}