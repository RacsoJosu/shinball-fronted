import { Fragment } from "react/jsx-runtime";
import CardDashboard from ".";

type SkeletonCardDashboardProps = {
  count?: number;
};
function SkeletonCardDashboard({ count = 1 }: SkeletonCardDashboardProps) {
  return (
    <Fragment>
      {Array.from({ length: count }).map((_, i) => (
        <CardDashboard key={i}>
          <CardDashboard.Header>
            <div className="flex items-center justify-between w-full">
              <span className="text-lg font-semibold bg-gray-500/30 animate-pulse h-4 w-[100px]">
                {}
              </span>
              {/* este es el skeleton del icon */}
              <span className="size-6 rounded-full bg-gray-500/30 animate-pulse "></span>
            </div>
          </CardDashboard.Header>
          <CardDashboard.Content>
            <p className="text-3xl h-4 w-[80px] bg-gray-500/30 animate-pulse font-bold mt-2">{}</p>
          </CardDashboard.Content>
          <CardDashboard.Footer>
            <span className="text-sm h-4 w-[60px] text-gray-500 bg-gray-500/30 animate-pulse"></span>
          </CardDashboard.Footer>
        </CardDashboard>
      ))}
    </Fragment>
  );
}

export default SkeletonCardDashboard;
