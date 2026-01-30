import { Form, Input, InputNumber, Button, type FormInstance } from "antd";
import SelectIndustry from "@/components/common/select-industry";
import type { LeadPayload } from "@/models/leads";

interface FormLeadProps {
  form: FormInstance<LeadPayload>;
  handleSubmit: (values: LeadPayload) => void;
  loading: boolean;
  initialValues?: LeadPayload;
}

export default function FormLead({
  form,
  handleSubmit,
  loading,
  initialValues,
}: FormLeadProps) {
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        label="Name"
        name={"name"}
        rules={[{ required: true, message: "Please enter a name" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        label="Job Title"
        name={"job_title"}
        rules={[{ required: true, message: "Please enter a job title" }]}
      >
        <Input placeholder="Job Title" />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name={"phone_number"}
        rules={[{ required: true, message: "Please enter a phone number" }]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        label="Company"
        name={"company"}
        rules={[{ required: true, message: "Please enter a company" }]}
      >
        <Input placeholder="Company" />
      </Form.Item>
      <Form.Item
        label="Email"
        name={"email"}
        rules={[{ required: true, message: "Please enter an email" }]}
      >
        <Input placeholder="Email" type={"email"} />
      </Form.Item>
      <Form.Item
        label="Headcount"
        name={"headcount"}
        rules={[{ required: true, message: "Please enter a headcount" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Headcount"
          min={1}
        />
      </Form.Item>
      <SelectIndustry />
      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  );
}
