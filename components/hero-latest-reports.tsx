import InfiniteStationScroll from "./infinite-station-scroll";

const TRAIN_LINES_DICT = {
  Alamein: 1,
  Belgrave: 2,
  Cranbourne: 3,
  Craigieburn: 4,
  Frankston: 5,
  "Glen Waverley": 6,
  Hurstbridge: 7,
  Lilydale: 8,
  Mernda: 9,
  Pakenham: 10,
  "Flemington Racecourse": 11,
  Sandringham: 12,
  "Stony Point": 13,
  Sunbury: 14,
  Upfield: 15,
  Werribee: 16,
  Williamstown: 17,
  "City Loop": 18,
};

export default function HeroLatestReport() {
  return (
    <div className="flex flex-col">
      <div className="w-full flex items-end justify-between mb-4">
        <h3 className="text-2xl font-semibold">Latest Reports</h3>
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <span className="text-xs md:text-md">Visit Dashboard</span>
          <i className="fas fa-external-link-alt ml-2 text-xs"></i>
        </a>
      </div>
      <InfiniteStationScroll />
    </div>
  );
}
