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
import CreateSkill from "./pages/CreteSkill"
import PageTest from "./pages/PageTest"
import CreateSubClass from "./pages/CreateSubClass"


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
              <Route path="/test" element={<PageTest />} />
              <Route path="/classe/:slug/sotto-classe/nuova" element={<CreateSubClass />} />
              <Route path="/classe/:slug/skill/nuova" element={<CreateSkill />} />
              <Route path="/classe/:slug/sotto-classe/:subClassId/skill/nuova" element={<CreateSkill />} />
              <Route path="/classe/:slug/skill/:id/modifica" element={<CreateSkill />} />
            </Route>
          </Routes>
        </CalendarProvider>
      </ResourceProvider>
    </BrowserRouter>

  )

}

export default App
