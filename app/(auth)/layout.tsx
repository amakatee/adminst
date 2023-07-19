export default function AuthLayout({
    children
} : { 
    children: React.ReactNode
}){
    return (
        <div className="grid content-center h-full w-full ">{children}</div>
    )
}