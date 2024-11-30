import { Alert, Button, Card, Label, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom"
import { MentorPairCreation, Response, User } from "../model/Model";
import { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import { HiInformationCircle } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_API_URL;

export default function EditMentorPairPage() {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState<User>();
    const [mentorLecturers, setMentorLecturers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [mentorLecturerId, setMentorLecturerId] = useState(-1);
    const [mentorLecturer, setMentorLecturer] = useState<User>();
    const [updating, setUpdating] = useState(false);
    const [updatingError, setUpdatingError] = useState<string | null>(null);
    const [updatingResponse, setUpdatingResponse] = useState<Response>();

    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    fetch(baseUrl + '/api/MentorPair/edit/get-student/' + studentId),
                    fetch(baseUrl + '/api/MentorPair/get-mentor-lecturers'),
                ]);
                if (!response1.ok || !response2.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result1: User = await response1.json();
                const result2: User[] = await response2.json();
                setStudent(result1);
                setMentorLecturers(result2);

                const response3 = await fetch(baseUrl + '/api/User/' + result1.preThesis.mentorPair.mentorLecturerId);
                if (!response3.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result3: User = await response3.json();
                setMentorLecturer(result3);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const backBtn = (
        <>
            <Button onClick={() => navigate(-1)}>
                Back
            </Button>
        </>
    );

    if (loading) {
        return (
            <>
                <div className="m-8">
                    {backBtn}

                    <Card className="max-w-sm mt-8">
                        <Skeleton tailwindHeight='h-5' tailwindWidth='w-full' />
                        <Skeleton tailwindHeight='h-5' tailwindWidth='w-full' />
                        <Skeleton tailwindHeight='h-5' tailwindWidth='w-full' />
                        <Skeleton tailwindHeight='h-5' tailwindWidth='w-full' />
                    </Card>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <div className="m-8">
                    {backBtn}

                    <Alert color="failure" icon={HiInformationCircle} className='mt-8'>
                        <span className="font-medium">Error!</span> {error}
                    </Alert>
                </div>
            </>
        )
    }

    const updateMentorPair = async (mentorPair: MentorPairCreation) => {
        setUpdating(true);
        try {
            const response = await fetch(baseUrl + '/api/MentorPair/edit/' + student?.preThesis.mentorPair.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mentorPair),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUpdatingResponse(data);

            const countdownFunction = (count: number) => {
                if (count >= 0) {
                    setCountdown(count);
                    setTimeout(() => countdownFunction(count - 1), 1000);
                } else {
                    navigate(-1);
                }
            };

            countdownFunction(5);
        } catch (err: unknown) {
            setUpdatingError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setUpdating(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mentorLecturerId == -1) {
            const mentorPair: MentorPairCreation = { preThesisId: Number(student?.preThesis.id), mentorLecturerId: Number(mentorLecturer?.id) };
            updateMentorPair(mentorPair);
        } else {
            const mentorPair: MentorPairCreation = { preThesisId: Number(student?.preThesis.id), mentorLecturerId };
            updateMentorPair(mentorPair);
        }
    };

    return (
        <>
            <div className="m-8">
                {backBtn}

                <Card className="mt-8 max-w-md">
                    <h1>Edit Mentor Pair</h1>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="studentEmail" value="Student Email" />
                            </div>
                            <TextInput id="studentEmail" type="text" placeholder={student?.email} disabled />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="preThesisName" value="Pre Thesis Name" />
                            </div>
                            <Textarea id="preThesisName" placeholder={student?.preThesis.preThesisName} required rows={4} disabled className="resize-none" />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="preThesisLink" value="Pre Thesis Link" />
                            </div>
                            <a href={student?.preThesis.preThesisLink} target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">{student?.preThesis.preThesisLink}</a>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mentorLecturer" value="Select Mentor Lecturer" />
                            </div>
                            <Select id="mentorLecturer" value={mentorLecturerId} required onChange={(e) => setMentorLecturerId(Number(e.target.value))}>
                                <option value={mentorLecturer?.id}>{mentorLecturer?.email}</option>
                                {mentorLecturers.map((mentor) => (
                                    <option value={mentor.id} key={mentor.id}>{mentor.email}</option>
                                ))}
                            </Select>
                        </div>

                        {updating ? (
                            <>
                                <Button type="button">
                                    <Spinner aria-label="Spinner button example" size="sm" />
                                    <span className="pl-3">Loading...</span>
                                </Button>
                            </>
                        ) : updatingResponse?.message ? (
                            <>
                                <Button type="button">Submit</Button>
                            </>
                        ) : (
                            <>
                                <Button type="submit">Submit</Button>
                            </>
                        )}
                    </form>

                    {!updatingResponse?.message && updatingError && (
                        <>
                            <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium">Error!</span> {updatingError}
                            </Alert>
                        </>
                    )}

                    {updatingResponse?.message && (
                        <>
                            <Alert color="info">
                                <span className="font-medium">{updatingResponse?.message}</span> We will redirect you back to Admin Dashboard in {countdown} seconds.
                            </Alert>
                        </>
                    )}
                </Card>
            </div>
        </>
    )
}