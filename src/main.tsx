import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { store } from "./app/store.ts";
import "./index.css";
import CreateCV from "./pages/CreateCV.tsx";
import HomePage, {
  action as searchITJobAction,
} from "./pages/home/HomePage.tsx";
import JobPreferences from "./pages/JobPreferences.tsx";
import ManageCV from "./pages/ManageCV.tsx";
import Profile from "./pages/profile/Profile.tsx";
import SignIn, { action as signInAction } from "./pages/SignIn.tsx";
import SignUp, { action as signUpAction } from "./pages/SignUp.tsx";
import Layout from "./ui/Layout/Layout.tsx";
import LayoutWithoutFooter from "./ui/Layout/LayoutWithoutFooter.tsx";
import { loadLoginStatus } from "./utils/loadersFunction.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import LoadUserAuthenticationData from "./components/LoadUserAuthenticationData.tsx";
import ProfileLayout from "./pages/profile/ui/ProfileLayout.tsx";
import ContactPage from "./pages/contact/ContactPage.tsx";
import { LoginEmployer } from "./pages/employer/login.tsx";
import EmployerRegister from "./pages/employer/register.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  EMPLOYER_ROUTES,
  EmployerAuthProvider,
  EmployerLayout,
} from "./modules/employer/index.ts";
import { EmployerProfile } from "./pages/employer/profile.tsx";
import { EditProfile } from "./pages/employer/edit-profile.tsx";
import { CreateJD } from "./pages/employer/create-jd.tsx";
import { ListJD } from "./pages/employer/list-jd.tsx";
import { EditJD } from "./pages/employer/edit-jd.tsx";
import { ListApplication } from "./pages/employer/list-application.tsx";
import { EmployerList, EmployerDetail, JobSaved } from "./modules/jobSeeker";
import WrapperLayout from "./modules/jobSeeker/layout/wraper.tsx";
import { JobsApply } from "./modules/jobSeeker/pages/job-apply.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Company from "./pages/company/Company.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Job from "./pages/job/Job.tsx";
import ProfileSaved from "./pages/employer/profile-saved.tsx";
import FindProfileCandidate from "./pages/employer/find-profile-candidate.tsx";
import SearchJobs from "./pages/job/SearchJobs.tsx";
import { COMMON_ROUTES } from "./modules/messages/constants.ts";
import { ConversationProvider } from "./modules/messages/conversationContext.tsx";
import { ConversationPage } from "./modules/messages/Conversation.tsx";
import { PusherProvider } from "./modules/messages/pusherContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <PusherProvider>
          <Layout />
        </PusherProvider>
      </LoadUserAuthenticationData>
    ),
    errorElement: <ErrorPage />,
    loader: loadLoginStatus,
    children: [
      {
        path: "/",
        element: <HomePage />,
        action: searchITJobAction,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
        action: signInAction,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "/contact",
        element: <ContactPage />,
        action: signUpAction,
      },
      {
        path: "/company/:companyNameAndcompanyId",
        element: <Company />,
      },
      {
        path: "/job/:jobTitleAndId",
        element: <Job />,
      },
      {
        path: "/search-jobs/:searchText",
        element: <SearchJobs />,
        action: searchITJobAction,
      },
      {
        path: COMMON_ROUTES.CONVERSATIONS,
        element: (
          <ConversationProvider>
            <ConversationPage />
          </ConversationProvider>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <ProtectedRoute>
          <Layout
            moreMenu={
              <>
                <li>
                  <Link to="/job/saved" className="text-white">
                    Tìm Việc
                  </Link>
                </li>
              </>
            }
          />
        </ProtectedRoute>
      </LoadUserAuthenticationData>
    ),
    loader: loadLoginStatus,
    children: [
      {
        path: "/profile",
        element: <ProfileLayout />,
        action: signInAction,
        children: [
          { path: "", element: <Profile /> },
          {
            path: "manage-cv",
            element: <ManageCV />,
          },
          {
            path: "job-preferences",
            element: <JobPreferences />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <ProtectedRoute>
          <Layout
            moreMenu={
              <>
                <li>
                  <Link to="/employer/list" className="text-white">
                    Tìm Việc
                  </Link>
                </li>
              </>
            }
          />{" "}
        </ProtectedRoute>
      </LoadUserAuthenticationData>
    ),
    loader: loadLoginStatus,
    children: [
      {
        path: "/employer",
        element: <WrapperLayout />,
        children: [
          { path: "list", element: <EmployerList /> },
          { path: "detail/:id", element: <EmployerDetail /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <ProtectedRoute>
          <Layout
            moreMenu={
              <>
                <li>
                  <Link to="/employer/list" className="text-white">
                    Tìm Việc
                  </Link>
                </li>
              </>
            }
          />
        </ProtectedRoute>
      </LoadUserAuthenticationData>
    ),
    loader: loadLoginStatus,
    children: [
      {
        path: "/job",
        element: <WrapperLayout />,
        children: [
          { path: "saved", element: <JobSaved /> },
          { path: "applied", element: <JobsApply /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <LoadUserAuthenticationData>
        <ProtectedRoute>
          <LayoutWithoutFooter />
        </ProtectedRoute>
      </LoadUserAuthenticationData>
    ),
    loader: loadLoginStatus,
    children: [
      {
        path: "/create-cv",
        element: <CreateCV />,
        action: signInAction,
      },
    ],
  },
  {
    path: "/",
    element: (
      <EmployerAuthProvider>
        <PusherProvider>
          <EmployerLayout />
        </PusherProvider>
      </EmployerAuthProvider>
    ),
    children: [
      {
        path: EMPLOYER_ROUTES.LOGIN,
        element: <LoginEmployer />,
      },
      {
        path: EMPLOYER_ROUTES.REGISTER,
        element: <EmployerRegister />,
      },
      {
        path: EMPLOYER_ROUTES.PROFILE,
        element: <EmployerProfile />,
      },
      {
        path: EMPLOYER_ROUTES.EDIT_PROFILE,
        element: <EditProfile />,
      },
      {
        path: EMPLOYER_ROUTES.CREATE_JD,
        element: <CreateJD />,
      },
      {
        path: EMPLOYER_ROUTES.LIST_JD,
        element: <ListJD />,
      },
      {
        path: EMPLOYER_ROUTES.EDIT_JD,
        element: <EditJD />,
      },
      {
        path: EMPLOYER_ROUTES.LIST_APPLICATION,
        element: <ListApplication />,
      },
      {
        path: EMPLOYER_ROUTES.LIST_CANDIDATE_PROFILE_SAVED,
        element: <ProfileSaved />,
      },
      {
        path: EMPLOYER_ROUTES.FIND_PROFILE_CANDIDATE,
        element: <FindProfileCandidate />,
      },
      {},
    ],
  },
  {
    path: "/",
    element: (
      <EmployerAuthProvider>
        <PusherProvider>
          <EmployerLayout hideTab={true} />
        </PusherProvider>
      </EmployerAuthProvider>
    ),
    children: [
      {
        path: EMPLOYER_ROUTES.CONVERSATIONS,
        element: (
          <ConversationProvider>
            <ConversationPage />
          </ConversationProvider>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
