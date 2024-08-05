import { Post } from "@/models/Post";

const PostDetailPage = async ({ params }: { params: { postId: string } }) => {
  const post: Post = await getPost(params.postId);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <div className="flex items-center space-x-2">
        <img
          src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${post.author.name}`}
          alt={post.author.name}
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-500">{post.author.name}</span>
      </div>
    </div>
  );
};

export default PostDetailPage;

async function getPost(postId: string) {
  try {
    const res = await fetch(`http://localhost:3333/posts/${postId}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
