import HeroLatestReport from "./hero-latest-reports";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 items-start h-full w-fit">
      <h2 className="text-3xl font-bold">Hey!</h2>
      <p className="max-w-full">Welcome to the Melbourne inspector watch space. Reports are location based, you must be near a station to select it. Login functionality not yet ready, any suggestions for account only features are welcome.
      </p>
    </div>
  );
}
