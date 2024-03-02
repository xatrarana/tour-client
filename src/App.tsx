import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './page/Dashboard.page';
import ProtectedRoute from './Protected.route';
import SignInPage from './page/auth/Signin.page';
import NotFound from './page/404NotFound.page';
import VerifyPage from './page/auth/Verify.page';
import PlacesPage from './page/Places.page';
import ProfileWindow from './components/windows/Profile.window';
import ProfileInformation from './components/profile/Profile.Information';
import ProfilePassword from './components/profile/Profile.password';
import PlacesDetailsPage from './page/places.details.page';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute children={<DashboardPage/>} />} />
        <Route path="/users/login"  element={<SignInPage/>} />
        <Route path="/users/password/new"  element={<VerifyPage/>} />
        <Route path="/profile/information"  element={<ProfileWindow component={<ProfileInformation/>}/>} />
        <Route path="/profile/password"  element={<ProfileWindow component={<ProfilePassword/>}/>} />
        <Route path='/places' element={<PlacesPage/>}/>
        <Route path='/places/details' element={<PlacesDetailsPage/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}



export default App;
