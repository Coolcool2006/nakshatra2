export interface Nakshatra {
  id: number;
  sanskritName: string;
  englishName: string;
  rulingPlanet: string;
  deity: string;
  symbol: string;
  characteristics: string;
}

export interface NakshatraTime extends Nakshatra {
  startTime: Date;
  endTime: Date;
  currentPada?: number;
  padaEndTime?: Date;
}
