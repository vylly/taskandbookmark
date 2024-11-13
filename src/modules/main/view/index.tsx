"use client"
import { cn } from "@/lib/utils";

export const Main = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {

  return (
    <div
      className={cn(
        'Main min-h-screen w-full',
        'flex flex-col items-center',
        'bg-background',
        className
      )}
    >
      {children}
    </div>
  );
};
