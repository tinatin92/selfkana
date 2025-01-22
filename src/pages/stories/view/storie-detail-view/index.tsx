import Banner from "@/components/ui/banner";
import StorieDetail from "../../components/storie-detail";
import { useTranslation } from "react-i18next";

const StorieDetailPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Banner className="mb-8">{t('storie-detail.banner')}</Banner>
      <StorieDetail />
    </div>
  );
};

export default StorieDetailPage;
