export const lineIdToName: Record<string, string> = {
    "1": "Flemington Racecourse",
    "2": "Alamein",
    "3": "Belgrave",
    "4": "Cranbourne",
    "5": "Craigieburn",
    "6": "Frankston",
    "7": "Glen Waverley",
    "8": "Hurstbridge",
    "9": "Lilydale",
    "10": "Mernda",
    "11": "Pakenham",
    "12": "Flemington Racecourse",
    "13": "Sandringham",
    "14": "Stony Point",
    "15": "Sunbury",
    "16": "Upfield",
    "17": "Werribee",
    "18": "Williamstown",
    "19": "City Loop",
};

export const defaultReportedLines = Object.keys(lineIdToName).flatMap((lineId) => [
    { line_id: Number(lineId), towardsCity: true, count: 0, reportedDateTime: null },
    { line_id: Number(lineId), towardsCity: false, count: 0, reportedDateTime: null },
  ]);
  
