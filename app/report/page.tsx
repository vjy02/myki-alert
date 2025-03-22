import ReportLineForm from "./report-line-form";

export default async function Page() {
  return (
    <div className="h-full gap-16 w-full flex flex-col justify-start items-center">
      <div className="flex flex-col gap-4 items-start h-full w-full">
        <h2 className="text-2xl font-bold md:text-3xl">Report</h2>
        <p className="max-w-full">
          Reports are <span className="font-bold">location</span> based, you
          must be in a <span className="font-bold">1km</span> radius to a
          station to select it's line.
        </p>
      </div>
      <ReportLineForm />
    </div>
  );
}
