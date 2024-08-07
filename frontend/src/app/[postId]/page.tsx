import { AppConstants } from "@/helpers/app_constants";
import { formatDate } from "@/helpers/formatter";
import matter from "gray-matter";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";

const PostDetailPage = async ({ params }: { params: { postId: string } }) => {
  const post = await getPost(params.postId);
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="flex items-center space-x-2 mb-5">
        <Image
          src={`https://api.dicebear.com/6.x/adventurer/png?seed=${post.author.name}`}
          alt={post.author.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm font-semibold">
            {post.author.name}
          </span>
          <span className="text-gray-500 text-xs">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
      <hr />
      <div
        className="py-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

async function getPost(postId: string) {
  try {
    const res = await fetch(`${AppConstants.baseUrl}/posts/${postId}`);
    const data = await res.json();

    const matterResult = matter(data.content);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return { ...data, content: contentHtml };
  } catch (error) {
    console.log(error);
  }
}

export default PostDetailPage;
