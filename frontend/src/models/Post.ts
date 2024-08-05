import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: User;
  createdAt: string;
}
