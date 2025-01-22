import Container from "@/components/ui/container";
import LettetSlider from "../lettel-slider";
import Canva from "../components/canva";
import Banner from "@/components/ui/banner";
import { useTranslation } from "react-i18next";

const LessonsPage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Banner className="mb-12">
        <div>{t("lessons.banner")}</div>
      </Banner>
      <div className="flex flex-col xl:flex-row xl:gap-6 justify-between ">
        <LettetSlider />

        <Canva />
      </div>
    </Container>
  );
};

export default LessonsPage;
