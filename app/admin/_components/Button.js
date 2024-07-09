"use client"

export default function Button ({name,onClick}){
    return(<button className="bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-xl duration-500" onClick={onClick}>
        {name}
    </button>)
}