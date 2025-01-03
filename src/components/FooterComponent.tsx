import { Footer } from "flowbite-react";

export default function FooterComponent() {
    return (
        <>
            <Footer container>
                <Footer.Copyright href="/" by="Thesis App" year={2024} />
                <Footer.LinkGroup>
                    <Footer.Link href="/">Home</Footer.Link>
                    <Footer.Link href="/student/dashboard">Student Dashboard</Footer.Link>
                    <Footer.Link href="/lecturer/dashboard">Lecturer Dashboard</Footer.Link>
                    <Footer.Link href="/admin/dashboard">Admin Dashboard</Footer.Link>
                </Footer.LinkGroup>
            </Footer>
        </>
    )
}