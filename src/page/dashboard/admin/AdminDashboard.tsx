import { useState } from "react";
import { Button } from "flowbite-react";
import UserTable from "./tables/UserTable";
import MentoringSessionTable from "./tables/MentoringSessionTable";

export default function AdminDashboard() {
    const [clickedBtn, setClickedBtn] = useState('Students');

    return (
        <>
            <div className="m-8">
                <h1 className="my-4">Admin Dashboard</h1>

                <Button.Group>
                    <Button color="gray" onClick={() => setClickedBtn('Students')}>Students</Button>
                    <Button color="gray" onClick={() => setClickedBtn('Lecturers')}>Lecturers</Button>
                    <Button color="gray" onClick={() => setClickedBtn('Mentoring Sessions')}>Mentoring Sessions</Button>
                </Button.Group>

                {clickedBtn === 'Students' && (
                    <>
                        <div className="my-4">
                            <UserTable clickedBtn={clickedBtn} />
                        </div>
                    </>
                )}

                {clickedBtn === 'Lecturers' && (
                    <>
                        <div className="my-4">
                            <UserTable clickedBtn={clickedBtn} />
                        </div>
                    </>
                )}

                {clickedBtn === 'Mentoring Sessions' && (
                    <>
                        <div className="my-4">
                            <MentoringSessionTable />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}