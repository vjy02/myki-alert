import InfiniteStationScroll from "./infinite-station-scroll";
import StationList from "./infinite-station-scroll";
import StationPill from "./station-pill";

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
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">Latest Reports</h3>
        <InfiniteStationScroll />
    </div>
  );
}
