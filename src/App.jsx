import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/DefaultLayout"
import { ResourceProvider } from "./context/ResourceContext"
import { CalendarProvider } from "./context/CalendarContext"


function App() {
  return (
    <BrowserRouter>
      <ResourceProvider>
        <CalendarProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/ciao" element={<Home />} />
            </Route>
          </Routes>
        </CalendarProvider>
      </ResourceProvider>
    </BrowserRouter>

  )

}

export default App
