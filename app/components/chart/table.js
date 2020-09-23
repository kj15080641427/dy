import React from "react";
import { Table } from "antd";
import "../style.scss";
const { Column } = Table;
export const TableShow = (props) => {
  const { columns, dataSource, onRow } = props;
  return (
    <Table
      size="small"
      dataSource={dataSource}
      className="set-table-style"
      rowKey={"siteBase"}
      pagination={{ pageSize: 4, simple: true }}
      onRow={onRow}
    >
      {columns.map((item) => {
        return (
          <Column
            title={item.name}
            dataIndex={item.dataIndex}
            key={item.dataIndex}
            className="table-background"
            render={item.render}
            width={item.width}
          />
        );
      })}
    </Table>
  );
};
