/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultParamsSerializer } from "@/utils/defaultParamsSerializer";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { BaseURL } from "../constants";
import { useToast } from "../components/Toast/useToast";
import app from "./AxiosConfig";
import { MutateQuery, QueryParam, RequestQuery, ResponseWithData } from "./interface/model";
import { useUserInfoStoreGlobal } from "@/store/user/user-store";

function useRequest<TResponse extends ResponseWithData<any>, TData = TResponse["data"]>({
  queryKey,
  url,
  staleTime = 0,
  enabled,
  beforeCallback,
  successCallback,
  keepPreviousData = false,
  errorCallback,
  refetchOnWindowFocus = false,
  header = {},
  customBaseUrl,
  select,
  cacheTime,
  refetchInterval,
  params = {},
}: RequestQuery<TResponse, TData>): UseQueryResult<TData, Error> {
  const { userInfo } = useUserInfoStoreGlobal();

  return useQuery<TData, Error>({
    queryKey,
    enabled: enabled ?? !!userInfo,
    staleTime: staleTime === "Infinity" ? Infinity : staleTime,
    refetchOnWindowFocus,
    cacheTime,
    keepPreviousData,
    refetchInterval: refetchInterval ?? false,
    select,
    queryFn: async ({ signal }) => {
      beforeCallback?.();
      const swid = localStorage.getItem("swid");
      const { data } = await app.get<TResponse>(`${customBaseUrl ?? BaseURL}/${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${swid}`,
          ...header,
        },
        params,
        signal,
        paramsSerializer: {
          serialize: (p) => defaultParamsSerializer(p),
        },
      });

      return data.data as TData;
    },
    onSuccess: (data) => successCallback?.(data),
    onError: (error: any) => errorCallback?.(error),
  });
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
