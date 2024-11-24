import { useState, useEffect } from 'react';
import { User } from "../../model/Model";
import { Alert, Table, Button, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

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
                            <Table.HeadCell>Thesis</Table.HeadCell>
                        </>)}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users.slice(0, 5).map((user) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>
                                <Table.Cell>{user.id}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.password}</Table.Cell>
                                <Table.Cell>{user.role}</Table.Cell>
                                {clickedBtn === 'Students' && (user.preThesis !== null ? (<>
                                    <Table.Cell>
                                        <Button onClick={() => {
                                            window.location.href = ('/pre-thesis/' + user.preThesis.id)
                                        }}>
                                            View
                                        </Button>
                                    </Table.Cell>
                                </>) : (<>
                                    <Table.Cell>N/A</Table.Cell>
                                </>))}
                                {clickedBtn === 'Students' && (user.thesis !== null ? (<>
                                    <Table.Cell>
                                        <Button onClick={() => {
                                            window.location.href = ('/thesis/' + user.thesis.id)
                                        }}>
                                            View
                                        </Button>
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