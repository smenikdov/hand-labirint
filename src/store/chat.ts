import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Message, Voices } from '../scripts/types';

interface Chat {
    stack: Message[],
    voice: Voices,
};

const initialState: Chat = {
    stack: [],
    voice: 'nice',
};

const slice = createSlice({
    name: 'chat',
    initialState,

    reducers: {
        addStack(chat, action: PayloadAction<Message[]>) {
            chat.stack.push(...action.payload);
        },

        addMessage(chat, action: PayloadAction<Message>) {
            chat.stack.push(action.payload);
        },

        removeMessage(chat) {
            if (chat.stack.length) {
                chat.stack.shift();
            }
        },

        resetChat(chat) {
            chat.stack = [];
        },

        setVoice(chat, action: PayloadAction<Voices>) {
            chat.voice = action.payload;
        }
    }
});

export default slice.reducer;
const { addMessage, removeMessage, resetChat, addStack, setVoice } = slice.actions;
export { addMessage, removeMessage, resetChat, addStack, setVoice };
