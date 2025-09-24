import  { forwardRef, memo,  useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ClientSideRowModelModule, ModuleRegistry, LocaleModule } from 'ag-grid-community'; 
import { Pagination } from '@mui/material'
import { useColorScheme } from "@mui/material/styles";
import { themeQuartz } from 'ag-grid-community';
import { colorSchemeDark, colorSchemeLight } from 'ag-grid-community';




ModuleRegistry.registerModules([ClientSideRowModelModule, LocaleModule]);

export default memo(
  forwardRef(({ columns, dataSource, pagination, style, ...props }: any, ref: any) => {
    const gridStyle = useMemo(() => ({ width: '100%', height: 'calc(100% - 2rem)', ...style }), [])
    const columnDef = useMemo(() => {
      const rs = [
        {
          headerName: '序号',
          width: 100,
          maxWidth: 100,
          pinned: 'left',
          valueFormatter: (params: any) =>
            params.node?.rowIndex !== undefined ? ((params.node?.rowIndex || 0) + 1).toString() : '',
          editable: false,
        },
        ...columns,
      ]
      if (props.rowSelection) {
        rs.unshift({
          headerName: '',
          checkboxSelection: true,
          headerCheckboxSelection: true,
          pinned: 'left',
          width: 50,
          maxWidth: 50,
        })
      }
      return rs.map((col: any) => {
        const { width, decimalPrecision, decimalRatio, ...rest } = col
        const sizeCol = {
          ...rest,
          minWidth: width || 120,
        }
        if (decimalPrecision >= 0) {
          sizeCol.cellRenderer = ({ value }: any) =>
            (parseFloat(value) * parseFloat(decimalRatio) || 0).toFixed(decimalPrecision)
        }
        return sizeCol
      })
    }, [columns, props.rowSelection])

    const defaultColDef = useMemo(() => {
      return {
        cellDataType: false,
        sortable: false,
        flex: 1,
      }
    }, [])
    const theme = useColorScheme()
    const quartzTheme = themeQuartz.withPart(theme.mode === 'dark' ? colorSchemeDark : colorSchemeLight);
    return (
      <>
        <div style={gridStyle}>
          <AgGridReact
            ref={ref}
            theme={quartzTheme}
            rowData={dataSource}
            columnDefs={columnDef}
            defaultColDef={defaultColDef}
            suppressScrollOnNewData={true}
            enableCellTextSelection={true}
            overlayNoRowsTemplate='<span style="padding: 10px; ">没有数据</span>'
            {...props}
            localeText={localeText}
          />
          {pagination && <Pagination align="end" {...pagination}></Pagination>}
        </div>
      </>
    )
  }),
)

const localeText = {
  filterOoo: '自定义筛选条件...',
  equals: '等于',
  notEqual: '不等于',
  contains: '包含',
  notContains: '不包含',
  startsWith: '以...开始',
  endsWith: '以...结束',
  andCondition: '并且',
  orCondition: '或者',
  blank: '空',
  notBlank: '非空',
}
