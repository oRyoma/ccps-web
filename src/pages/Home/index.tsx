import OrderChart from '@/components/Charts/OrderChart/index';
import { UserOutlined } from '@ant-design/icons';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { Avatar, Tag } from 'antd';
import React from 'react';
import HomeTable from './HomeTable/index';
import styles from './index.less';

const Index: React.FC = () => {
  return (
    <div className={styles.container}>
      <ProCard split="vertical">
        <ProCard colSpan="25%" split="horizontal">
          <ProCard title="用户信息">
            <div style={{ textAlign: 'center' }}>
              <Avatar size="large" icon={<UserOutlined />} src="https://joesch.moe/api/v1/random" />
              <br />
              <Tag className={styles.tag}>Ryoma</Tag>
              <br />
              <span>用户角色：{'管理员'}</span>
            </div>
          </ProCard>
          <ProCard>
            <StatisticCard.Group direction="column">
              <StatisticCard
                title="订单状态："
                bordered
                className={styles.firstChart}
                chart={<OrderChart />}
              />
              <StatisticCard title="采购占比：" bordered className={styles.secondChart} />
            </StatisticCard.Group>
          </ProCard>
        </ProCard>
        <ProCard>
          <HomeTable />
        </ProCard>
      </ProCard>
    </div>
  );
};

export default Index;
