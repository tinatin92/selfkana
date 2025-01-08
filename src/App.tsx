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

function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
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
      </Route>
    </Routes>
  );
}

export default App;
