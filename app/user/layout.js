import { cookies } from "next/headers"
import Page from "./page";


export default function Layout({children}){
    const cookieStore = cookies()
    const token = cookieStore.get("jwt").value
    console.log("Layout get token"+token);
    

    return(<div>
        {children}
        {/* <Page  /> */}
    </div>)
}