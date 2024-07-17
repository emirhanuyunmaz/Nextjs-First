import DashboardGender from "../_components/DashboardGender";
import DashboardLatesTransaction from "../_components/DashboardLatesTransaction";
import DashboardTotalUserCard from "../_components/DashboardTotalUserCard";

export default function Dashboard(){
    return(<div className="flex flex-col mt-10 mx-8">
        <div className="flex gap-5">
        <DashboardTotalUserCard/>
        <DashboardGender/>
        </div>
        <DashboardLatesTransaction/>
    </div>)
}