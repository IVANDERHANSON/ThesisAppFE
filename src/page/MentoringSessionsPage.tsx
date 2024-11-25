import { Alert, Button, Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MentoringSession } from "../model/Model";
import { HiInformationCircle } from "react-icons/hi";

const baseUrl = import.meta.env.VITE_API_URL;

export default function MentoringSessionsPage() {
    const { mentorPairId } = useParams();
    const navigate = useNavigate();

    const [mentoringSessions, setMentoringSessions] = useState<MentoringSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl + '/api/MentoringSession/mentor-pair/' + mentorPairId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: MentoringSession[] = await response.json();
                setMentoringSessions(result);
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

                    <Button color="gray" className="mt-8">
                        <Spinner aria-label="Mentoring Session Table Spinner" size="sm" />
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
                    {backBtn}

                    <Alert color="failure" icon={HiInformationCircle} className="mt-8">
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

                <div className='overflow-x-auto mt-8'>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Id</Table.HeadCell>
                            <Table.HeadCell>Mentor Pair Id</Table.HeadCell>
                            <Table.HeadCell>Schedule</Table.HeadCell>
                            <Table.HeadCell>Meeting Link</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {mentoringSessions.slice(0, 3).map((mentoringSession) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={mentoringSession.id}>
                                    <Table.Cell>{mentoringSession.id}</Table.Cell>
                                    <Table.Cell>{mentoringSession.mentorPairId}</Table.Cell>
                                    <Table.Cell>{mentoringSession.schedule}</Table.Cell>
                                    <Table.Cell>{mentoringSession.meetingLink}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}