import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { APP_PATHS } from "@/routes/default/index.enum";
import readImage from "@/assets/read.svg";
import learnImage from "@/assets/learn.svg";
import profileImage from "@/assets/profile.svg";

const Banners: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-28">
      <Container>
        <div className="flex flex-col xl:flex-row gap-5">
          <div
            className=" text-white w-full xl:w-1/3  border-[6px] p-6 xl:p-12 border-white  rounded-3xl bg-customGray
           bg-math-grid bg-60px"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-[150px] h-[150px] rounded-full bg-white flex items-center justify-center text-customRed ">
                <img className="w-[100px] " src={learnImage} alt="learn" />
              </div>
            </div>
            <div className="text-2xl leading-normal font-semibold text-center">
              {t("home-page.banner1")}
            </div>
            <div className="mt-12 flex items-center justify-center">
              <Link to={APP_PATHS.LESSONS}>
                <Button>{t("home-page.bannerButton1")}</Button>
              </Link>
            </div>
          </div>

          <div
            className="text-white w-full xl:w-1/3  border-[6px] p-6 xl:p-12 border-white  rounded-3xl bg-customGray
           bg-math-grid bg-60px"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-[150px] h-[150px] rounded-full bg-white flex items-center justify-center text-customRed ">
                <img className="w-[100px] " src={readImage} alt="learn" />
              </div>
            </div>
            <div className="text-2xl leading-normal font-semibold text-center">
              {t("home-page.banner2")}
            </div>
            <div className="mt-12 flex items-center justify-center">
              <Link to={APP_PATHS.STORIE_LIST}>
                <Button>{t("home-page.bannerButton2")}</Button>
              </Link>
            </div>
          </div>

          <div
            className="text-white w-full xl:w-1/3  border-[6px] p-6 xl:p-12 border-white  rounded-3xl bg-customGray
           bg-math-grid bg-60px"
          >
             <div className="flex items-center justify-center mb-6">
              <div className="w-[150px] h-[150px] rounded-full bg-white flex items-center justify-center text-customRed ">
                <img className="w-[100px] " src={profileImage} alt="learn" />
              </div>
            </div>
            <div className="text-2xl leading-normal font-semibold text-center">
              {t("home-page.banner3")}
            </div>
            <div className="mt-12 flex items-center justify-center">
              <Link to={APP_PATHS.SIGNUP}>
                <Button>{t("home-page.bannerButton3")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banners;
