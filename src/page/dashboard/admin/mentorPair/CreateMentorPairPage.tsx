import { Alert, Button, Card, Label, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MentorPairCreation, Response, User } from "../../../../model/Model";
import Skeleton from "../../../../components/Skeleton";
import { HiInformationCircle } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_API_URL;

export default function CreateMentorPairPage() {
    const { preThesisId } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState<User>();
    const [mentorLecturers, setMentorLecturers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [mentorLecturerId, setMentorLecturerId] = useState(-1);
    const [posting, setPosting] = useState(false);
    const [postingError, setPostingError] = useState<string | null>(null);
    const [postingResponse, setPostingResponse] = useState<Response>();

    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    fetch(baseUrl + '/api/MentorPair/get-student/' + preThesisId),
                    fetch(baseUrl + '/api/MentorPair/get-mentor-lecturers'),
                ]);
                if (!response1.ok || !response2.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result1: User = await response1.json();
                const result2: User[] = await response2.json();
                setStudent(result1);
                setMentorLecturers(result2);
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

    const postMentorPair = async (mentorPair: MentorPairCreation) => {
        setPosting(true);
        try {
            const response = await fetch(baseUrl + '/api/MentorPair', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mentorPair),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPostingResponse(data);

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
            setPostingError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setPosting(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const id = Number(preThesisId);
        if (mentorLecturerId == -1) {
            const mentorPair: MentorPairCreation = { preThesisId: id, mentorLecturerId: mentorLecturers[0]?.id };
            postMentorPair(mentorPair);
        } else {
            const mentorPair: MentorPairCreation = { preThesisId: id, mentorLecturerId };
            postMentorPair(mentorPair);
        }
    };

    return (
        <>
            <div className="m-8">
                {backBtn}

                <Card className="mt-8 max-w-md">
                    <h1>Create Mentor Pair</h1>

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
                                {mentorLecturers.map((mentorLecturer) => (
                                    <option value={mentorLecturer.id} key={mentorLecturer.id}>{mentorLecturer.email}</option>
                                ))}
                            </Select>
                        </div>
                        
                        {posting ? (
                            <>
                                <Button type="button">
                                    <Spinner aria-label="Spinner button example" size="sm" />
                                    <span className="pl-3">Loading...</span>
                                </Button>
                            </>
                        ) : postingResponse?.message ? (
                            <>
                                <Button type="button">Submit</Button>
                            </>
                        ) : (
                            <>
                                <Button type="submit">Submit</Button>
                            </>
                        )}
                    </form>

                    {!postingResponse?.message && postingError && (
                        <>
                            <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium">Error!</span> {postingError}
                            </Alert>
                        </>
                    )}

                    {postingResponse?.message && (
                        <>
                            <Alert color="info">
                                <span className="font-medium">{postingResponse?.message}</span> We will redirect you back to Admin Dashboard in {countdown} seconds.
                            </Alert>
                        </>
                    )}
                </Card>
            </div>
        </>
    )
}