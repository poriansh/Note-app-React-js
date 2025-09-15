/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultParamsSerializer } from "@/utils/defaultParamsSerializer";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { BaseURL } from "../constants";
import { useToast } from "../utils/useToast";
import app from "./AxiosConfig";
import type { MutateQuery, QueryParam, RequestQuery, ResponseWithData } from "./model";


function useRequest<TResponse extends ResponseWithData<any>, TData = TResponse["data"]>({
  queryKey,
  url,
  staleTime = 0,
  enabled,
  successCallback,
  keepPreviousData = false,
  errorCallback,
  refetchOnWindowFocus = false,
  header = {},
  customBaseUrl,
  select,
  cacheTime,
  params = {},
}: RequestQuery<TResponse, TData>): UseQueryResult<TData> {
  return useQuery<TData, Error>(
    queryKey,
    async () => {
      const swid = localStorage.getItem("swid");

      const { data } = await app.get<TResponse>(`${customBaseUrl ?? BaseURL}/${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${swid}`,
          ...header,
        },
        params,
        paramsSerializer: {
          serialize: (p) => defaultParamsSerializer(p),
        },
      });

      return data.data as TData;
    },
    {
      staleTime: staleTime === "Infinity" ? Infinity : staleTime,
      enabled,
      refetchOnWindowFocus,
      cacheTime,
      keepPreviousData,
      onSuccess: (data) => {
        successCallback?.(data);
      },
      onError: (error: any) => {
        errorCallback?.(error);
      },
      select,
    },
  );
}

const useMutate = ({
  method,
  url,
  successCallback,
  errorCallback,
  header = {},
  customBaseUrl,
  preventDefaultMessage = false,
  isFormData = false,
}: MutateQuery) => {
  const toast = useToast();

  return useMutation({
    mutationFn: async ({ id, query, requestUrl }: QueryParam) => {
      const swid = localStorage.getItem("swid");
      const urlPath = requestUrl || `${url}${id ? `/${id}` : ""}`;
      const fullUrl = `${customBaseUrl ?? BaseURL}/${urlPath}`;
      


      const { data } = await app({
        method,
        url: fullUrl,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          Authorization: `Bearer ${swid}`,
          ...header,
        },
        data: isFormData ? query : query,
      });
      return {
        data: data.data,
        statusMessage: data.message,
        ...data,
      };
    },
    onSuccess: (data) => {
      successCallback?.(data);
      !preventDefaultMessage && toast("Success", data.statusMessage);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message;
      errorCallback?.(message);
      !preventDefaultMessage && toast("Error", message);
    },
  });
};

const keyHandler = (key: string) => {
  return {
    predicate: (query: any) => query.queryKey.includes(key),
  };
};

export { keyHandler, useMutate, useRequest };
