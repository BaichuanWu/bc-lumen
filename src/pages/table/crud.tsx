import { Box } from '@mui/material'
import Button from '../../components/button'
import { useBoolean } from 'ahooks'
import Form from '../../components/form'
import Table from '../../components/table'
import { type Column, type FormItem } from '../../types'
import CUDialog from '../../components/dialog'
import { useState } from 'react'


const CRUDPage = <T,>({ columns, dataSource, defaultData, searchItems, createItems, updateItems, onSearch, onCreate, onUpdate, onDelete }: { columns: Column[], dataSource: T[], defaultData: T, searchItems: FormItem[], createItems: FormItem[], updateItems: FormItem[], onSearch: (data: any) => void, onCreate: (data: any) => void, onUpdate: (data: any) => void, onDelete: (data: any) => void }) => {
  const [current, setCurrent] = useState<T>(defaultData)
  const [isDialogOpen, dialogOpen] = useBoolean(false)
  const isEditing = Boolean(current && (current as any).id)
  const allColumns = [...columns,
    {
      headerName: '操作',
      field: 'action',
      cellRenderer: ({ data }: any) => {
        return (<>
        <Button key="1" onClick={() => {setCurrent(data), dialogOpen.setTrue()}}>编辑</Button>
        <Button key="2" color="error" onClick={() => onDelete(data)}>删除</Button>
        </>
      )
      },
      maxWidth: 100,
    },

  ]

  return <Box sx={{
    display: "flex",
    flexDirection: "column",
    height: "100%", // 占满整个视口高度
  }}>
    <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
      <Form
        onSubmit={onSearch}
        defaultValues={{ field1: '2', field2: '1' }}
        items={searchItems}
      >
        <Button type="submit">搜索</Button>
        <Button type="button" onClick={() => {setCurrent(defaultData), dialogOpen.setTrue()}}>创建</Button>
      </Form>
    </Box>
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Table columns={allColumns} dataSource={dataSource} />
    </Box>
    <CUDialog
      open={isDialogOpen}
      onClose={() => dialogOpen.setFalse()}
      onSubmit={(data) => {
        if (isEditing) {
          onUpdate({ ...current, ...data })
        } else {
          onCreate(data)
        }
      }}
      item={current}
      formItems={isEditing ? updateItems : createItems}
      title={isEditing ? "编辑" : "创建"}
    />
  </Box>
}
export default CRUDPage