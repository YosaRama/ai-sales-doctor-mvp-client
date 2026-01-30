import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axios from "axios";
import { useCallback } from "react";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/industries`;
const queryKey = "industries";

export const useIndustries = ({
  enableFetch = true,
}: {
  enableFetch?: boolean;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const result = await axios.get(`${baseUrl}`);
      return result.data;
    },
    enabled: enableFetch,
  });

  const { mutateAsync: onCreate, isPending: onCreateLoading } = useMutation({
    mutationFn: useCallback(async (payload: { name: string }) => {
      return await axios.post(`${baseUrl}`, payload);
    }, []),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      notification.success({
        message: "Success",
        description: "Industry created successfully",
      });
      return result;
    },
    onError: () => {
      notification.error({
        message: "Error",
        description: "Failed to create industry",
      });
    },
  });

  return {
    data,
    isLoading: isLoading || onCreateLoading,
    onCreate,
  };
};
