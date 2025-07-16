declare module "string-similarity" {
  export function compareTwoStrings(str1: string, str2: string): number;
  export function findBestMatch(mainString: string, targetStrings: string[]): {
    bestMatch: { target: string; rating: number };
    ratings: { target: string; rating: number }[];
  };
}
