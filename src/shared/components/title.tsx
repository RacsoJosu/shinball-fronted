import { cn } from "@/lib/utils";

type TitleType = {
  title: string;
};

export function Title(
  props: TitleType & React.HTMLAttributes<HTMLHeadingElement>
) {
  return (
    <h1 className={cn("font-bold text-3xl text-primary-400", props.className)}>
      {props.title}
    </h1>
  );
}
