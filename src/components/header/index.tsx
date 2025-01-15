import { NavLink } from "react-router-dom";
import Container from "../ui/container";
import logo from "@/assets/logo-big.svg";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/supabase/auth";
import { Button } from "../ui/button";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [user] = useAtom(userAtom);

  const { t } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const { mutate: handleLogoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  return (
    <header className="w-full bg-customGray py-2  rounded-bl-[24px] rounded-br-[24px]">
      <Container>
        <div className="flex items-center w-full">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>

          <div className="text-white flex-1 ">
            <nav className="flex gap-6 justify-center">
              <NavLink className="text-white text-xl" to="lessons">
                Lessons
              </NavLink>
              <NavLink className="text-white text-xl" to="lessons">
                Lessons
              </NavLink>
              {t("Welcome")}
              {!user ? (
                <Button>
                  <NavLink to="/login">Login</NavLink>
                </Button>
              ) : (
                <div>
                  <Button onClick={() => handleLogoutMutation()}>Logout</Button>
                  <NavLink to="/profile">Profile</NavLink>
                </div>
              )}{" "}
            </nav>
          </div>
          <div className="relative">
            <Button className="relative" onClick={() => setIsOpen(!isOpen)}>
              lang
            </Button>
            {isOpen && (
              <div className="z-10 absolute top-14 left-1/2 -translate-x-1/2 bg-white border  shadow-md rounded-sm">
                <div
                  className="cursor-pointer p-4 hover:bg-slate-300 transition duration-300"
                  onClick={() => handleChangeLanguage("ka")}
                >
                  GEO
                </div>
                <div
                  className="cursor-pointer p-4 hover:bg-slate-300 transition duration-300"
                  onClick={() => handleChangeLanguage("ja")}
                >
                  JAP
                </div>
              </div>
            )}
              <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
