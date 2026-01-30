import type { LeadDataModel } from "@/models/leads";
import { Popconfirm, type TableColumnsType } from "antd";
import { EditFilled, DeleteFilled, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { utcToLocal } from "@/utils/utc-to-local";

export default function LeadsColumns({
  onDelete,
}: {
  onDelete: (id: number) => void;
}): TableColumnsType<LeadDataModel> {
  const navigate = useNavigate();
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      render: (_, render) => {
        return <div>{render.industry.name}</div>;
      },
    },
    {
      title: "Headcount",
      dataIndex: "headcount",
      key: "headcount",
      render: (_, render) => {
        return (
          <div className="flex gap-2">
            <span>
              <TeamOutlined />
            </span>
            {render.headcount}
          </div>
        );
      },
    },
    {
      title: "Added At",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: true,
      fixed: "end",
      render: (text) => (
        <div>
          <div className="font-semibold">{utcToLocal(text, "DD MMM YYYY")}</div>
          <div className="text-xs">{utcToLocal(text, "HH:mm:ss")}</div>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-4">
            <div
              className="cursor-pointer hover:opacity-50 transition-all duration-200 "
              onClick={() => {
                navigate({
                  to: "/dashboard/leads/$id",
                  params: { id: record.id },
                });
              }}
            >
              <EditFilled />
            </div>
            <Popconfirm
              title="Are you sure removing this lead?"
              onConfirm={() => onDelete(record.id)}
            >
              <div className="cursor-pointer hover:opacity-50 transition-all duration-200 ">
                <DeleteFilled />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
}
