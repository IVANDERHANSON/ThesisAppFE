import { Button } from "flowbite-react";

export default function AdminDashboard() {
    return (
        <>
            <div className="m-8">
                <h1 className="my-4">Admin Dashboard</h1>

                <Button.Group>
                    <Button color="gray">Students</Button>
                    <Button color="gray">Lecturers</Button>
                    <Button color="gray">Mentoring Sessions</Button>
                </Button.Group>
            </div>
        </>
    )
}