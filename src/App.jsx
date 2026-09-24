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
import { AuthProvider } from "./context/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import SpeciesPage from "./pages/SpeciesPage"
import CreateSpecies from "./pages/CreateSpecies"
import TalentPage from "./pages/TalentPage"
import CreateTalent from "./pages/CreateTalent"
import BackgroundPage from "./pages/BackgroundPage"
import CreateBg from "./pages/CreateBg"
import CreateMonster from "./pages/CreateMonster"
import MonsterPage from "./pages/MonsterPage"
import AdminPage from "./pages/AdminPage"
import UsersPage from "./pages/UsersPage"
import CreateAction from "./pages/CreateAction"
import CreateTrait from "./pages/CreateTrait"
import CreateBonusAction from "./pages/CreateBonusAction"
import HandBookPage from "./pages/HandBookPage"
import ClassListPage from "./pages/ClassListPage"


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResourceProvider>
          <CalendarProvider>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/iniziativa" element={<InitiativePage />} />
                <Route path="/dati-di-gioco" element={<HandBookPage />} />
                <Route path="/dati-di-gioco/incantesimi" element={<SpellPage />} />
                <Route path="/aggiungi-incantesimo" element={<CreateSpell />} />
                <Route path="/incantesimi/modifica/:id" element={<CreateSpell />} />
                <Route path="/dati-di-gioco/specie" element={<SpeciesPage />} />
                <Route path="/aggiungi-specie" element={<CreateSpecies />} />
                <Route path="/specie/modifica/:id" element={<CreateSpecies />} />
                <Route path="/dati-di-gioco/talenti" element={<TalentPage />} />
                <Route path="/aggiungi-talento" element={<CreateTalent />} />
                <Route path="/talenti/modifica/:id" element={<CreateTalent />} />
                <Route path="/dati-di-gioco/background" element={<BackgroundPage />} />
                <Route path="/aggiungi-background" element={<CreateBg />} />
                <Route path="/background/modifica/:id" element={<CreateBg />} />
                <Route path="/dati-di-gioco/classi" element={<ClassListPage />} />
                <Route path="/classe/crea-classe" element={<CreateClass />} />
                <Route path="/classe/:slug" element={<ClassPage />} />
                <Route path="/classe/:slug/feature" element={<ClassFeaturePage />} />
                <Route path="/classe/:slug/feature/aggiungi-feature" element={<CreateEditFeature />} />
                <Route path="/classe/:slug/feature/:id/modifica" element={<CreateEditFeature />} />
                <Route path="/classe/:slug/sotto-classe/nuova" element={<CreateSubClass />} />
                <Route path="/classe/:slug/skill/nuova" element={<CreateSkill />} />
                <Route path="/classe/:slug/sotto-classe/:subClassId/skill/nuova" element={<CreateSkill />} />
                <Route path="/classe/:slug/skill/:id/modifica" element={<CreateSkill />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/lista-mostri" element={<MonsterPage />} />
                <Route path="/admin/monster/create" element={<CreateMonster />} />
                <Route path="/admin/monster/modifica/:id" element={<CreateMonster />} />
                <Route path="/admin/utenti" element={<UsersPage />} />
                <Route path="/admin/monster/:monsterId/azione/create" element={<CreateAction />} />
                <Route path="/admin/monster/:monsterId/azione-bonus/create" element={<CreateBonusAction />} />
                <Route path="/admin/monster/:monsterId/tratto/create" element={<CreateTrait />} />
                <Route path="/admin/azione/modifica/:id" element={<CreateAction />} />
                <Route path="/admin/trait/modifica/:id" element={<CreateTrait />} />
                <Route path="/admin/azione-bonus/modifica/:id" element={<CreateBonusAction />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CalendarProvider>
        </ResourceProvider>
      </AuthProvider>
    </BrowserRouter>

  )

}

export default App
