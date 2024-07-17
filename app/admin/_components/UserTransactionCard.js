

export default function UserTransactionCard({transactionUser}){

    function taskDate(dateMilli) {
        var d = (new Date(dateMilli) + '').split(' ');
        d[2] = d[2] + ',';
    
        return [d[0], d[1], d[2], d[3]].join(' ');
    }

    return (<div className="flex gap-5 justify-between px-8 py-4 rounded-xl bg-slate-400 text-white hover:bg-slate-500 duration-300">
        <h3>{transactionUser.name} {transactionUser.surname}</h3>
        <p>{transactionUser.email}</p>
        <p>{transactionUser.transaction}</p>
        <p>{taskDate(transactionUser.transactionTime)}</p>
    </div>)
}