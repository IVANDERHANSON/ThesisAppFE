import { useEffect, useState } from "react";
import { MentoringSession } from "../../../../model/Model";
import { Alert, Button, Spinner, Table } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

export default function MentoringSessionTable() {
    const [mentoringSessions, setMentoringSessions] = useState<MentoringSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl + '/api/MentoringSession');
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

    if (loading) {
        return (
            <>
                <div className="flex flex-row gap-3">
                    <Button color="gray">
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
                <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">Error!</span> {error}
                </Alert>
            </>
        )
    }

    return (
        <>
            <div className='overflow-x-auto'>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Mentor Pair Id</Table.HeadCell>
                        <Table.HeadCell>Schedule</Table.HeadCell>
                        <Table.HeadCell>Meeting Link</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {mentoringSessions.map((mentoringSession) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={mentoringSession.id}>
                                <Table.Cell>{mentoringSession.id}</Table.Cell>
                                <Table.Cell>{mentoringSession.mentorPairId}</Table.Cell>
                                <Table.Cell>{mentoringSession.schedule}</Table.Cell>
                                <Table.Cell>
                                    <Link to={mentoringSession.meetingLink} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500' target="_blank" rel="noopener noreferrer">
                                        {mentoringSession.meetingLink}
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}