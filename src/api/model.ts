/* eslint-disable @typescript-eslint/no-explicit-any */
export type ResponseWithData<D> = { data: D; [key: string]: any };
export interface RequestQuery<TResponse extends ResponseWithData<any>, TData = TResponse["data"]> {
  queryKey: string | any[];
  url: string;
  keepPreviousData?: boolean;
  staleTime?: number | "Infinity";
  cacheTime?: number;
  enabled?: boolean;
  successCallback?: (data: TData) => void;
  errorCallback?: (error: string) => void;
  refetchOnWindowFocus?: boolean | "always";
  header?: Record<string, string>;
  customBaseUrl?: string;
  select?: (data: TData) => TData;
  params?: Record<string, unknown>;
}

export interface MutateQuery {
  method: "POST" | "DELETE" | "PATCH" | "PUT";
  url?: string;
  successCallback?: (data: any) => void;
  errorCallback?: (error: string) => void;
  header?: Record<string, string>;
  preventDefaultMessage?: boolean;
  customBaseUrl?: string;
  isFormData?: boolean;
}

export interface QueryParam {
  query?: any;
  id?: string;
  requestUrl?: string;
}

export interface ErrorHandler {
  error: any;
  errorCallback: (data: any) => void;
  isGetMethod: boolean;
  preventDefaultMessage: boolean;
}
