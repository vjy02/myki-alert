import HeroLatestReport from "./hero-latest-reports";

export default function Header() {
  return (
    <div className="flex flex-col gap-4 items-start h-full w-fit">
      <h2 className="text-2xl font-bold">Information</h2>
      <p className="max-w-full">Reports are <span className="font-bold">location</span> based, you must be in a <span className="font-bold">1km</span> radius to a station to select it's line. Login functionality is not yet ready, any suggestions for account only or website features can be suggested <a className="underline" href="https://forms.gle/TfLyoV5M3VRANZJU8"target="_blank" rel="noopener noreferrer">here</a>.
      </p>
    </div>
  );
}
