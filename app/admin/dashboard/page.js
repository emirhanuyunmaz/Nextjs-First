import DashboardGender from "../_components/DashboardGender";
import DashboardLatesTransaction from "../_components/DashboardLatesTransaction";
import DashboardTotalUserCard from "../_components/DashboardTotalUserCard";

export default function Dashboard(){
    return(<div className="flex flex-col mt-10 mx-8 mb-10">
        <div className="flex flex-col justify-center md:justify-start items-center md:flex-row gap-5">
            <DashboardTotalUserCard/>
            <DashboardGender/>
        </div>
        
        <DashboardLatesTransaction/>
    </div>)
}