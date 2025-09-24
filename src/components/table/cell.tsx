// import { useShallowEqualSelector } from 'Src/renderer/hooks/useShallowEqualSelector'
// import { commonKeyActionMap } from 'Src/renderer/store/common/actions'
// import { commonKey } from 'Src/renderer/store/common/consts'
// import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { binarySearchById } from 'Src/renderer/utils/data'
// import { UpdateGridContext } from 'Src/renderer/hooks/context'
// import { Button, Popover, Tag } from 'antd'
// import { useBoolean } from 'ahooks'
// import { CPicUpload } from '../form/item/upload'
// import { getField } from 'Src/renderer/utils/format'

// export const commonRenderById =
//   (key: commonKey, attr: string | string[], optionRender: any) =>
//   ({ data }: any) => {
//     const dispatch = useDispatch()
//     const { dataSource, updateTime } = useShallowEqualSelector((state) => state.common[key])
//     useEffect(() => {
//       if (updateTime === undefined) dispatch((commonKeyActionMap.get(key) as any)())
//     }, [])
//     const id = getField(data, attr)
//     return useMemo(() => {
//       if (id) {
//         const entity = binarySearchById(dataSource, id)
//         return entity && optionRender(entity)
//       } else {
//         return ''
//       }
//     }, [dataSource, id])
//   }

// const getCommonRender =
//   (key: commonKey, optionRender: any) =>
//   ({ value, data, colDef, node, ...props }: any) => {
//     const dispatch = useDispatch()
//     const updateItem = useContext(UpdateGridContext)
//     const dataKey = colDef.field.slice(0, -2)
//     const [entity, setEntity] = useState(data && data[dataKey])
//     const { dataSource, updateTime } = useShallowEqualSelector((state) => state.common[key])
//     useEffect(() => {
//       if (updateTime === undefined) dispatch((commonKeyActionMap.get(key) as any)())
//     }, [])
//     useEffect(() => {
//       if ((value && !entity?.id) || entity?.id !== value) {
//         const newEntity = binarySearchById(dataSource, value)
//         setEntity(newEntity)
//         if (newEntity?.id) {
//           updateItem([{ rowIndex: node.rowIndex, data: { [dataKey]: newEntity }, prevData: data }])
//         }
//       }
//     }, [dataSource, value, updateItem])
//     return entity && optionRender(entity)
//   }

// export const CorporationRender = getCommonRender(commonKey.corporation, (item: any) => `${item.cno}-${item.name}`)
// export const EmployeeRender = getCommonRender(commonKey.employee, (item: any) => `${item.cno}-${item.name}`)

// export const PicUploadRender = ({ value, data, colDef, node, disabled }: any) => {
//   const updateItem = useContext(UpdateGridContext)
//   const [isOpen, setIsOpen] = useBoolean(false)
//   const onChange = useCallback(
//     (v: any) => {
//       updateItem([{ rowIndex: node.rowIndex, data: { [colDef.field]: v }, prevData: data }])
//     },
//     [updateItem, colDef.field, node.rowIndex, data],
//   )
//   return (
//     <>
//       <span>附件数:{value?.length || 0} </span>
//       <Popover
//         placement="left"
//         title={'附件'}
//         content={<CPicUpload value={value} onChange={onChange} disabled={disabled}></CPicUpload>}
//         trigger="click"
//         open={isOpen}
//         onOpenChange={setIsOpen.set}
//       >
//         <Button style={{ marginLeft: 10 }}>{disabled ? '查看附件' : '上传附件'}</Button>
//       </Popover>
//     </>
//   )
// }

// export const booleanRender = ({ value }: any) => (value ? '是' : '否')
// export const tagListRender = ({ value }: any) => (
//   <>
//     {value
//       ?.filter((e: any) => e)
//       .map((item: any) => (
//         <Tag color="geekblue" key={item.id}>
//           {item.name}{' '}
//         </Tag>
//       ))}
//   </>
// )
