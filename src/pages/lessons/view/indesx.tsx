import Container from "@/components/ui/container";
import LettetSlider from "../lettel-slider";
import Canva from "../components/canva";

const LessonsPage = () => {
  return (
    <Container >
      <div className="flex gap-6 bg-black">
        <LettetSlider />

        <Canva />
      </div>
    </Container>
  );
};

export default LessonsPage;
