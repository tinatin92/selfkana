import spinnerImage from "@/assets/Spinner@1x-1.0s-200px-200px.svg";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img src={spinnerImage} alt="sponner" />
    </div>
  );
};

export default Spinner;
