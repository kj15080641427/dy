import React from 'react'
import { Table } from 'antd'
export default function DYForm() {
  const [loading,setLoading] = useState()
  return <>
    <Table
      loading={loading}
      columns={ckcolumns}
      dataSource={dataSource}
      scroll={{ y: 700 }}
      rowKey={row => row.materialWarehouseId}
      pagination={pagination}
    ></Table>
  </>
}

