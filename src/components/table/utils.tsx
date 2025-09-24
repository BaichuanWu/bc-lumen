import  { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import { COMBINED_VALUE_TYP } from './editable'
import { TextField } from '@mui/material'

const KEY_ESC = 'Escape'
const KEY_Tab = 'Tab'

export const requiredValidator = ({ value }: any) => value !== undefined && value !== null

export const doNotingOnEditing = (params: any) => {
  // const key = params.event.key
  return params.editing
}
const emptyMap = new Map<string, string>()

export const selectHoc = (
  Component: any,
  valueHandler: any = (data: any) => data,
  propsDataMap: Map<string, string> = emptyMap,
) =>
  forwardRef(({ onValueChange, value, stopEditing, node, data, ...props }: any, ref: any) => {
    useImperativeHandle(ref, () => ({
      getValue() {
        return value
      },
      isPopup() {
        return true
      },
    }))
    const customRef = useRef<any>(null)
    useEffect(() => {
      customRef.current?.focus()
      customRef.current?.open()
    }, [])

    const handleKeyDown = (e: any) => {
      if (e.key === KEY_ESC) {
        // ESC 键被按下，停止编辑
        stopEditing()
      } else if (e.key === KEY_Tab) {
        // 阻止默认行为
        e.preventDefault()
      }
    }
    const onChange = useCallback(
      (value: any, option: any) => {
        console.log('select out change', onValueChange, valueHandler(value, option))
        onValueChange(valueHandler(value, option))
      },
      [onValueChange],
    )
    const extraProps = Object.fromEntries([...propsDataMap].map(([k, v]) => [k, data[v]]))
    if ((props as any).editorProps) {
      Object.assign(extraProps, (props as any).editorProps)
      console.log(extraProps, 'extraProps 000000000000')
    }
    return (
      <Component
        ref={customRef}
        onChange={onChange}
        style={{ width: '100%', border: '0' }}
        value={value?.typ === COMBINED_VALUE_TYP ? value.origin : value}
        onSelect={stopEditing}
        onInputKeyDown={handleKeyDown}
        {...extraProps}
      />
    )
  })

export const AddLine = ({ addAction }: any) => {
  const [addCount, setAddCount] = useState(1)
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target) {
        setAddCount(parseInt(event.target.value, 1))
      }
    },
    [setAddCount],
  )
  const onAdd = () => {
    addAction(addCount)
  }
  return (
    <div
      style={{
        width: '100%',
        height: '2rem',
        border: '1px dashed #d9d9d9',
        textAlign: 'center',
        background: 'white',
        cursor: 'pointer',
      }}
      onClick={onAdd}
    >
      ＋添加
      <span
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <TextField style={{ width: '3rem' }} value={addCount} onChange={onChange} />
      </span>{' '}
      行数据
    </div>
  )
}
