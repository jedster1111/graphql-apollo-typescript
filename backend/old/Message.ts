export interface MessageInput {
  content: string;
  author: string;
}

export class Message {
  id: string;
  content: string;
  author: string;
  constructor(id: string, { content, author }: MessageInput) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
