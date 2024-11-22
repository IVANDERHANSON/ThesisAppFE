import { Navbar } from "flowbite-react";

export default function ({ image }: { image: string }) {
    return (
        <>
            <Navbar fluid rounded>
                <Navbar.Brand href="/">
                    <img src={image} className="mr-3 h-6 sm:h-9" alt="Thesis App Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Thesis App</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link href="/">Home</Navbar.Link>
                    <Navbar.Link href="/student/dashboard">Student Dashboard</Navbar.Link>
                    <Navbar.Link href="/lecturer/dashboard">Lecturer Dashboard</Navbar.Link>
                    <Navbar.Link href="/admin/dashboard">Admin Dashboard</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}