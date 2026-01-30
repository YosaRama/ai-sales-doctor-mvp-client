import { Button, Divider, Input, Select, Space, Spin } from "antd";
import FormItem from "antd/es/form/FormItem";
import { PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import type { InputRef } from "antd";
import { useIndustries } from "@/hooks/industry";
import type { IndustryDataModel } from "@/models/industry";

export default function SelectIndustry({
  mode,
  name = "industry_id",
  required = true,
}: {
  mode?: "multiple" | undefined;
  name?: string;
  required?: boolean;
}) {
  const {
    data: industryData,
    isLoading: loading,
    onCreate,
  } = useIndustries({ enableFetch: true });
  const [newName, setNewName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const addItem = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    await onCreate({ name: newName });
    setNewName("");
  };

  return (
    <FormItem
      name={name}
      label="Industry"
      rules={[{ required, message: "Please select an industry" }]}
    >
      <Select
        mode={mode}
        placeholder="Select related industry"
        options={industryData?.map((item: IndustryDataModel) => ({
          label: item.name,
          value: item.id,
        }))}
        loading={loading}
        popupRender={(menu) => (
          <>
            <Spin spinning={loading}>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={newName}
                  onChange={onNameChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </Space>
            </Spin>
          </>
        )}
      />
    </FormItem>
  );
}
