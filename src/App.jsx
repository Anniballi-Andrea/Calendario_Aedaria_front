import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/DefaultLayout"
import { ResourceProvider } from "./context/ResourceContext"
import { CalendarProvider } from "./context/CalendarContext"
import Initiative from "./pages/Initiative"
import SpellPage from "./pages/SpellPage"
import CreateSpell from "./pages/CreateSpell"
import CreateClass from "./pages/CreateClass"
import ClassPage from "./pages/ClassPage"


function App() {
  return (
    <BrowserRouter>
      <ResourceProvider>
        <CalendarProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/iniziativa" element={<Initiative />} />
              <Route path="/incantesimi" element={<SpellPage />} />
              <Route path="/aggiungi-incantesimo" element={<CreateSpell />} />
              <Route path="/incantesimi/modifica/:id" element={<CreateSpell />} />
              <Route path="/classe/crea-classe" element={<CreateClass />} />
              <Route path="/classe/:slug" element={<ClassPage />} />
            </Route>
          </Routes>
        </CalendarProvider>
      </ResourceProvider>
    </BrowserRouter>

  )

}

export default App
