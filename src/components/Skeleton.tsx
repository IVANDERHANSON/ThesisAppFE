export default function Skeleton({tailwindHeight, tailwindWidth}: {tailwindHeight: string, tailwindWidth: string}) {
    const style = tailwindHeight+' '+tailwindWidth+' h-5 w-full bg-gray-200 rounded-full animate-pulse';
    
    return (
        <>
            <div className={style}></div>
        </>
    )
}