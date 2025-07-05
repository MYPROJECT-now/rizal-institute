
type Props = {
    children: React.ReactNode
}

const PortalLayout = ({ children }: Props) => {
    
    return (
        
        <div className="min-h-screen w-full flex flex-row">
            {children}
        </div>
        
    )
}

export default PortalLayout;