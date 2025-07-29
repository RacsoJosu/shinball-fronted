import { PropsWithChildren } from "react";

export function HeaderPage({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4 flex-1 ">{children}</div>;
}

export default HeaderPage;
