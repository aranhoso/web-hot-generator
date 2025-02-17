export interface GeneratorRequest {
  name: string;
  temperature: number;
  max_length: number;
}

export interface CarDetails {
  name: string;
  year: string;
  color: string;
  series: string;
}

export interface GeneratorResponse {
  prompt: string;
  image: string;
  car_details: CarDetails;
}
