import { Card, Form, Skeleton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useLead } from "@/hooks/leads";
import FormLead from "@/components/common/form-lead";

export const Page: React.FC = () => {
  const params = useParams({ from: "/dashboard/leads/$id" });
  const navigate = useNavigate();
  const { data, onUpdate, isLoading: loading } = useLead(params.id);
  console.log("data", data);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const payload = await form.validateFields();
    await onUpdate(payload);
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
          Update Lead
        </div>
      }
      className="w-1/2"
    >
      {!data && <Skeleton active />}
      {data && (
        <FormLead
          form={form}
          handleSubmit={handleSubmit}
          loading={loading}
          initialValues={data}
        />
      )}
    </Card>
  );
};
