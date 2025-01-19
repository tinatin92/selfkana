import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "@/supabase/stories";
import Container from "@/components/ui/container";

const StorieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const storyId = id ? parseInt(id, 10) : undefined;

  const {
    data: storieDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["storie-detail", storyId],
    queryFn: () => getStoryById(storyId!),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading country details...</p>;
  }

  if (isError || !storieDetail) {
    return <p>Country not found or error loading details.</p>;
  }
  const baseUrl =
    "https://uekclpgahxazjutdlngm.supabase.co/storage/v1/object/public/";
  const audioUrl = storieDetail.audio_url
    ? `${baseUrl}${storieDetail.audio_url}`
    : null;

  return (
    <Container>
      <div className="bg-customRed p-3 rounded-2xl mb-10 flex items-center justify-center ">
        {storieDetail.audio_url ? (
          <audio controls>
            <source src={audioUrl ?? undefined} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>No audio available for this story.</p>
        )}
      </div>
      <div className=" p-6 rounded-3xl bg-customBage dark:bg-opacity-20">
        <div className="text-4xl text-center mb-7 font-semibold">
          {storieDetail.title}
        </div>
        <div className="">{storieDetail.description}</div>
      </div>
    </Container>
  );
};

export default StorieDetail;
