export interface Comment {
  id: number;
  body: string;
  authorUsername: string;
  authorImage: string;
  date: string;
  canModify: boolean;
}

export const COMMENTS: Comment[] = [
  {
    id: 1,
    body: "With supporting text below as a natural lead-in to additional content.",
    authorUsername: "jacobschmidt",
    authorImage: "http://i.imgur.com/Qr71crq.jpg",
    date: "Dec 29th",
    canModify: false,
  },
  {
    id: 2,
    body: "With supporting text below as a natural lead-in to additional content.",
    authorUsername: "jacobschmidt",
    authorImage: "http://i.imgur.com/Qr71crq.jpg",
    date: "Dec 29th",
    canModify: true,
  },
];
