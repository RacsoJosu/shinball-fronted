
import { PropsWithChildren } from "react";

function HeaderUsers({children}: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 flex-1 p-12">
      {children}
    </div>
  );
}

export default HeaderUsers;
