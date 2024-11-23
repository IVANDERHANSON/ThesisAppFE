export default function Skeleton({tailwindHeight, tailwindWidth}: {tailwindHeight: string, tailwindWidth: string}) {
    const style = tailwindHeight+' '+tailwindWidth+' bg-gray-200 rounded-full animate-pulse';
    
    return (
        <>
            <div className={style}></div>
        </>
    )
}