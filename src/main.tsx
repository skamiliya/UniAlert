import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/style.css'
import { router } from './app/router/Routes.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store/store.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
