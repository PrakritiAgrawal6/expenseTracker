export interface IApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ICustomFetchParams<T> {
  path: string;
  data?: T;
  method?: string;
}
