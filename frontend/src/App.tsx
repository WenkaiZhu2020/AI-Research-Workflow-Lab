import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { PaperSummarizer } from './pages/PaperSummarizer'
import { PromptLab } from './pages/PromptLab'
import { RepoExplainer } from './pages/RepoExplainer'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="paper-summarizer" element={<PaperSummarizer />} />
        <Route path="repo-explainer" element={<RepoExplainer />} />
        <Route path="prompt-lab" element={<PromptLab />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
