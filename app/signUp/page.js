

export default function Page(){
    return (<div className="flex w-[100%] h-[100vh] justify-center items-center">
        <form action="">
            <input type="text" className="outline-none border-2 border-gray-600 rounded-2xl px-2 py-1" placeholder="Name" />
            <input type="password" placeholder="Password" />
        </form>
    </div>)
}