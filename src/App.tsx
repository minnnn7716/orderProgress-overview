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
      <p className="text-sm text-gray-600">面試展示版 · 2,000 筆模擬訂單 · 所有客戶與資料均為虛構。可操作欄位篩選、排序、釘選、拖曳與調整欄寬。</p>
    </section>
  )
})

export default App
