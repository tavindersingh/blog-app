import { Repository } from "typeorm";
import { CreatePostDto } from "./dtos/create-post.dto";
import { QueryPostDto } from "./dtos/query-post.dto";
import { Post } from "./entities/post.entity";

export class PostsService {
  private repository: Repository<Post>;

  constructor() {
    this.repository = Post.getRepository();
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.repository.create(createPostDto);

    return this.repository.save(post);
  }

  async findAll(queryPostDto: Partial<QueryPostDto>): Promise<Post[]> {
    return await this.repository.find({
      where: {
        authorId: queryPostDto.author,
      },
      relations: ["author"],
    });
  }

  async findById(id: number): Promise<Post | null> {
    return this.repository.findOne({ where: { id }, relations: ["author"] });
  }
}
