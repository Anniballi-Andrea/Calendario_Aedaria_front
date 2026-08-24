import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/DefaultLayout"
import { ResourceProvider } from "./context/ResourceContext"
import { CalendarProvider } from "./context/CalendarContext"
import Initiative from "./pages/Initiative"


function App() {
  return (
    <BrowserRouter>
      <ResourceProvider>
        <CalendarProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/iniziativa" element={<Initiative />} />
            </Route>
          </Routes>
        </CalendarProvider>
      </ResourceProvider>
    </BrowserRouter>

  )

}

export default App
