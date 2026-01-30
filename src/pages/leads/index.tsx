import { Badge, Button, Drawer, Form, Input, Modal, Result, Table } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { useLeads } from "@/hooks/leads";
import LeadsColumns from "@/components/columns/leads";
import { useState } from "react";
import SelectIndustry from "@/components/common/select-industry";
import SelectRange from "@/components/common/select-range";
import type { SorterResult } from "antd/es/table/interface";
import type { LeadDataModel } from "@/models/leads";

export const Page: React.FC = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [search, setSearch] = useState("");
  const [queryString, setQueryString] = useState("");
  const [filterForm] = Form.useForm();
  const [order_by, setOrderBy] = useState("updated_at");
  const [order_dir, setOrderDir] = useState("DESC");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [enrichLeadModalOpen, setEnrichLeadModalOpen] = useState(false);

  const {
    data: leadsData,
    total: leadsDataTotal,
    isLoading: leadsLoading,
    onDelete,
  } = useLeads({
    enableFetch: true,
    pageSize: pagination.pageSize,
    currentPage: pagination.page,
    search,
    queryString,
    order_by,
    order_dir,
  });

  const handlePagination = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  const handleFilter = async () => {
    const values = await filterForm.validateFields();
    setQueryString(
      Object.entries(values)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value || ""}`)
        .join("&"),
    );
    setDrawerOpen(false);
  };

  const handleReset = () => {
    filterForm.resetFields();
    setQueryString("");
    setDrawerOpen(false);
  };

  const handleSorter = (column: SorterResult<LeadDataModel>) => {
    setOrderBy(column.field as string);
    setOrderDir(column.order === "ascend" ? "ASC" : "DESC");
  };

  const columns = LeadsColumns({ onDelete });
  return (
    <div>
      <div className="flex justify-between gap-2 mb-6">
        <div>
          <Input
            placeholder="Search by name"
            prefix={<SearchOutlined className="opacity-40 pr-2" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Badge count={queryString && queryString.split("&").length}>
            <Button
              type="default"
              icon={<FilterOutlined />}
              onClick={() => setDrawerOpen(true)}
            >
              Filter
            </Button>
          </Badge>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate({ to: "/dashboard/leads/create" })}
          >
            Create Lead
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={leadsData}
        loading={leadsLoading}
        onChange={(_, __, sorter) => {
          handleSorter(sorter as SorterResult<LeadDataModel>);
        }}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: leadsDataTotal || 0,
          onChange: handlePagination,
        }}
        scroll={{ x: "max-content" }}
      />
      <div className="mt-6 w-full flex justify-center">
        <Button
          type="primary"
          size="large"
          className="w-full"
          onClick={() => setEnrichLeadModalOpen(true)}
        >
          Enrich Lead Now!
        </Button>
      </div>
      <Modal
        footer={null}
        open={enrichLeadModalOpen}
        onCancel={() => setEnrichLeadModalOpen(false)}
      >
        <Result
          status="success"
          title="Lead Enriched Successfully"
          subTitle="The lead has been successfully enriched with additional information."
        />
      </Modal>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter"
      >
        <Form
          form={filterForm}
          onFinish={handleFilter}
          layout="vertical"
          className="!flex flex-wrap w-full h-full"
        >
          <div className="w-full">
            <SelectIndustry
              required={false}
              mode="multiple"
              name="industry_ids"
            />
            <SelectRange name="headcount" label="Headcount" />
          </div>

          <div className="flex justify-end w-full self-end">
            <Button type="default" onClick={handleReset} className="mr-2">
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};
