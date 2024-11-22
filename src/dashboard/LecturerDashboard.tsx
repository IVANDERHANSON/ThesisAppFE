import { Button } from "flowbite-react";

export default function LecturerDashboard() {
    return (
        <>
            <div className="m-8">
                <h1 className="my-4">Lecturer Dashboard</h1>

                <Button.Group>
                    <Button color="gray">Students</Button>
                    <Button color="gray">Mentoring Sessions</Button>
                </Button.Group>
            </div>
        </>
    )
}