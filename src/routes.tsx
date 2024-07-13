import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './layout/DefaultLayout';
import RequireAuth from './common/auth';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route element={<RequireAuth />} >
        <Route
          path="/dashboard"
          element={
            <DefaultLayout>
              <PageTitle title="eCommerce Dashboard" />
              <ECommerce />
            </DefaultLayout>
          }
        >
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <PageTitle title="Signup" />
            <SignUp />
          </>
        }
      />
    </Routes>
  );
}

export default App;
