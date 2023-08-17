import { Resizable, ResizableProps } from 'react-resizable';

export const ResizableTitle = (props: ResizableProps) => {
  const { onResize, onResizeStop, onResizeStart, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    >
      <th
        key='a'
        {...restProps} />
    </Resizable>
  )
}