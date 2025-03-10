import HeroLatestReport from "./hero-latest-reports";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 items-start h-full w-fit">
      <h2 className="text-2xl font-bold">Information</h2>
      <p className="max-w-full">Reports are <span className="font-bold">location</span> based, you must be near a station to select it. Login functionality is not yet ready, any suggestions for account only features can be suggested <a>here</a>.
      </p>
    </div>
  );
}
