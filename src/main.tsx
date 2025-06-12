import React   from 'react'
import ReactDOM from 'react-dom/client'
import WidgetShell from '@/components/shell/WidgetShell'    // <— single canonical shell
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WidgetShell />
    </React.StrictMode>
)