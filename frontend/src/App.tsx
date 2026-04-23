import { Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from './components/app-layout'
import { HistoryPage } from './pages/history-page'
import { HomePage } from './pages/home-page'
import { PaperSummarizerPage } from './pages/paper-summarizer-page'
import { PromptLabPage } from './pages/prompt-lab-page'
import { RepoExplainerPage } from './pages/repo-explainer-page'
import { SettingsPage } from './pages/settings-page'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="paper-summarizer" element={<PaperSummarizerPage />} />
        <Route path="repo-explainer" element={<RepoExplainerPage />} />
        <Route path="prompt-lab" element={<PromptLabPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
