import { useQuery } from "@tanstack/react-query";
import { getUserStories } from "@/supabase/stories";
import Container from "@/components/ui/container";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";

const UserProfileStories = () => {
  const [user] = useAtom(userAtom);

  const userId = user?.user?.id
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
      <div className="flex flex-col gap-6">
        {userStories.map((story) => (
          <div key={story.id} className="p-6 bg-customBage rounded-2xl">
            <div className="text-2xl font-semibold">{story.title}</div>
            <div className="mt-4">{story.description}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserProfileStories;
