import { memo } from "react"

// Components
import { MainContent } from "./views/MainContent";

const App = memo(() => {
  return (
    <section className="container py-4">
      <section className="flex align-items-center justify-content-between mb-2">
        <h1 className="m-0 text-gray-700 text-2xl font-semibold mr-4">產銷進度追蹤表</h1>
      </section>
      <MainContent />
    </section>
  )
})

export default App
