import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function NotFoundPage() {
    return (
        <>
            <div className="m-8">
                <Alert color="failure" icon={HiInformationCircle} className='mt-8'>
                    <span className="font-medium">404 Page Not Found!</span>
                </Alert>
            </div>
        </>
    )
}