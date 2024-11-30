import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../model/Model";
import { Alert, Button, Card, Label, Select, Textarea, TextInput } from "flowbite-react";
import Skeleton from "../components/Skeleton";
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

    const [examinerLecturerId, setExaminerLecturerId] = useState(-1);
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch(baseUrl + '/api/ThesisDefence/get-student/' + thesisId);
                if (!response1.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result1: User = await response1.json();
                setStudent(result1);

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

    return (
        <>
            <div className="m-8">
                {backBtn}

                <Card className="mt-8 max-w-md">
                    <h1>Create Thesis Defence</h1>

                    <form className="flex flex-col gap-4">
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
                            <Textarea id="preThesisName" placeholder={student?.thesis.thesisName} required rows={4} disabled className="resize-none" />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="preThesisLink" value="Pre Thesis Link" />
                            </div>
                            <a href={student?.thesis.thesisLink} target="_blank" rel="noopener noreferrer" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">{student?.preThesis.preThesisLink}</a>
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
                            <TextInput id="date" type="date" required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="time" value="Time" />
                            </div>
                            <Select id="time" value={time} required onChange={(e) => setTime(e.target.value)}>
                                {timeOptions.map((timeOption) => (
                                    <option value={timeOption}>{timeOption}</option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="meetingLink" value="Meeting Link" />
                            </div>
                            <TextInput id="meetingLink" type="text" placeholder="Meeting Link" required />
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </Card>
            </div>
        </>
    )
}