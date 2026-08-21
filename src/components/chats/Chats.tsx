import { useState } from 'react';
import Header from '../general/header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Input } from '@/components/ui/input';
import InitialsAvatar from '@/components/general/InitialsAvatar';
import EmptyContent from '@/components/general/EmptyContent';
import clsx from 'clsx';
import { Send } from 'lucide-react';
import { MOCK_CHATS } from './constants';

const Chats = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(MOCK_CHATS[0]?.id ?? null);
  const [draft, setDraft] = useState('');
  const activeChat = MOCK_CHATS.find((chat) => chat.id === activeChatId) ?? null;

  return (
    <div className="chats-container flex flex-col h-full">
      <Breadcrumbs items={[{ label: 'Chats' }]} />
      <Header title="Chats" description="Message your teammates in real time." />
      {MOCK_CHATS.length === 0 ? (
        <EmptyContent title="No chats yet" description="Start a conversation with a teammate." />
      ) : (
        <div className="flex flex-1 min-h-0 gap-4 px-3 pb-4">
          <aside className="w-72 shrink-0 flex flex-col gap-1 overflow-y-auto">
            {MOCK_CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={clsx(
                  'flex items-center gap-3 rounded-lg p-3 text-left transition-colors',
                  chat.id === activeChatId ? 'bg-brand-tint' : 'hover:bg-surface-hover'
                )}
              >
                <InitialsAvatar
                  name={chat.name}
                  index={chat.id}
                  className="size-10 shrink-0"
                  textSize="text-sm"
                  hideTooltip
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium truncate">{chat.name}</span>
                  <span className="block text-xs text-muted truncate">{chat.lastMessage}</span>
                </span>
                <span className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] text-muted">{chat.lastMessageTime}</span>
                  {chat.unread > 0 && (
                    <span className="bg-brand text-on-brand text-[10px] font-semibold rounded-full size-4.5 px-1.5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </aside>
          {activeChat ? (
            <section className="flex-1 flex flex-col min-w-0 bg-surface border border-subtle rounded-xl">
              <header className="flex items-center gap-3 px-4 py-3 border-b border-subtle">
                <InitialsAvatar
                  name={activeChat.name}
                  index={activeChat.id}
                  className="size-8"
                  textSize="text-xs"
                  hideTooltip
                />
                <span>
                  <span className="block text-sm font-semibold">{activeChat.name}</span>
                  <span className="block text-xs text-muted">
                    {activeChat.online ? 'Online' : 'Offline'}
                  </span>
                </span>
              </header>
              <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={clsx(
                      'max-w-[70%] rounded-xl px-3 py-2 text-sm',
                      message.sender === 'me'
                        ? 'self-end bg-brand text-on-brand'
                        : 'self-start bg-sunken text-primary'
                    )}
                  >
                    <p>{message.text}</p>
                    <p
                      className={clsx(
                        'mt-1 text-[10px]',
                        message.sender === 'me' ? 'text-on-brand/70' : 'text-muted'
                      )}
                    >
                      {message.time}
                    </p>
                  </div>
                ))}
              </div>
              <footer className="flex items-center gap-2 border-t border-subtle p-3">
                <Input
                  placeholder="Type a message..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && draft.trim()) setDraft('');
                  }}
                />
                <button
                  type="button"
                  aria-label="Send message"
                  className="shrink-0 size-9 rounded-md bg-brand text-on-brand flex items-center justify-center hover:bg-brand-hover transition-colors disabled:opacity-50"
                  disabled={!draft.trim()}
                  onClick={() => setDraft('')}
                >
                  <Send className="size-4" />
                </button>
              </footer>
            </section>
          ) : (
            <section className="flex-1 flex items-center justify-center bg-surface border border-subtle rounded-xl">
              <EmptyContent
                title="Select a chat"
                description="Pick a conversation to start messaging."
              />
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Chats;
