export interface Weather {
  _id: string;
  location: string;
  temperature: number;
  description: string;
  icon: string;
  date: string;
}

export interface WeatherData {
    location: string;
    temperature: number;
    description: string;
    icon: string;
  }