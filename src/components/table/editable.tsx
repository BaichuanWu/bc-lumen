import { forwardRef, memo, useCallback, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import '@ag-grid-community/styles/ag-grid.css'
import '@ag-grid-community/styles/ag-theme-quartz.css'
import { ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community'; 
import { Button } from '@mui/material'
import type { CellEditRequestEvent } from 'ag-grid-community'
import { AddLine } from './utils'
ModuleRegistry.registerModules([ClientSideRowModelModule])

export const COMBINED_VALUE_TYP = '__combinedValue'

export default memo(
  forwardRef(
    (
      { columns, dataSource, editable, onItemAdd, onItemMove, onItemRemove, onItemChange, isValidate }: any,
      ref: any,
    ) => {
      const onCellEditRequest = useCallback(
        ({ oldValue, newValue, rowIndex, colDef, data }: CellEditRequestEvent<any, any>) => {
          if (oldValue === newValue) return false
          else {
            onItemChange([
              {
                rowIndex,
                data: newValue?.typ === COMBINED_VALUE_TYP ? newValue.value : { [colDef.field as string]: newValue },
                prevData: data,
              },
            ])
            return true
          }
        },
        [onItemChange],
      )

      const onRowDragEnd = useCallback((e: any) => {
        onItemMove(e.node.rowIndex, e.overIndex)
      }, [])
      const gridStyle = useMemo(() => ({ width: '100%', height: 'calc(100% - 2rem)' }), [])
      const columnDef = useMemo(() => {
        let rs = [
          {
            headerName: '序号',
            width: 100,
            maxWidth: 100,
            pinned: 'left',
            valueFormatter: (params: any) =>
              params.node?.rowIndex !== undefined ? ((params.node?.rowIndex || 0) + 1).toString() : '',
            editable: false,
            rowDrag: editable,
          },
          ...columns,
        ]
        if (editable) {
          rs = [
            ...rs,
            {
              headerName: '操作',
              width: 100,
              pinned: 'right',
              editable: false,
              cellRenderer: ({ node }: any) => (
                <Button key={1} onClick={() => onItemRemove(node.rowIndex)}>
                  删除
                </Button>
              ),
            },
          ]
        }
        return rs.map((col: any) => {
          const { width, validator, ...rest } = col
          const sizeCol = {
            ...rest,
            minWidth: width || 120,
            cellClassRules: { 'invalid-value-cell': (params: any) => isValidate && validator && !validator(params) },
            validator,
          }
          if (sizeCol.editable === false || editable === false) {
            return { ...sizeCol, cellClass: 'non-editable' }
          } else {
            return sizeCol
          }
        })
      }, [columns, onItemRemove, editable, isValidate])

      const defaultColDef = useMemo(() => {
        return {
          editable,
          cellDataType: false,
          sortable: false,
          flex: 1,
        }
      }, [editable])

      return (
        <>
          <div style={gridStyle} className={'ag-theme-quartz'}>
            <AgGridReact
              ref={ref}
              rowData={dataSource}
              columnDefs={columnDef}
              defaultColDef={defaultColDef}
              suppressScrollOnNewData={true}
              reactiveCustomComponents
              enableCellTextSelection={!editable}
              onRowDragEnd={onRowDragEnd}
              readOnlyEdit={true}
              onCellEditRequest={onCellEditRequest}
              overlayNoRowsTemplate='<span style="padding: 10px; ">没有数据</span>'
            />
          </div>
          {editable && onItemAdd ? <AddLine addAction={onItemAdd} /> : <></>}
        </>
      )
    },
  ),
)
