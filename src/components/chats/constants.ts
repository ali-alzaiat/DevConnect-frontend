import { ChatSummary } from './types';

export const MOCK_CHATS: ChatSummary[] = [
  {
    id: 1,
    name: 'Sara Khaled',
    lastMessage: 'Sounds good, I will review the PR today.',
    lastMessageTime: '09:42',
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hey! Did you push the auth changes?', time: '09:30' },
      { id: 2, sender: 'me', text: 'Yes, PR is open. CI should be green soon.', time: '09:35' },
      {
        id: 3,
        sender: 'them',
        text: 'Sounds good, I will review the PR today.',
        time: '09:42'
      }
    ]
  },
  {
    id: 2,
    name: 'Omar Fathy',
    lastMessage: 'Can you check the kanban board?',
    lastMessageTime: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Can you check the kanban board?', time: '17:10' },
      { id: 2, sender: 'me', text: 'Sure, taking a look now.', time: '17:15' }
    ]
  },
  {
    id: 3,
    name: 'Dev Team',
    lastMessage: 'Standup moved to 10:30 tomorrow.',
    lastMessageTime: 'Mon',
    unread: 5,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Standup moved to 10:30 tomorrow.', time: '16:00' },
      { id: 2, sender: 'me', text: 'Noted, thanks!', time: '16:02' }
    ]
  }
];
