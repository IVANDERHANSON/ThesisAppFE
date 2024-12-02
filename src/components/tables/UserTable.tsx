import { useState, useEffect } from 'react';
import { User } from "../../model/Model";
import { Alert, Table, Button, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

export default function UserTable({ clickedBtn }: { clickedBtn: string }) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl + '/api/' + clickedBtn);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: User[] = await response.json();
                setUsers(result);
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
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Password</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        {clickedBtn === "Students" && (<>
                            <Table.HeadCell>Pre Thesis</Table.HeadCell>
                            <Table.HeadCell>Mentor Pair</Table.HeadCell>
                            <Table.HeadCell>Mentoring Sessions</Table.HeadCell>
                            <Table.HeadCell>Thesis</Table.HeadCell>
                            <Table.HeadCell>Thesis Defence</Table.HeadCell>
                        </>)}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users.map((user) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>
                                <Table.Cell>{user.id}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.password}</Table.Cell>
                                <Table.Cell>{user.role}</Table.Cell>

                                {clickedBtn === 'Students' && (user.preThesis !== null ? (<>
                                    <Table.Cell>
                                        <Link to={'/pre-thesis/' + user.preThesis.id} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                                            View
                                        </Link>
                                    </Table.Cell>
                                </>) : (<>
                                    <Table.Cell>N/A</Table.Cell>
                                </>))}

                                {clickedBtn === 'Students' && ((user.preThesis !== null && user.preThesis.mentorPair !== null) ? (<>
                                    <Table.Cell>
                                        <Link to={'/edit/mentor-pair/' + user.id} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                                            Edit
                                        </Link>
                                    </Table.Cell>
                                </>) : user.preThesis !== null ? (<>
                                    <Table.Cell>
                                        <Link to={'/create/mentor-pair/' + user.preThesis.id} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                                            Create
                                        </Link>
                                    </Table.Cell>
                                </>) : (<>
                                    <Table.Cell>N/A</Table.Cell>
                                </>))}

                                {clickedBtn === 'Students' && ((user.preThesis !== null && user.preThesis.mentorPair && user.preThesis.mentorPair.mentoringSessions?.length) ? (<>
                                    <Table.Cell>
                                        <Link to={'/mentoring-sessions/' + user.preThesis.mentorPair.id} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                                            View
                                        </Link>
                                    </Table.Cell>
                                </>) : (<>
                                    <Table.Cell>N/A</Table.Cell>
                                </>))}

                                {clickedBtn === 'Students' && (user.thesis !== null ? (<>
                                    <Table.Cell>
                                        <Link to={'/thesis/' + user.thesis.id} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                                            View
                                        </Link>
                                    </Table.Cell>
                                </>) : (<>
                                    <Table.Cell>N/A</Table.Cell>
                                </>))}

                                {clickedBtn === 'Students' && ((user.thesis !== null && user.thesis.thesisDefence !== null) ? (<>
                                    <Table.Cell>
                                        <Link to={'/edit/thesis-defence/' + user.id} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                                            Edit
                                        </Link>
                                    </Table.Cell>
                                </>) : user.thesis !== null ? (<>
                                    <Table.Cell>
                                        <Link to={'/create/thesis-defence/' + user.thesis.id} className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                                            Create
                                        </Link>
                                    </Table.Cell>
                                </>) : (<>
                                    <Table.Cell>N/A</Table.Cell>
                                </>))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}