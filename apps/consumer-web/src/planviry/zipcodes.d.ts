declare module 'zipcodes' {
  export interface ZipCodeData {
    zip: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
  }
  export const codes: Record<string, ZipCodeData>;
  export const states: {
    normalize(state: string): string;
  };
  export function lookup(zip: string | number): ZipCodeData | undefined;
  export function random(): ZipCodeData;
  export function lookupByName(city: string, state: string): ZipCodeData[];
  export function lookupByState(state: string): ZipCodeData[];
  export function distance(zipA: string | number, zipB: string | number): number | null;
  export function radius(zip: string | number, miles: number, full?: boolean): string[] | ZipCodeData[];
  export function toMiles(kilos: number): number;
  export function toKilometers(miles: number): number;
  export function lookupByCoords(lat: number, lon: number): ZipCodeData | null;

  const zipcodes: {
    codes: Record<string, ZipCodeData>;
    states: {
      normalize(state: string): string;
    };
    lookup(zip: string | number): ZipCodeData | undefined;
    random(): ZipCodeData;
    lookupByName(city: string, state: string): ZipCodeData[];
    lookupByState(state: string): ZipCodeData[];
    distance(zipA: string | number, zipB: string | number): number | null;
    radius(zip: string | number, miles: number, full?: boolean): string[] | ZipCodeData[];
    toMiles(kilos: number): number;
    toKilometers(miles: number): number;
    lookupByCoords(lat: number, lon: number): ZipCodeData | null;
  };
  export default zipcodes;
}
