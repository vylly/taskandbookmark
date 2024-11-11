"use client"
import { cn } from "@/lib/utils";

export const Main = ({
  children,
}: {
  children?: React.ReactNode;
}) => {

  return (
    <div
      className={cn(
        'Main min-h-screen w-full',
        'flex flex-col items-center',
        'bg-background'
      )}
    >
      {children}
    </div>
  );
};
