import { getData } from "@/app/_actions/getPost";
import { IPostAuthor } from "@/mudole/post.type";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post: IPostAuthor = await getData(params.id);
  return {
    title: post.title,
  };
}
const PostPage = async ({ params }: { params: { id: string } }) => {
  const post: IPostAuthor = await getData(params.id);

  return (
    <>
      <div className="w-full">
        <ul
          role="list"
          className="divide-y divide-gray-300 w-full max-w-lg mx-auto"
        >
          <li
            key={`${post.id}`}
            className="flex flex-col justify-between  gap-3 py-5"
          >
            {/* head */}
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex-shrink-0">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://avatars.githubusercontent.com/u/46417589?v=4"
                    alt=""
                  />
                </div>
                <div className="ml-3 flex place-items-center">
                  <div className="text-sm font-medium text-gray-800">
                    {post.author.name}
                  </div>
                </div>
              </div>
              <div className="flex gap-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  title="like"
                >
                  <HeartIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  title="share"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* body */}
            <div>
              <h2>{post.title}</h2>
              <p className="text-gray-500 text-sm">{post.content}</p>
            </div>
            {/* footer */}
            <div></div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PostPage;
