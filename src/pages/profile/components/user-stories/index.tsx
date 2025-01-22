import { useQuery } from "@tanstack/react-query";
import { getUserStories } from "@/supabase/stories";
import Container from "@/components/ui/container";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { LuPencil } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";

const UserProfileStories = () => {
  const [user] = useAtom(userAtom);

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

  if (isLoading) {
    return <p>Loading your stories...</p>;
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
                <div className="text-2xl cursor-pointer p-3 rounded-full hover:bg-slate-300">
                  <HiOutlineTrash />
                </div>
              </div>
            </div>
            <div className="mt-4 line-clamp-3">{storie.description}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserProfileStories;
