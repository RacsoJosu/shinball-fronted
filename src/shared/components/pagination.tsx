import {
  LucideArrowLeft,
  LucideArrowLeftToLine,
  LucideArrowRight,
  LucideArrowRightToLine,
} from "lucide-react";
import { useSearchParams } from "react-router";
import { Button } from "./button";

export function Pagination({ totalPages }: Readonly<{ totalPages: number }>) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", "1");

            return params;
          });
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === 1}
        type="button"
      >
        <LucideArrowLeftToLine className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>
      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          const lastPage = Math.max(parseInt(searchParams.get("page") ?? "1", 10) - 1, 1);

          setSearchParams((prev) => ({ ...prev, page: lastPage.toString() }));
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === 1}
        type="button"
      >
        <LucideArrowLeft className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>

      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          const nextPage = parseInt(searchParams.get("page") ?? "1", 10) + 1;

          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", nextPage.toString());
            return params;
          });
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === totalPages}
        type="button"
      >
        <LucideArrowRight className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>
      <Button
        className="size-auto rounded-full bg-primary-400 mt-0 p-1"
        onClick={() => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", totalPages?.toString());

            return params;
          });
        }}
        disabled={Math.max(Number(searchParams.get("page")), 1) === totalPages}
        type="button"
      >
        <LucideArrowRightToLine className="text-white hover:text-white bg-transparent rounded-full size-4" />
      </Button>

      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {Math.max(Number(searchParams.get("page")), 1)} of {totalPages}
        </strong>
      </span>
    </div>
  );
}
