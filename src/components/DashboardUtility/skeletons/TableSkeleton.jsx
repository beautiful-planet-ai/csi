import { Skeleton } from '@mui/material'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

const TableSkeleton = () => {
    const items = Array.from({ length: 6 }, (v, i) => i);
  return (
    <DataTable value={items} className="p-datatable-striped w-full" showHeaders={false}>
    <Column field="code" header="Code" style={{ width: '25%' }} body={<Skeleton />}></Column>
    <Column field="name" header="Name" style={{ width: '25%' }} body={<Skeleton />}></Column>
    <Column field="category" header="Category" style={{ width: '25%' }} body={<Skeleton />}></Column>
    <Column field="quantity" header="Quantity" style={{ width: '25%' }} body={<Skeleton />}></Column>
</DataTable>
  )
}

export default TableSkeleton
