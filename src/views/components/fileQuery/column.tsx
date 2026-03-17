export function useColumns() {
  const columns: TableColumnList = [
    {
      label: "id",
      prop: "id"
    },
    {
      label: "文件名称",
      prop: "filename"
    },
    {
      label: "文件类型",
      prop: "mime_type"
    },
    {
      label: "图片",
      prop: "base64_data",
      cellRenderer: ({ row }) => (
        <div style='background-size:cover;width:200px;height:100px;'>
          <img src={`data:${row.mime_type};base64,${row.base64_data}`}></img>
        </div>
      )
    }
  ]
  
  return {
    columns
  }
}