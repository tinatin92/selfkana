import { NavLink } from "react-router-dom";
import Container from "../ui/container";
import logo from "@/assets/logo-big.svg";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/supabase/auth";
import { Button } from "../ui/button";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import i18n from "i18next";
// import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { RxHamburgerMenu } from "react-icons/rx";
import { APP_PATHS } from "@/routes/default/index.enum";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAtom(userAtom);

  // const { t } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };
  const toggleMenu = () => {
    if (window.innerWidth < 1280) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const { mutate: handleLogoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  return (
    <header className="relative w-full bg-customGray py-2  rounded-bl-[24px] rounded-br-[24px] border-b border-white ">
      <Container>
        <div className="flex items-center w-full">
          <NavLink to={APP_PATHS.INDEX}>
            <img src={logo} alt="Logo" />
          </NavLink>
          <div
            className={`burger ${isMenuOpen ? "block" : "hidden"} text-white xl:flex-1 items-center bg-customGray
            absolute z-20 top-[88px] right-0 flex-col
           xl:static  xl:flex-row xl:items-center xl:gap-6`}
          >
            <nav className="flex flex-col xl:flex-row justify-between px-9 py-7 xl:py-0 items-center">
              <div className="flex flex-col xl:flex-row gap-6 justify-center items-center">
                <NavLink
                  className="text-white text-xl"
                  to={APP_PATHS.STORIE_LIST}
                  onClick={toggleMenu}
                >
                  Stories
                </NavLink>
                <NavLink
                  className="text-white text-xl"
                  to={APP_PATHS.LESSONS}
                  onClick={toggleMenu}
                >
                  Lessons
                </NavLink>
              </div>
              {!user ? (
                <Button onClick={toggleMenu}>
                  <NavLink to={APP_PATHS.LOGIN}>Login</NavLink>
                </Button>
              ) : (
                <div className="flex flex-col xl:flex-row justify-center items-center gap-5 xl:gap-0 mt-5 xl:mt-0">
                  <NavLink
                    className="text-white text-xl xl:mr-5"
                    to={APP_PATHS.PROFILE}
                    onClick={toggleMenu}
                  >
                    Profile
                  </NavLink>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogoutMutation();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )}{" "}
            </nav>
          </div>

          <div className="hidden xl:block text-white flex-1 items-center bg-customGray gap-6 ">
            <nav className="flex flex-col xl:flex-row justify-between px-9 py-7 xl:py-0 items-center">
              <div className="flex flex-col xl:flex-row gap-6 justify-center items-center">
                <NavLink
                  className="text-white text-xl"
                  to={APP_PATHS.STORIE_LIST}
                >
                  Stories
                </NavLink>
                <NavLink className="text-white text-xl" to={APP_PATHS.LESSONS}>
                  Lessons
                </NavLink>
              </div>
              {!user ? (
                <Button onClick={toggleMenu}>
                  <NavLink to={APP_PATHS.LOGIN}>Login</NavLink>
                </Button>
              ) : (
                <div className="flex flex-col xl:flex-row justify-center items-center gap-5 xl:gap-0 mt-5 xl:mt-0">
                  <NavLink
                    className="text-white text-xl xl:mr-5"
                    to={APP_PATHS.PROFILE}
                    onClick={toggleMenu}
                  >
                    Profile
                  </NavLink>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogoutMutation();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )}{" "}
            </nav>
          </div>

          <div className="relative ml-auto">
            <Button className="relative" onClick={() => setIsOpen(!isOpen)}>
              lang
            </Button>
            {isOpen && (
              <div className="z-10 absolute top-14 left-1/2 -translate-x-1/2 bg-white border dark:bg-opacity-20 shadow-md rounded-sm">
                <div
                  className="cursor-pointer p-4 hover:bg-slate-300 transition duration-300"
                  onClick={() => handleChangeLanguage("ka")}
                >
                  GEO
                </div>
                <div
                  className="cursor-pointer p-4 hover:bg-slate-300 transition duration-300"
                  onClick={() => handleChangeLanguage("en")}
                >
                  ENG
                </div>
                <div
                  className="cursor-pointer p-4 hover:bg-slate-300 transition duration-300"
                  onClick={() => handleChangeLanguage("ja")}
                >
                  JAP
                </div>
              </div>
            )}
          </div>
          <div className="ml-5">
            <ModeToggle />
          </div>

          <div
            onClick={toggleMenu}
            className="xl:hidden ml-5 text-white text-3xl"
          >
            <RxHamburgerMenu />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
