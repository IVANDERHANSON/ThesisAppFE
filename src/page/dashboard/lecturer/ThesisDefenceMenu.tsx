import { Card } from "flowbite-react";
import { User } from "../../../model/Model";
import { Link } from "react-router-dom";

export default function ThesisDefenceMenu({ user, role }: { user: User, role: string }) {
    const schedule = new Date(user.thesis.thesisDefence.schedule);
    const date = schedule.toISOString().split("T")[0];
    const hours = schedule.getHours().toString().padStart(2, "0");
    const minutes = schedule.getMinutes().toString().padStart(2, "0");
    const seconds = schedule.getSeconds().toString().padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;

    return (
        <>
            <Card className="max-w-sm my-4">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Your Role: </span>{role}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Student Email: </span>{user.email}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Thesis Name: </span>{user.thesis.thesisName}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Thesis Link: </span>
                    <Link to={user.thesis.thesisLink} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500' target="_blank" rel="noopener noreferrer">
                        {user.thesis.thesisLink}
                    </Link>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Date: </span>{date}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Time: </span>{time}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Meeting Link: </span>
                    <Link to={user.thesis.thesisDefence.meetingLink} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500' target="_blank" rel="noopener noreferrer">
                        {user.thesis.thesisDefence.meetingLink}
                    </Link>
                </p>
            </Card>
        </>
    );
}