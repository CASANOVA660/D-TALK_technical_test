import { cn } from '../../utils/utils'

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "rounded-lg border border-slate-200 bg-white shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}