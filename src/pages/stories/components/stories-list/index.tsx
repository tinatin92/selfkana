import Container from "@/components/ui/container";
import { getStories } from "@/supabase/stories";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const StoriesList = () => {
  const {
    data: StoriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Sorry, Data can't be fetched!</div>;
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 justify-center items-center bg-slate-400">
        {StoriesData?.map((storie, id) => {
          return (
            <div key={id} className="p-6 bg-customBage dark:bg-opacity-20 rounded-2xl w-full xl:w-1/2">
              <div className="text-2xl font-semibold">{storie.title}</div>
              <div className="mt-4 line-clamp-3">
                {storie.description}
              </div>
              <div className="font-semibold text-customRed underline text-right mt-6">
                <Link  to={`/storiedetail/${storie.id}`}>წაიკითხე მეტი</Link>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default StoriesList;
