export type Article = {
  author: Author;
  content: string;
  createdAt: string
}

type Author = {
  name: string;
  account: string;
  image: string
}
