import { Alert, Button, Card, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom"
import { User } from "../model/Model";
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

    return (
        <>
            <div className="m-8">
                {backBtn}

                <Card className="mt-8 max-w-md">
                    <h1>Edit Mentor Pair</h1>

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
                                {mentorLecturers.map((mentorLecturer) => (
                                    <option value={mentorLecturer.id} key={mentorLecturer.id}>{mentorLecturer.email}</option>
                                ))}
                            </Select>
                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </Card>
            </div>
        </>
    )
}