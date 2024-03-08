import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/Theme.Provider.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { NavbarProvider } from './context/ResponsiveNabBar.tsx'
import {DashboardPage,NotFound,SignInPage,PlacesDetailsPage,PlacesPage,ProfileInformationPage,ProfilePasswordField,VerifyPage,UsersPage,VideosPage, EventsPage} from '@/page'
import ProtectedRoutes from './page/ProtectedRoutes.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/auth/login',
    element: <SignInPage/>,
    errorElement: <NotFound/>
  },
  {
    path: '/auth/password/new',
    element: <VerifyPage/>,
    errorElement: <NotFound/>
  },
  {
    path:'/*',
    element:<NotFound/>
  },
  {
    element: <ProtectedRoutes/>,
    children: [
      {
        path: '/',
        element: <DashboardPage/>,
        errorElement: <NotFound/>
      },
      {
        path: '/places',
        element: <PlacesPage/>,
        errorElement: <NotFound/>
      },
      {
        path: '/places/details',
        element: <PlacesDetailsPage/>,
        errorElement: <NotFound/>
      },
      {
        path: '/videos',
        element: <VideosPage/>,
        errorElement: <NotFound/>
      },
      {
        path: '/users',
        element: <UsersPage/>,
        errorElement: <NotFound/>
      },
      {
        path: '/profile/information',
        element:<ProfileInformationPage/>,
        errorElement:<NotFound/>
      },
      {
        path: '/profile/password',
        element: <ProfilePasswordField/>,
        errorElement: <NotFound/>
      },
      {
        path: '/events',
        element: <EventsPage/>,
        errorElement: <NotFound/>
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <NavbarProvider>
      <RouterProvider router={router}/>
      <Toaster/>
    </NavbarProvider>
    </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
