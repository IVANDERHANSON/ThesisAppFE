import { Alert, Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { User } from "../../../model/Model";
import { HiInformationCircle } from "react-icons/hi";
import MentoringSessionsMenu from "./MentoringSessionsMenu";
import ThesisDefenceMenu from "./ThesisDefenceMenu";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

export default function LecturerDashboard() {
    const lecturerId = 2;
    const [clickedBtn, setClickedBtn] = useState('MentoringSessions');

    const [students, setStudents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch(baseUrl + '/api/lecturer-dashboard/' + lecturerId);
                if (!response1.ok) {
                    throw new Error(`HTTP error! status: ${response1.status}`);
                }
                const result1: User[] = await response1.json();
                setStudents(result1);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <>
                <div className="m-8">
                    <Button color="gray">
                        <Spinner aria-label="User Table Spinner" size="sm" />
                        <span className="pl-3">Loading...</span>
                    </Button>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <div className="m-8">
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Error!</span> {error}
                    </Alert>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="m-8">
                <h1 className="my-4">Lecturer Dashboard</h1>

                <Button.Group>
                    <Button color="gray" onClick={() => setClickedBtn('MentoringSessions')}>Mentoring Sessions</Button>
                    <Button color="gray" onClick={() => setClickedBtn('ThesisDefence')}>Thesis Defence</Button>
                </Button.Group>

                {clickedBtn === 'MentoringSessions' && (
                    students.filter(student => student && student.preThesis && student.preThesis.mentorPair && student.preThesis.mentorPair.mentorLecturerId === lecturerId).map((student) => (
                        <Card className="my-4" key={student.id}>
                            <p className="font-bold tracking-tight text-gray-900 dark:text-white">Student Id: <span className="font-normal text-gray-700 dark:text-gray-400">{student.id}</span></p>
                            <p className="font-bold tracking-tight text-gray-900 dark:text-white">Student Email: <span className="font-normal text-gray-700 dark:text-gray-400">{student.email}</span></p>
                            <p className="font-bold tracking-tight text-gray-900 dark:text-white">Pre Thesis Name: <span className="font-normal text-gray-700 dark:text-gray-400">{student.preThesis.preThesisName}</span></p>
                            <p className="font-bold tracking-tight text-gray-900 dark:text-white">Pre Thesis Link: <span className="font-normal text-gray-700 dark:text-gray-400">
                                <Link to={student.preThesis.preThesisLink} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500' target="_blank" rel="noopener noreferrer">
                                    {student.preThesis.preThesisLink}
                                </Link>
                            </span></p>
                            <MentoringSessionsMenu mentoringSessions={student.preThesis.mentorPair.mentoringSessions} />
                        </Card>
                    ))
                )}

                {clickedBtn === 'ThesisDefence' && (
                    <>
                        {students.filter(student => student && student.thesis && student.thesis.thesisDefence && student.thesis.thesisDefence.mentorLecturerId === lecturerId).map((student) => (
                            <ThesisDefenceMenu user={student} role={'Mentor Lecturer'} key={student.id} />
                        ))}

                        {students.filter(student => student && student.thesis && student.thesis.thesisDefence && student.thesis.thesisDefence.examinerLecturerId === lecturerId).map((student) => (
                            <ThesisDefenceMenu user={student} role={'Examiner Lecturer'} key={student.id} />
                        ))}
                    </>
                )}
            </div>
        </>
    )
}