import { ProColumns, ProTable } from '@ant-design/pro-components';
import React from 'react';

export type TableListItem = {
  orderId: string;
  supplierID: string;
  orderDate: number;
  expectedDeliveryDate: number;
  actualDeliveryDate: number;
  totalAmount: number;
  status: string;
};

const tableListDataSource: TableListItem[] = [
  {
    orderId: '23141214',
    supplierID: '31231233',
    orderDate: Date.now(),
    expectedDeliveryDate: Date.now(),
    actualDeliveryDate: Date.now(),
    totalAmount: 332,
    status: 'awaiting',
  },
];

const Index: React.FC = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      search: false,
      render: (_) => <a>{_}</a>,
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
      valueType: 'time',
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      search: false,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'all',
      valueEnum: {
        awaiting: { text: '待处理', status: 'Default' },
        going: { text: '进行中', status: 'Default' },
        refuse: { text: '驳回', status: 'Processing' },
        evaluate: { text: '待评价', status: 'Success' },
        finish: { text: '已完成', status: 'Error' },
      },
    },
  ];
  return (
    <div>
      <ProTable<TableListItem>
        columns={columns}
        request={(params, sorter, filter) => {
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="orderId"
        pagination={{
          showQuickJumper: true,
          defaultPageSize: 7,
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
        dateFormatter="string"
        headerTitle="订单信息"
        options={false}
      />
    </div>
  );
};

export default Index;
