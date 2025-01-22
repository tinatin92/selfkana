// import audioA from "@/assets/a.mp3";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getLetters } from "@/supabase/lessons";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FaPlay } from "react-icons/fa6";

/* const data = [
  {
    hiragana: "あ",
    katakana: "ア",
    georgian: "ა",
    audio: audioA,
    description:
      "[ა] – ჰირაგანას ნიშანი. იგივეა, რაც ქართული „ა“ ნიშანი შედგება სამი ხაზისაგან.",
  },
  {
    hiragana: "い",
    katakana: "ア",
    georgian: "ა",
    audio: audioA,
    description:
      "[ა] – ჰირაგანას ნიშანი. იგივეა, რაც ქართული „ა“ ნიშანი შედგება სამი ხაზისაგან.",
  },
  {
    hiragana: "う",
    katakana: "ア",
    georgian: "ა",
    audio: audioA,
    description:
      "[ა] – ჰირაგანას ნიშანი. იგივეა, რაც ქართული „ა“ ნიშანი შედგება სამი ხაზისაგან.",
  },
  {
    hiragana: "え",
    katakana: "ア",
    georgian: "ა",
    audio: audioA,
    description:
      "[ა] – ჰირაგანას ნიშანი. იგივეა, რაც ქართული „ა“ ნიშანი შედგება სამი ხაზისაგან.",
  },
  {
    hiragana: "お",
    katakana: "ア",
    georgian: "ა",
    audio: audioA,
    description:
      "[ა] – ჰირაგანას ნიშანი. იგივეა, რაც ქართული „ა“ ნიშანი შედგება სამი ხაზისაგან.",
  },
]; */

const LettetSlider: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const {
    data: lettersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["letters"],
    queryFn: getLetters,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Sorry, Data can't be fetched!</div>;
  }
  console.log(lettersData);
  return (
    <div className="w-full xl:w-1/2  flex items-center justify-center md:px-12 mb-9 xl:mb-0">
      <Carousel className="w-full">
        <CarouselContent>
          {lettersData?.map((letter, id) => (
            <CarouselItem className=" w-full" key={id}>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 ">
                  <div className="flex flex-col w-1/2 gap-3">
                    <div className="h-full bg-customBage dark:bg-opacity-20 p-4 rounded-xl ">
                      <div className=" text-xl mb-4 text-center">Hiragana</div>
                      <div className=" flex items-center justify-center text-[80px]  md:text-[160px] font-medium h-full">
                        {letter.letter_hiragana}
                      </div>
                    </div>
                  </div>

                  <div className="flex  flex-col w-1/2 gap-3">
                    <div className="h-[150px] rounded-xl flex items-center justify-center">
                      <audio ref={audioRef} className="hidden" controls>
                        <source
                          src={letter.audio ?? undefined}
                          type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                      </audio>
                      <Button
                        onClick={handleClick}
                        className="w-[100px] h-[100px] bg-customRed rounded-full cursor-pointer flex items-center justify-center "
                      >
                        {" "}
                        <FaPlay className="w-[40px] h-10  text-white" />
                      </Button>
                    </div>

                    <div className="h-[150px] bg-customBage dark:bg-opacity-20  p-4 rounded-xl ">
                      <div className=" text-xl mb-4 text-center">Georgian</div>
                      <div className=" flex items-center justify-center  text-7xl font-medium">
                        {letter.letter_georgian}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-customBage dark:bg-opacity-20  rounded-xl min-h-[150px] p-4 text-xl">
                  <div className="">{letter.description}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default LettetSlider;
