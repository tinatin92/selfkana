import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStoryById } from "@/supabase/stories";
import Container from "@/components/ui/container";
import { supabase } from "@/supabase";

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

  const audioUrl = storieDetail.audio_url
    ? supabase.storage.from("books_url").getPublicUrl(storieDetail.audio_url)
        .data.publicUrl
    : null;

  return (
    <Container>
      <div className="bg-customRed p-3 rounded-2xl mb-10 flex items-center justify-center ">
        {audioUrl && <audio src={audioUrl} controls />}
      </div>
      <div className=" p-6 rounded-3xl bg-customBage dark:bg-opacity-20">
        <div className="  mb-7 font-semibold flex gap-4 items-center">
          <div className="text-4xl">{storieDetail.title_ja}</div>
          <div className="text-2xl">({storieDetail.title_en})</div>
        </div>
        <div className="">{storieDetail.description}</div>
      </div>
    </Container>
  );
};

export default StorieDetail;
