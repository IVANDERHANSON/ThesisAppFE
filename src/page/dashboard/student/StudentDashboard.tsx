import { Alert, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import PreThesisMenu from "./PreThesisMenu";
import MentorMenu from "./MentorMenu";
import MentoringSessionsMenu from "./MentoringSessionsMenu";
import ThesisMenu from "./ThesisMenu";
import ThesisDefenceMenu from "./ThesisDefenceMenu";
import { User } from "../../../model/Model";
import { HiInformationCircle } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_API_URL;

export default function StudentDashboard() {
    const studentId = 1;
    const [clickedBtn, setClickedBtn] = useState('PreThesis');

    const [student, setStudent] = useState<User | null>(null);
    const [mentorLecturer, setMentorLecturer] = useState<User | null>(null);
    const [examinerLecturer, setExaminerLecturer] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch(baseUrl + '/api/student-dashboard/' + studentId);
                if (!response1.ok) {
                    throw new Error(`HTTP error! status: ${response1.status}`);
                }
                const result1: User = await response1.json();
                setStudent(result1);

                if (result1.preThesis && result1.preThesis.mentorPair) {
                    const response2 = await fetch(baseUrl + '/api/User/' + result1.preThesis.mentorPair.mentorLecturerId);
                    if (!response2.ok) {
                        throw new Error(`HTTP error! status: ${response2.status}`);
                    }
                    const result2: User = await response2.json();
                    setMentorLecturer(result2);
                }

                if (result1.thesis && result1.thesis.thesisDefence) {
                    const response3 = await fetch(baseUrl + '/api/User/' + result1.thesis.thesisDefence.examinerLecturerId);
                    if (!response3.ok) {
                        throw new Error(`HTTP error! status: ${response3.status}`);
                    }
                    const result3: User = await response3.json();
                    setExaminerLecturer(result3);
                }
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
                <h1 className="my-4">Student Dashboard</h1>

                <Button.Group>
                    <Button color="gray" onClick={() => setClickedBtn('PreThesis')}>Pre Thesis</Button>
                    <Button color="gray" onClick={() => setClickedBtn('Mentor')}>Mentor</Button>
                    <Button color="gray" onClick={() => setClickedBtn('MentoringSessions')}>Mentoring Sessions</Button>
                    <Button color="gray" onClick={() => setClickedBtn('Thesis')}>Thesis</Button>
                    <Button color="gray" onClick={() => setClickedBtn('ThesisDefence')}>Thesis Defence</Button>
                </Button.Group>

                {student && student.preThesis && clickedBtn === 'PreThesis' && (
                    <>
                        <div className="my-4">
                            <PreThesisMenu user={student} />
                        </div>
                    </>
                )}

                {mentorLecturer && clickedBtn === 'Mentor' && (
                    <>
                        <div className="my-4">
                            <MentorMenu mentor={mentorLecturer} />
                        </div>
                    </>
                )}

                {student && student.preThesis && student.preThesis.mentorPair && student.preThesis.mentorPair.mentoringSessions[0] && clickedBtn === 'MentoringSessions' && (
                    <>
                        <div className="my-4">
                            <MentoringSessionsMenu user={student} />
                        </div>
                    </>
                )}

                {student && student.thesis && clickedBtn === 'Thesis' && (
                    <>
                        <div className="my-4">
                            <ThesisMenu user={student} />
                        </div>
                    </>
                )}

                {student && examinerLecturer && clickedBtn === 'ThesisDefence' && (
                    <>
                        <div className="my-4">
                            <ThesisDefenceMenu user={student} examiner={examinerLecturer} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}