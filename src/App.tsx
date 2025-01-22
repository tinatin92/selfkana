import { Routes, Route } from "react-router-dom";
import HeroSection from "./pages/home/view/hero-section";
import Defaultlayout from "./layouts/default";
import LessonsPage from "./pages/lessons/view/indesx";
import SignUpPage from "./pages/sign-up/view";
import LoginFormPage from "./pages/login/view";
import { useAtom } from "jotai";
import { userAtom } from "./store/auth";
import { useEffect } from "react";
import { supabase } from "./supabase";
import ProfilePage from "./pages/profile/view/profile-view";

import CreateStoriesPage from "./pages/stories/view/create-storie-view";
import StoriesList from "./pages/stories/components/stories-list";
import StorieDetailPage from "./pages/stories/view/storie-detail-view";
import UpdateStoriePage from "./pages/stories/view/update-storie";

function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("sessionddd", session);
      setUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={<Defaultlayout />}>
        <Route path="/" element={<HeroSection />} />
        <Route path="lessons" element={<LessonsPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginFormPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="create-storie" element={<CreateStoriesPage />} />
        <Route path="storie-list" element={<StoriesList />} />
        <Route path="storiedetail/:id" element={<StorieDetailPage />} />
        <Route path="update-storie/:id" element={<UpdateStoriePage />} />
      </Route>
    </Routes>
  );
}

export default App;
