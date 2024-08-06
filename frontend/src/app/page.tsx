import PostListItem from "@/components/PostListItem";
import { Post } from "@/models/Post";

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto py-10">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

async function getPosts() {
  try {
    const res = await fetch("http://localhost:3333/posts");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
