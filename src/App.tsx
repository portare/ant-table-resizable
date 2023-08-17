import { ResizableTable } from "./components";
import { useEffect, useState } from "react";
import { api } from "./api.ts";
import { columnsConfig } from "./columns.config.ts";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true)
      api.get('https://jsonplaceholder.typicode.com/users').then(({data}) => setData(data)).finally(() => {
        setLoading(false)
      })

  }, [])

  return (
    <ResizableTable
      dataSource={data}
      columns={columnsConfig}
      loading={loading}
      rowKey='id'
    />
  )
}

export default App
