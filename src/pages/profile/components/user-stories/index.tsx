import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { deleteStory, getUserStories } from "@/supabase/stories";
import Container from "@/components/ui/container";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { LuPencil } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/spinner";

const UserProfileStories: React.FC = () => {
  const [user] = useAtom(userAtom);

  const queryClient = new QueryClient();

  const userId = user?.user?.id;
  const {
    data: userStories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-stories", userId],
    queryFn: () => getUserStories(userId),
    enabled: !!userId,
  });

  const { mutate: deletStorieMutation } = useMutation({
    mutationKey: ["delete-storie"],
    mutationFn: deleteStory,
    onSuccess: (_, deletedStorieId) => {
      queryClient.setQueryData(["user-stories", userId], (oldData: any[]) =>
        oldData.filter((storie) => storie.id !== deletedStorieId),
      );
    },
  });

  const handleStorieDelete = (storieId: number) => {
    deletStorieMutation(storieId);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Failed to fetch your stories.</p>;
  }

  if (!userStories || userStories.length === 0) {
    return <p>You haven't added any stories yet.</p>;
  }

  return (
    <Container>
      <div className="flex flex-col gap-6 mt-12">
        {userStories.map((storie) => (
          <div
            key={storie.id}
            className="p-6 bg-customBage rounded-2xl dark:bg-opacity-20"
          >
            <div className="flex flex-col-reverse md:flex-row gap-5 md:items-center md:justify-between">
              <div className="flex gap-5 items-center">
                <div className="text-2xl font-semibold">{storie.title_ja}</div>
                <div className="text-xl font-semibold ">
                  ({storie.title_en})
                </div>
              </div>
              <div className="flex items-center gap-5 ml-auto">
                <div className="text-2xl cursor-pointer p-3 rounded-full hover:bg-slate-300">
                  <Link to={`/update-storie/${storie.id}`}>
                    {" "}
                    <LuPencil />
                  </Link>
                </div>
                <div
                  onClick={() => handleStorieDelete(storie.id)}
                  className="text-2xl cursor-pointer p-3 rounded-full hover:bg-slate-300"
                >
                  <HiOutlineTrash />
                </div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3">{storie.description}</div>
            <div className=" flex justify-end font-semibold text-customRed  text-right mt-6">
              <Link
                className="py-3 px-6 bg-opacity-80 rounded-full dark:bg-opacity-80 dark:bg-white"
                to={`/storiedetail/${storie.id}`}
              >
                წაიკითხე მეტი
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserProfileStories;
