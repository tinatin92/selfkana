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

export const ROUTES = [
  <Route
    path={APP_PATHS.INDEX}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <HeroSection />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.LESSONS}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <LessonsPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.SIGNUP}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <SignUpPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.LOGIN}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <LoginFormPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.PROFILE}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <ProfilePage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.CREATE_STORIE}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <CreateStoriesPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.STORIE_LIST}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <StoriesList />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.STORIE_DETAIL + "/:id"}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <StorieDetailPage />
      </Suspense>
    }
  />,

  <Route
    path={APP_PATHS.UPDATE_STORIE + "/:id"}
    element={
      <Suspense fallback={<p>Loading layout...</p>}>
        <UpdateStoriePage />
      </Suspense>
    }
  />,
];
