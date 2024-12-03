import { Button, Card } from "flowbite-react";
import { User } from "../../../model/Model";

export default function PreThesisMenu({ user }: { user: User }) {
    return (
        <>
            <Card className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {user.preThesis?.preThesisName}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Student Id: {user.preThesis?.studentId}
                </p>
                <Button onClick={() => {
                    window.open(user.preThesis?.preThesisLink, '_blank', 'noopener, noreferrer')
                }}>
                    Link
                </Button>
            </Card>
        </>
    );
}