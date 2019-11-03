export type Article = {
  author: Author;
  content: string;
  createdAt: string
}

export type Author = {
  id: string;
  name: string;
  account: string;
  image: string
}
