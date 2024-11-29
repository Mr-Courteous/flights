import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FlightSearchForm from './App2.jsx'
import MyComponent from './Test.jsx'
import MyComponent3 from './App3.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* <App /> */}

    <MyComponent3 />
    {/* <FlightSearchForm /> */}
  </StrictMode>,
)
