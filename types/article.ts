export type Article = {
  author: Author;
  content: string;
  createdAt: string
}

export type Author = {
  name: string;
  account: string;
  image: string
}
