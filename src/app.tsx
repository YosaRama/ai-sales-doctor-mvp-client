import { ConfigProvider } from "antd";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:
          import.meta.env.VITE_APP_ENV === "development" ? 0 : 5 * 60 * 1000,
      },
    },
  });

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "orangered" } }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
