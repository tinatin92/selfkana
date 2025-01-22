import Container from "@/components/ui/container";
import { getStories } from "@/supabase/stories";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import qs from "qs";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";


type StoriesFilterFormData = {
  title: string;
};
const FormDataDefaultValues = {
  title: "",
};

const StoriesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const parsedQueryParams = {
    ...FormDataDefaultValues,
    ...qs.parse(searchParams.toString()),
  };

  const { control, watch } = useForm<StoriesFilterFormData>({
    defaultValues: parsedQueryParams,
  });

  const watchedSearchText = watch("title");

  const debouncedSearchText = useDebounce(watchedSearchText, 500);

  useEffect(() => {
    const currentParams = qs.parse(searchParams.toString());
    const updatedParams = { ...currentParams, title: debouncedSearchText };

    setSearchParams(qs.stringify(updatedParams));
  }, [debouncedSearchText, setSearchParams, searchParams]);

  const title = searchParams.get("title") || "";

  const {
    data: StoriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stories", title],
    queryFn: () => getStories(title),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Sorry, Data can't be fetched!</div>;
  }

  return (
    <Container>
      
      <div className="flex justify-center items-center mb-10 ">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="w-full xl:w-1/2 "
                onChange={onChange}
                value={value}
                placeholder="Search by Title"
              />
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center ">
        {StoriesData?.map((storie, id) => {
          return (
            <div
              key={id}
              className="p-6 bg-customBage dark:bg-opacity-20 rounded-2xl w-full xl:w-1/2"
            >
              <div className="flex gap-5 items-center">
                <div className="text-2xl font-semibold">{storie.title_ja}</div>
                <div className="text-xl font-semibold ">
                  ({storie.title_en})
                </div>
              </div>
              <div className="mt-4 line-clamp-3">{storie.description}</div>
              <div className="font-semibold text-customRed underline text-right mt-6">
                <Link to={`/storiedetail/${storie.id}`}>წაიკითხე მეტი</Link>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default StoriesList;
