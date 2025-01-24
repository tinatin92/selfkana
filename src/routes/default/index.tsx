import { APP_PATHS } from "@/routes/default/index.enum";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import { HeroSection } from "./home";
import { LoginFormPage } from "./login";
import { SignUpPage } from "./signup";
import { LessonsPage } from "./lessons";
import { ProfilePage } from "./profile";
import { CreateStoriesPage } from "./create-storie";
import { UpdateStoriePage } from "./update-storie";
import { StorieDetailPage } from "./storie-detail";
import { StoriesList } from "./storie-list";
import Spinner from "@/components/ui/spinner";

export const ROUTES = [
  <Route
    path={APP_PATHS.INDEX}
    element={
      <Suspense fallback={ <Spinner />}>
        <HeroSection />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.LESSONS}
    element={
      <Suspense fallback={ <Spinner />}>
        <LessonsPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.SIGNUP}
    element={
      <Suspense fallback={ <Spinner />}>
        <SignUpPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.LOGIN}
    element={
      <Suspense fallback={ <Spinner />}>
        <LoginFormPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.PROFILE}
    element={
      <Suspense fallback={ <Spinner />}>
        <ProfilePage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.CREATE_STORIE}
    element={
      <Suspense fallback={ <Spinner />}>
        <CreateStoriesPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.STORIE_LIST}
    element={
      <Suspense fallback={ <Spinner />}>
        <StoriesList />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.STORIE_DETAIL + "/:id"}
    element={
      <Suspense fallback={ <Spinner />}>
        <StorieDetailPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.UPDATE_STORIE + "/:id"}
    element={
      <Suspense fallback={ <Spinner />}>
        <UpdateStoriePage />
      </Suspense>
    }
  />,
];
