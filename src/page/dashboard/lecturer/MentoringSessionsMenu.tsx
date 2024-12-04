import { Table } from "flowbite-react";
import { MentoringSession } from "../../../model/Model";
import { Link } from "react-router-dom";

export default function MentoringSessionsMenu({ mentoringSessions }: { mentoringSessions: MentoringSession[] }) {
    return (
        <>
            <div className='overflow-x-auto'>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Schedule</Table.HeadCell>
                        <Table.HeadCell>Meeting Link</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {mentoringSessions.map((mentoringSession) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={mentoringSession.id}>
                                <Table.Cell>{mentoringSession.id}</Table.Cell>
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
            </div >
        </>
    );
}