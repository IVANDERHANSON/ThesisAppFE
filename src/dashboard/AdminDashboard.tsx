import { useState } from "react";
import { Button } from "flowbite-react";
import UserTable from "../components/tables/UserTable";

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

                <div className="my-4">
                    <UserTable isClicked={clickedBtn === 'Students'} clickedBtn={clickedBtn} />
                </div>

                <div className="my-4">
                    <UserTable isClicked={clickedBtn === 'Lecturers'} clickedBtn={clickedBtn} />
                </div>
            </div>
        </>
    )
}