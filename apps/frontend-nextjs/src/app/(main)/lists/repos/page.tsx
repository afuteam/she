'use client';
import { CustomerService } from '../../../../demo/service/CustomerService';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
// import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import type { Demo } from '@/types';

const ReopsListPage = () => {
  const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);
  const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
  const [loading1, setLoading1] = useState(true);

  const [globalFilterValue1, setGlobalFilterValue1] = useState('');

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters1 = { ...filters1 };
    (_filters1['global'] as any).value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="重置搜索"
          outlined
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="搜索"
          />
        </span>
      </div>
    );
  };

  useEffect(() => {
    CustomerService.getCustomersLarge().then((data) => {
      setCustomers1(getCustomers(data));
      setLoading1(false);
    });
    initFilters1();
  }, []);

  const getCustomers = (data: any) => {
    return [...(data || [])].map((d) => {
      return d.attributes;
    });
  };

  const formatDate = (value: Date) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      default_branch: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      description: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      web_url: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      id_self: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      created_at_self: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue1('');
  };

  const formatTimeCreated = (rowData: Demo.ReposListResult) => {
    const timeshowText = formatDate(new Date(rowData.created_at_self));
    return <span>{timeshowText}</span>;
  };

  const formatTimeLastUpdated = (rowData: Demo.ReposListResult) => {
    const timeshowText = formatDate(new Date(rowData.last_activity_at));
    return <span>{timeshowText}</span>;
  };

  const header1 = renderHeader1();

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>项目总和: {customers1.length}</h5>
          <DataTable
            value={customers1}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="暂无数据"
            header={header1}
          >
            <Column
              field="name"
              header="名称"
              // filter
              // filterPlaceholder="按项目名搜索"
              style={{ minWidth: '12rem' }}
            />
            <Column
              field="default_branch"
              header="默认分支"
              style={{ minWidth: '8rem' }}
            />
            <Column
              field="description"
              header="系统描述"
              style={{ minWidth: '10rem' }}
            />
            <Column
              field="web_url"
              header="仓库地址"
              style={{ minWidth: '12rem' }}
            />
            {/* <Column
              field="id_self"
              header="项目id"
              style={{ minWidth: '2rem' }}
            /> */}

            <Column
              field="last_activity_at"
              header="更新时间"
              body={formatTimeLastUpdated}
              style={{ minWidth: '2rem' }}
            />
            <Column
              field="created_at_self"
              header="创建时间"
              body={formatTimeCreated}
              style={{ minWidth: '10rem' }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ReopsListPage;
