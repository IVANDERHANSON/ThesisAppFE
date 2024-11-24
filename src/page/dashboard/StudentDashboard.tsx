import { Button } from "flowbite-react";

export default function StudentDashboard() {
    return (
        <>
            <div className="m-8">
                <h1 className="my-4">Student Dashboard</h1>

                <Button.Group>
                    <Button color="gray">Pre Thesis</Button>
                    <Button color="gray">Mentor</Button>
                    <Button color="gray">Mentoring Sessions</Button>
                    <Button color="gray">Thesis</Button>
                    <Button color="gray">Thesis Defence</Button>
                </Button.Group>
            </div>
        </>
    )
}