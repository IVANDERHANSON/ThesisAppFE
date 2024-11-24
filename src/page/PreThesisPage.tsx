import { Alert, Button, Card } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { PreThesis } from "../model/Model";
import Skeleton from "../components/Skeleton";

const baseUrl = import.meta.env.VITE_API_URL;

export default function PreThesisPage() {
    const { preThesisId } = useParams();
    const navigate = useNavigate();

    const [preThesis, setPreThesis] = useState<PreThesis>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl + '/api/PreThesis/' + preThesisId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: PreThesis = await response.json();
                setPreThesis(result);
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
                <div className="m-8">
                    <Button onClick={() => navigate(-1)}>
                        Back
                    </Button>

                    <Card className="max-w-sm mt-8">
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
                    <Button onClick={() => navigate(-1)}>
                        Back
                    </Button>

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
                <Button onClick={() => navigate(-1)}>
                    Back
                </Button>

                <Card className="max-w-sm mt-8">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {preThesis?.preThesisName}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Student Id: {preThesis?.studentId}
                    </p>
                    <Button onClick={() => {
                        window.open(preThesis?.preThesisLink, '_blank', 'noopener, noreferrer')
                    }}>
                        Link
                    </Button>
                </Card>
            </div>
        </>
    )
}