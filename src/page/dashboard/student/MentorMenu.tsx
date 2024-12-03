import { Card } from "flowbite-react";
import { User } from "../../../model/Model";

export default function MentorMenu({ mentor }: { mentor: User }) {
    return (
        <>
            <Card className="max-w-sm">
                <p className="font-bold tracking-tight text-gray-900 dark:text-white">Mentor Lecturer</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Email: </span>{mentor.email}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <span className="font-bold tracking-tight text-gray-900 dark:text-white">Role: </span>{mentor.role}
                </p>
            </Card>
        </>
    );
}