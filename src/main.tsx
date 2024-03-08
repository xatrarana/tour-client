import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/Theme.Provider.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { NavbarProvider } from './context/ResponsiveNabBar.tsx'
import { NotFound, SignInPage, VerifyPage } from '@/page'
import ProtectedRoutes from './page/ProtectedRoutes.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AppLayout from './components/windows/AppLayout.tsx'
import UserGreeting from './components/dashboard/UserGreeting.component.tsx'
import FeaturedWindow from './components/dashboard/Featured.window.tsx'
import PlacesHome from './components/places/place.home.tsx'
import PlacesDetails from './components/places/place.details.tsx'
import UserHomeCenter from './components/users/users.home.tsx'
import VideoHome from './components/videos/Video.Home.tsx'
import ProfileInformation from './components/profile/Profile.Information.tsx'
import ProfilePassword from './components/profile/Profile.password.tsx'
import EventHome from './components/events/event.home.tsx'
import DetailsWindow from './components/dashboard/Details.window.tsx'
import { DataProvider } from './context/DataContext.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <SignInPage />,
    errorElement: <NotFound />
  },
  {
    path: '/auth/password/new',
    element: <VerifyPage />,
    errorElement: <NotFound />
  },
  {
    path: '/*',
    element: <NotFound />
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <AppLayout>
          <UserGreeting />
          <FeaturedWindow />
          <DetailsWindow />
        </AppLayout>,
        errorElement: <NotFound />
      },
      {
        path: '/places',
        element: <AppLayout> <PlacesHome /> </AppLayout>,
        errorElement: <NotFound />
      },
      {
        path: '/places/details',
        element: <AppLayout><PlacesDetails /></AppLayout>,
        errorElement: <NotFound />
      },
      {
        path: '/videos',
        element: <AppLayout><VideoHome /></AppLayout>,
        errorElement: <NotFound />
      },
      {
        path: '/users',
        element: <AppLayout><UserHomeCenter /></AppLayout>,
        errorElement: <NotFound />
      },
      {
        path: '/profile/information',
        element: <AppLayout><ProfileInformation /></AppLayout>,
        errorElement: <NotFound />
      },
      {
        path: '/profile/password',
        element: <AppLayout><ProfilePassword /></AppLayout>,
        errorElement: <NotFound />
      },
      {
        path: '/events',
        element: <AppLayout>
          <EventHome />
        </AppLayout>,
        errorElement: <NotFound />
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <NavbarProvider>
              <RouterProvider router={router} />
              <Toaster />
            </NavbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
)
