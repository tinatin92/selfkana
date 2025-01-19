import Container from "@/components/ui/container";
import LettetSlider from "../lettel-slider";
import Canva from "../components/canva";

const LessonsPage = () => {
  return (
    <Container>
      <div className="flex flex-col xl:flex-row xl:gap-6 justify-between ">
        <LettetSlider />

        <Canva />
      </div>
    </Container>
  );
};

export default LessonsPage;
