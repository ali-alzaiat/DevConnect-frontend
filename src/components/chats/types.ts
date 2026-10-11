export interface ChatMessage {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface ChatSummary {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
}
