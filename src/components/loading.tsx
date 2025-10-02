import { cn } from "@/lib/utils";

export default function Loading({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "bg-background fixed top-0 z-10 flex h-screen w-screen",
        className,
      )}
    >
      <div
        suppressHydrationWarning
        className="relative m-auto flex flex-col items-center gap-2"
      >
        <span className="border-primary h-10 w-10 animate-spin rounded-full border-2 border-b-5" />
        <span className="relative z-20 text-sm font-semibold">
          {text || "Loading..."}
        </span>
      </div>
    </section>
  );
}