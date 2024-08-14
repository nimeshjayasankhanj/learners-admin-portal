import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './components/layout/DefaultLayout';
import RequireAuth from './common/auth';
import RedirectIfAuthenticated from './hoc/RedirectIfAuthenticated';
import Lists from './pages/user/Lists';

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
      <Route element={<RequireAuth />} >
        <Route
          path="/user"
          element={
            <DefaultLayout>
              <PageTitle title="User" />
              <Lists />
            </DefaultLayout>
          }
        >
        </Route>
      </Route>
      <Route element={<RequireAuth />} >
        <Route
          path="/packages"
          element={
            <DefaultLayout>
              <PageTitle title="Packages" />
              <Lists />
            </DefaultLayout>
          }
        >
        </Route>
      </Route>
      <Route element={<RequireAuth />} >
        <Route
          path="/notifications"
          element={
            <DefaultLayout>
              <PageTitle title="Notifications" />
              <Lists />
            </DefaultLayout>
          }
        >
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <SignIn />
          </RedirectIfAuthenticated>
        }
      />
    </Routes>
  );
}

export default App;
