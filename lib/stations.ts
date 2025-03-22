export const lineIdToName: Record<string, string> = {
    "1": "Alamein",
    "2": "Belgrave",
    "3": "Cranbourne",
    "4": "Craigieburn",
    "5": "Frankston",
    "6": "Glen Waverley",
    "7": "Hurstbridge",
    "8": "Lilydale",
    "9": "Mernda",
    "10": "Pakenham",
    "11": "Flemington Racecourse",
    "12": "Sandringham",
    "13": "Stony Point - Frankston",
    "14": "Sunbury",
    "15": "Upfield",
    "16": "Werribee",
    "17": "Williamstown",
};


export const defaultReportedLines = Object.keys(lineIdToName).flatMap((lineId) => [
    { line_id: Number(lineId), towardsCity: true, count: 0, reportedDateTime: null },
    { line_id: Number(lineId), towardsCity: false, count: 0, reportedDateTime: null },
  ]);
  
