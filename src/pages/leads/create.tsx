import { Card, Form } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { useLeads } from "@/hooks/leads";
import FormLead from "@/components/common/form-lead";

export const Page: React.FC = () => {
  const navigate = useNavigate();
  const { onCreate, isLoading: loading } = useLeads({ enableFetch: false });
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const payload = await form.validateFields();
    await onCreate(payload);
    navigate({ to: "/dashboard/leads" });
  };

  return (
    <Card
      title={
        <div className="text-md font-semibold flex gap-2">
          <span
            onClick={() => {
              navigate({ to: "/dashboard/leads" });
            }}
            className="cursor-pointer"
          >
            <ArrowLeftOutlined />
          </span>
          Create New Lead
        </div>
      }
      className="w-1/2"
    >
      <FormLead form={form} handleSubmit={handleSubmit} loading={loading} />
    </Card>
  );
};
