export interface IPostAuthor {
  id: number;
  title: string;
  content: String;
  authorId: number;
  published: Boolean;
  created_date: Date;
  author: { name: string; id: number };
}
export interface IPost {
  title: string;
  content: string;
  authorId: number;
  published: boolean;
}