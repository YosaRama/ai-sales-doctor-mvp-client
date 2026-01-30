import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { TeamOutlined } from "@ant-design/icons";

export default function SelectRange({
  label = "Range",
  name = "range",
}: {
  label?: string;
  name?: string;
}) {
  return (
    <FormItem name={name} label={label}>
      <Select
        placeholder={`Select ${label}`}
        allowClear
        options={[
          { label: "0 - 10", value: "0-10" },
          { label: "10 - 50", value: "10-50" },
          { label: "50 - 100", value: "50-100" },
          { label: "100 - 500", value: "100-500" },
          { label: "500 - 1000", value: "500-1000" },
          { label: "1000+", value: "1000+" },
        ]}
        labelRender={(props) => {
          return (
            <span>
              <TeamOutlined /> {props.value}
            </span>
          );
        }}
        optionRender={(option) => {
          return (
            <div>
              <span>
                <TeamOutlined /> {option.label}
              </span>
            </div>
          );
        }}
      />
    </FormItem>
  );
}
