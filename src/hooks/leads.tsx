import type {
  LeadDataModel,
  LeadPayload,
  LeadPayloadUpdate,
} from "@/models/leads";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axios from "axios";
import { useCallback } from "react";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/leads/`;
const entity = "leads";
const queryKey = "leads";

export const useLeads = ({
  enableFetch = true,
  pageSize = 10,
  currentPage = 1,
  search = "",
  queryString = "",
  order_by = "created_at",
  order_dir = "DESC",
}: {
  enableFetch?: boolean;
  pageSize?: number;
  currentPage?: number;
  search?: string;
  queryString?: string;
  order_by?: string;
  order_dir?: string;
}) => {
  const queryClient = useQueryClient();
  const paginationQuery = `&page=${currentPage}&per_page=${pageSize}`;
  const searchQuery = search ? `&name=${search}` : "";
  const queryStringQuery = queryString ? `&${queryString}` : "";
  const orderQuery = `order_by=${order_by}&order_dir=${order_dir}`;

  const { data, isLoading } = useQuery({
    queryKey: [
      queryKey,
      paginationQuery,
      searchQuery,
      queryStringQuery,
      orderQuery,
    ],
    queryFn: async () => {
      const result = await axios.get(
        `${baseUrl}?${orderQuery}${paginationQuery}${searchQuery}${queryStringQuery}`,
      );
      return result.data.data;
    },
    enabled: enableFetch,
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: useCallback(async (payload: LeadPayload) => {
      return await axios.post(`${baseUrl}`, payload);
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      notification.success({
        message: "Success",
        description: "Lead created successfully",
      });
      return result;
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to create lead",
      });
    },
  });

  const { mutateAsync: onDelete, isPending: onDeleteLoading } = useMutation({
    mutationFn: useCallback(async (payload: number) => {
      return await axios.delete(`${baseUrl}/${payload}`);
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      notification.success({
        message: "Success",
        description: "Lead deleted successfully",
      });
      return result;
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to delete lead",
      });
    },
  });

  return {
    data: data?.result || [],
    total: data?.total || 0,
    isLoading: isLoading || onCreateLoading || onDeleteLoading,
    onCreate,
    onDelete,
  };
};

export const useLead = (id: string) => {
  const queryClient = useQueryClient();
  const { data: data, isLoading: fetchLoading } = useQuery({
    queryKey: [entity, id],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}/${id}`);
      console.log("result.data", result.data);
      return result.data as LeadDataModel;
    },
  });

  const { mutateAsync: onUpdate, isPending: onUpdateLoading } = useMutation({
    mutationFn: useCallback(
      async (payload: LeadPayloadUpdate) => {
        return await axios.put(`${baseUrl}${id}`, payload);
      },
      [id],
    ),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.invalidateQueries({ queryKey: [entity, id] });
      notification.success({
        message: "Success",
        description: "Lead deleted successfully",
      });
      return result;
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to update lead",
      });
    },
  });

  return {
    data,
    onUpdate,
    isLoading: fetchLoading || onUpdateLoading,
  };
};
