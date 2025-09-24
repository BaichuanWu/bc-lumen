export interface Column {
    field: string,
    headerName: string,
    width?: number,
}

export interface FormItem {
    name: string,
    label: string,
    component: React.ComponentType<any>,
}
