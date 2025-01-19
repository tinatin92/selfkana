import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import audio from "@/assets/a.mp3";
import { useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  console.log(t("Welcome to React"));

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <Container>
      <div className="flex ">
        <div
          className=" border-[12px] p-6 border-white w-full
       rounded-3xl bg-customGray bg-math-grid bg-60px
         lg:w-[650px] xl:w-2/3 lg:p-12
        "
        >
          <div className="text-white text-4xl font-semibold xl:text-5xl">
            კეთილი იყოს შენი მობრძანება
          </div>
          <div className="text-white text-2xl mt-6">
            ჩვენთან აღმოაჩენ იაპონურ ლიტერატურას,
          </div>
          <div>
            {/* {t("home-page.Welcome")} */}
            <Trans>home-page.Welcome</Trans>
          </div>
          <div
            className=" flex justify-end relative z-0 text-5xl lg:text-7xl text-customRed mt-16 xl:mt-20 text-center 
        "
          >
            <span
              className="relative block  after:absolute after:content-[''] after:w-[150px] after:h-[150px] 
           after:bg-white after:rounded-full after:top-1/2 after:left-1/2 
           after:-translate-x-1/2 after:-translate-y-1/2 after:z-[-1]
           lg:after:w-[220px] lg:after:h-[220px] "
            >
              Selfカな
            </span>
          </div>
          <Button className="mt-20">Sign Up</Button>
        </div>

        <div className="relative hidden lg:block flex-1">
          <div
            className=" absolute top-8 -left-10 w-[250px] h-[250px] rounded-full bg-customRed flex items-center 
            justify-center text-6xl text-white writing-vertical-lr text-upright lg:w-[300px] lg:h-[300px] lg:text-6xl
            xl:w-[350px] xl:h-[350px] xl:text-7xl"
          >
            日本語
          </div>
          <audio ref={audioRef} className="hidden" controls>
            <source src={audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <div
            className="w-[80px] h-[80px] rounded-full bg-customGray cursor-pointer
           text-white text-2xl flex items-center
            justify-center absolute bottom-7 right-7 xl:w-[100px] xl:h-[100px] xl:text-4xl xl:right-12 dark:bg-white dark:text-customRed"
            onClick={handleClick}
          >
            あ
          </div>
          <div
            className="w-[150px] h-[150px] border-[4px] border-customGray rounded-full flex 
          items-center justify-center text-customGray absolute right-0 text-3xl font-semibold
          xl:w-[220px] xl:h-[220px] xl:text-5xl xl:-top-16 xl:right-12 dark:border-white dark:text-white
          "
          >
            かな
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
