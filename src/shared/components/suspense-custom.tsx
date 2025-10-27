import { ComponentProps, Fragment, PropsWithChildren, ReactElement } from "react";

type SuspenseCustomProps = PropsWithChildren<ComponentProps<"div">> & {
  isSuspense: boolean;
  fallback: () => ReactElement | null;
};
function SuspenseCustom({ isSuspense, fallback, children }: SuspenseCustomProps) {
  return <Fragment>{isSuspense ? fallback() : children}</Fragment>;
}

export default SuspenseCustom;
