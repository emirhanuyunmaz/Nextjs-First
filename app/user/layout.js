


export default function Layout({children}){
    //Cookie ler client side tarafında alınamasığı için bu kusumda alınmaya çalışıldı
    // const cookieStore = cookies()
    // const token = cookieStore.get("jwt").value
    // console.log("Layout get token"+token);
    

    return(<div>
        {children}
        {/* <Page  /> */}
    </div>)
}