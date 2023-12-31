'use-client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, ServerIcon } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "./button";
import toast from "react-hot-toast";


interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";

}
const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant="public"
}) => {
    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success("Api route copied")
    }
    return (
        
        <Alert className="mb-4 ">
            <ServerIcon className="w-4 h-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="flex items-center overflow-scroll">
                <code className="relative rounded bg-muted px-[3.3rem] py-[0.2rem]  font-mono text-sm ">
                    {description}
                </code>
                <Button variant="outline" size="icon" onClick={onCopy}>
                    <Copy className="w-4 h-4" />
                </Button>
                   
                
            </AlertDescription>
        </Alert>
        
    )
}
