import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Banners: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-28">
      <Container>
        <div className="flex flex-col xl:flex-row gap-5">
          <div
            className=" w-full xl:w-1/3  border-[6px] p-6 xl:p-12 border-white  rounded-3xl bg-customGray
           bg-math-grid bg-60px"
          >
            <div className="text-2xl leading-normal font-semibold">
              {t("home-page.banner1")}
            </div>
            <div className="mt-12">
              <Link to="lessons">
                <Button>{t("home-page.bannerButton1")}</Button>
              </Link>
            </div>
          </div>

          <div
            className="w-full xl:w-1/3  border-[6px] p-6 xl:p-12 border-white  rounded-3xl bg-customGray
           bg-math-grid bg-60px"
          >
            <div className="text-2xl leading-normal font-semibold">
              {t("home-page.banner2")}
            </div>
            <div className="mt-12">
              <Link to="storie-list">
                <Button>{t("home-page.bannerButton2")}</Button>
              </Link>
            </div>
          </div>

          <div
            className="w-full xl:w-1/3  border-[6px] p-6 xl:p-12 border-white  rounded-3xl bg-customGray
           bg-math-grid bg-60px"
          >
            <div className="text-2xl leading-normal font-semibold">
              {t("home-page.banner3")}
            </div>
            <div className="mt-12">
              <Link to="signup">
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
