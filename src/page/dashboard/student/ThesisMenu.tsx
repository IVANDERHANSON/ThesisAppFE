import { Button, Card } from "flowbite-react";
import { User } from "../../../model/Model";

export default function ThesisMenu({ user }: { user: User }) {
    return (
        <>
            <Card className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {user.thesis?.thesisName}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Student Id: {user.thesis?.studentId}
                </p>
                <Button onClick={() => {
                    window.open(user.thesis?.thesisLink, '_blank', 'noopener, noreferrer')
                }}>
                    Link
                </Button>
            </Card>
        </>
    );
}