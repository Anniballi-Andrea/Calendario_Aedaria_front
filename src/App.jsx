import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DefaultLayout from "./layout/DefaultLayout"
import { ResourceProvider } from "./context/ResourceContext"
import { CalendarProvider } from "./context/CalendarContext"
import SpellPage from "./pages/SpellPage"
import CreateSpell from "./pages/CreateSpell"
import CreateClass from "./pages/CreateClass"
import ClassPage from "./pages/ClassPage"
import CreateSkill from "./pages/CreteSkill"
import PageTest from "./pages/PageTest"
import CreateSubClass from "./pages/CreateSubClass"
import NotFound from "./pages/NotFound"
import InitiativePage from "./pages/InitiativePage"
import ClassFeaturePage from "./pages/ClassFeaturePage"
import CreateEditFeature from "./pages/CreateEditFeature"


function App() {
  return (
    <BrowserRouter>
      <ResourceProvider>
        <CalendarProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/iniziativa" element={<InitiativePage />} />
              <Route path="/incantesimi" element={<SpellPage />} />
              <Route path="/aggiungi-incantesimo" element={<CreateSpell />} />
              <Route path="/incantesimi/modifica/:id" element={<CreateSpell />} />
              <Route path="/classe/crea-classe" element={<CreateClass />} />
              <Route path="/classe/:slug" element={<ClassPage />} />
              <Route path="/classe/:slug/feature" element={<ClassFeaturePage />} />
              <Route path="/classe/:slug/feature/aggiungi-feature" element={<CreateEditFeature />} />
              <Route path="/classe/:slug/feature/:id/modifica" element={<CreateEditFeature />} />
              <Route path="/classe/:slug/sotto-classe/nuova" element={<CreateSubClass />} />
              <Route path="/classe/:slug/skill/nuova" element={<CreateSkill />} />
              <Route path="/classe/:slug/sotto-classe/:subClassId/skill/nuova" element={<CreateSkill />} />
              <Route path="/classe/:slug/skill/:id/modifica" element={<CreateSkill />} />
              <Route path="/test" element={<PageTest />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CalendarProvider>
      </ResourceProvider>
    </BrowserRouter>

  )

}

export default App
