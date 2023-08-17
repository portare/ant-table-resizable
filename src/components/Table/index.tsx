import { Table } from "antd";
import { TableProps } from "antd/es/table/InternalTable";
import { AnyObject } from "antd/es/_util/type";
import { useCallback, useMemo, useState } from "react";
import { ResizableTitle } from './ResizableTitle';
import { ResizableProps } from "react-resizable";
import "react-resizable/css/styles.css";

export type TResizableColumn<RecordType> = NonNullable<TableProps<RecordType>['columns']> & {
  width?: number;
}
export type TProps<RecordType> = TableProps<RecordType> & {
  columns: TResizableColumn<RecordType>;
};


const components = {
  header: {
    cell: ResizableTitle,
  },
}

export const ResizableTable = <RecordType extends AnyObject = object>({columns: columnsProp, ...props}: TProps<RecordType>) => {
  const [isResizing, setIsResizing] = useState(false);
  const [columns, setColumns] = useState<Array<any>>(columnsProp);


  const handleResize = useCallback((index: number): ResizableProps['onResize'] => (_, { size }) => {
    console.log("handle resize")
    setColumns(( columns ) => {
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      }
      return  nextColumns;
    })
  }, [])

  const onResizeStart = useCallback<NonNullable<ResizableProps['onResizeStart']>>(() => {
    console.log("start resize")
    setIsResizing(true)

  }, [])

  const onResizeStop = useCallback<NonNullable<ResizableProps['onResizeStop']>>(() => {
    console.log("start resize")
    setIsResizing(false)

  }, [])

  const columnsWithHandlers = useMemo(() => columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column: TResizableColumn<RecordType>) => ({
      width: column.width,
      onResize: handleResize(index),
      onResizeStart: onResizeStart,
      onResizeStop: onResizeStop
    }),
  })), [columns])

  return <Table {...props} columns={columnsWithHandlers} components={components}/>
}