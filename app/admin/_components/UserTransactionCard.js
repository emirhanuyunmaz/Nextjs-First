

export default function UserTransactionCard({transactionUser}){

    function taskDate(dateMilli) {
        var d = (new Date(dateMilli) + '').split(' ');
        d[2] = d[2] + ',';
    
        return [d[0], d[1], d[2], d[3]].join(' ');
    }

    return (<div className="grid grid-rows-4 md:grid-rows-1 md:items-center md:justify-center md:grid-cols-4 gap-5  px-8 py-4 rounded-xl bg-slate-500 text-white hover:bg-slate-600 duration-300">
        <h3>{transactionUser.name} {transactionUser.surname}</h3>
        <p className="md:text-left" >{transactionUser.email}</p>
        <p className="md:text-right" >{transactionUser.transaction}</p>
        <p>{taskDate(transactionUser.transactionTime)}</p>
    </div>)
}