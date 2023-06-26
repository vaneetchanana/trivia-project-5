import StartScreen from './components/StartScreen'
import MainScreen from './components/MainScreen'
import Layout from './components/Layout'
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
// import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<StartScreen />} />
          <Route path='main' element={<MainScreen />} />
          {/* catch all route */}
          <Route path='*' element={<h1>Page not found!</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
