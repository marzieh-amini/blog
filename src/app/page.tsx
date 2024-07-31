import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
interface IUser {
  name: string;
  id: number;
}
interface IPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  published: boolean;
  created_date: Date;
  author: IUser;
}
async function Home() {
  const response: IPost[] = await fetch("http://localhost:3000/api/posts", {
    next: { revalidate: 5, tags: ["POSTS"] },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.error("can not get posts : ", e);
    });

  return (
    <div className="w-full ">
      <ul
        role="list"
        className="divide-y divide-gray-300 w-full max-w-xl mx-auto mt-9"
      >
        {response.length > 0 ? (
          response.map((post: IPost) => {
            return (
              <li
                key={`${post.id}`}
                className="flex flex-col justify-between  gap-3 py-5"
              >
                {/* head */}
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
                {/* body */}
                <div>
                  <Link href={`/posts/${post.id}`}>
                    <p className="text-gray-500 text-sm">{post.title}</p>
                  </Link>
                </div>
                {/* footer */}
                <div>
                  <div className="flex justify-between">
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
                </div>
              </li>
            );
          })
        ) : (
          <li className=" text-center">We did not find any posts</li>
        )}
      </ul>
    </div>
  );
}

export default Home;
