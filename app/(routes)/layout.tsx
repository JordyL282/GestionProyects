import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "../../components/NavBar";


export default function LayoutDashboard({children}: {children: React.ReactElement}){
    return(
        <div className="flex w-full h-full">
            <div className="hidden xl:block w-60 h-full xl:fixed">
                <Sidebar/>
            </div>
            <div className="w-full xl:ml-60">
                <Navbar />
            <div className="p-6 bg-[#fafbfc] dark:bg-secondary">
                {children}
                
                </div>
            </div>
        </div>
    )
}