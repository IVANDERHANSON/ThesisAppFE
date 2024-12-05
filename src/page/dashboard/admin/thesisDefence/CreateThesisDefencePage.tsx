import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Response, ThesisDefenceCreation, User } from "../../../../model/Model";
import { Alert, Button, Card, Label, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import Skeleton from "../../../../components/Skeleton";
import { HiInformationCircle } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_API_URL;

const timeOptions = [
    '07:20:00',
    '09:20:00',
    '11:20:00',
    '13:20:00',
    '15:20:00',
    '17:20:00'
];

export default function () {
    const { thesisId } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState<User>();
    const [mentorLecturer, setMentorLecturer] = useState<User>();
    const [examinerLecturers, setExaminerLecturers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [mentorLecturerId, setMentorLecturerId] = useState(-1);
    const [examinerLecturerId, setExaminerLecturerId] = useState(-1);
    const [date, setDate] = useState("");
    const [time, setTime] = useState<string>(timeOptions[0]);
    const [meetingLink, setMeetingLink] = useState("");

    const [posting, setPosting] = useState(false);
    const [postingError, setPostingError] = useState<string | null>(null);
    const [postingResponse, setPostingResponse] = useState<Response>();

    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch(baseUrl + '/api/ThesisDefence/get-student/' + thesisId);
                if (!response1.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result1: User = await response1.json();
                setStudent(result1);
                setMentorLecturerId(result1.preThesis.mentorPair.mentorLecturerId);

                const response2 = await fetch(baseUrl + '/api/User/' + result1.preThesis.mentorPair.mentorLecturerId);
                if (!response2.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result2: User = await response2.json();
                setMentorLecturer(result2);

                const response3 = await fetch(baseUrl + '/api/ThesisDefence/get-examiner-lecturers/' + result2.id);
                if (!response3.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result3: User[] = await response3.json();
                setExaminerLecturers(result3);
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

    const postThesisDefence = async (thesisDefence: ThesisDefenceCreation) => {
        setPosting(true);
        try {
            const response = await fetch(baseUrl + '/api/ThesisDefence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(thesisDefence),
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

        if (!meetingLink.startsWith('https://')) {
            return;
        }

        const id = Number(thesisId);
        const schedule = date + 'T' + time;
        if (examinerLecturerId == -1) {
            const thesisDefence: ThesisDefenceCreation = {
                thesisId: id,
                mentorLecturerId,
                examinerLecturerId: examinerLecturers[0]?.id,
                schedule,
                meetingLink
            };
            postThesisDefence(thesisDefence);
        } else {
            const thesisDefence: ThesisDefenceCreation = {
                thesisId: id,
                mentorLecturerId,
                examinerLecturerId,
                schedule,
                meetingLink
            };
            postThesisDefence(thesisDefence);
        }
    };

    return (
        <>
            <div className="m-8">
                {backBtn}

                <Card className="mt-8 max-w-md">
                    <h1>Create Thesis Defence</h1>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="studentEmail" value="Student Email" />
                            </div>
                            <TextInput id="studentEmail" type="text" placeholder={student?.email} disabled />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="thesisName" value="Thesis Name" />
                            </div>
                            <Textarea id="thesisName" placeholder={student?.thesis.thesisName} required rows={4} disabled className="resize-none" />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="thesisLink" value="Thesis Link" />
                            </div>
                            <a href={student?.thesis.thesisLink} target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">{student?.thesis.thesisLink}</a>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mentorLecturerEmail" value="Mentor Lecturer Email" />
                            </div>
                            <TextInput id="mentorLecturerEmail" type="text" placeholder={mentorLecturer?.email} disabled />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="examinerLecturer" value="Select Examiner Lecturer" />
                            </div>
                            <Select id="examinerLecturer" value={examinerLecturerId} required onChange={(e) => setExaminerLecturerId(Number(e.target.value))}>
                                {examinerLecturers.map((examinerLecturer) => (
                                    <option value={examinerLecturer.id} key={examinerLecturer.id}>{examinerLecturer.email}</option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value="Date" />
                            </div>
                            <TextInput
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="time" value="Time" />
                            </div>
                            <Select id="time" value={time} required onChange={(e) => setTime(e.target.value)}>
                                {timeOptions.map((timeOption, index) => (
                                    <option value={timeOption} key={index + 1}>{timeOption}</option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="meetingLink" value="Meeting Link" />
                            </div>
                            <TextInput
                                id="meetingLink"
                                type="text"
                                placeholder="Meeting Link"
                                value={meetingLink}
                                onChange={(e) => {
                                    setMeetingLink(e.target.value);
                                    if (!e.target.value.startsWith('https://')) {
                                        setPostingError('The Meeting Link must start with https://');
                                    } else {
                                        setPostingError(null);
                                    }
                                }}
                                required />
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