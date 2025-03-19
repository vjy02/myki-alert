import InfiniteStationScroll from "./infinite-station-scroll";

export default function HeroLatestReport() {
  return (
    <div className="flex flex-col">
      <div className="w-full flex items-end justify-between mb-6">
        <h3 className="text-2xl font-bold md:text-3xl">Latest Reports</h3>
      </div>
      <InfiniteStationScroll />
    </div>
  );
}
