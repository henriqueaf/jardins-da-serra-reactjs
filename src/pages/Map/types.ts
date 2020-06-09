export interface Allotment {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Quatrain {
  name: string;
  allotments: Allotment[];
}
