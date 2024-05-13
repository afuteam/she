import { Demo } from '@/types';

export const CustomerService = {
  getCustomersLarge() {
    // 项目获取上线 先为 1000，暂不做分页了
    return (
      fetch('http://localhost:1337/api/repos-plural?pagination[page]=1&pagination[pageSize]=1000&sort=last_activity_at:desc')
        .then((res) => res.json())
        .then((d) => d.data as Demo.ReposListResult[])
    );
  },
};
