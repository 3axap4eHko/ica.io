import { ExecutorParameters } from 'apidly';
import client from './client';
import * as Endpoints from './endpoints';

interface Request<T> {
  (parameters: ExecutorParameters): Promise<T>
}

interface Name {
  alias: string;
  title: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Location {
  city: string;
  country: string;
  address1: string;
  address2: string;
  address3: string;
  state: string;
  zip_code: string;
}

export interface BusinessResponse extends Name {
  id: string;
  name: string;
  categories: Name[];
  coordinates: Coordinates;
  display_phone: string;
  review_count: number;
  rating: number;
  location: Location;
  image_url: string;
}

export const businessesDetails: Request<BusinessResponse> = client(Endpoints.businessesDetails);

export interface BusinessesResponse {
  businesses: BusinessResponse[];
  total: number;
  region: {
    center: Coordinates;
  }
}

export const businessesSearch: Request<BusinessesResponse> = client(Endpoints.businessesSearch);

interface Category extends Name {
  parent_aliases: string[];
}

export interface CategoryResponse {
  category: Category;
}

export const categoryDetails: Request<CategoryResponse> = client(Endpoints.categoryDetails);

interface User {
  id: string;
  profile_url: string;
  image_url: string;
  name: string;
}

interface Review {
  id: string;
  rating: string;
  user: User;
  text: string;
  time_created: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  possible_languages: string[];
}

export const businessesReviews: Request<ReviewsResponse> = client(Endpoints.businessesReviews);
