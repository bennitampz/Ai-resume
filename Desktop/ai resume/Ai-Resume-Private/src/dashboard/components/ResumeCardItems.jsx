import {LoaderCircle, MoreVertical, Notebook, Pen} from "lucide-react"
import {Link, useNavigate} from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import global_api from "/service_api/global_api.js";
import { toast } from "sonner";


function ResumeCardItems({resume,refreshData}) {
    const [openAlert,setOpenAlert] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigate();
    const onDelete=()=>{
        setLoading(true);
        global_api.DeleteResumeById(resume.documentId).then(resp=>{
            console.log(resp)
            toast('Resume Deleted Successfully');
            refreshData()
            setOpenAlert(false);
            setLoading(false);
        },(err)=>setLoading(false) )
    }
    // const onMenuClick=(url)=>{     navigation(url) }
    return (
        <div className="relative">
            <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
                <div
                    className="p-14 bg-secondary flex items-center justify-center h-[300px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-lg shadow-primary bg-gradient-to-r from-indigo-600 via-purple-350 to-pink-400">
                    <Notebook/>
                </div>
                <h2 className="text-center my-1">{resume.title}</h2>
            </Link>

            {/* Dropdown outside of Link */}
            <div className="absolute top-0 right-0 p-2  ">
                <DropdownMenu >
                    <DropdownMenuTrigger className="bg-black"><MoreVertical className="h-4 w-4 cursor-pointer text-white"/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>View</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    <AlertDialog open={openAlert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and
                                    remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDelete} disabled={loading}>{loading? <LoaderCircle className='animate-spin' />:'Delete' }</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </DropdownMenu>
            </div>
        </div>
    )
}
export default ResumeCardItems
