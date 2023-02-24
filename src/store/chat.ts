import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../levels/levelsSettings';

interface Chat {
    stack: Message[],
}

const initialState: Chat = {
    stack: [],
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
    }
});

export default slice.reducer;
const { addMessage, removeMessage, resetChat, addStack } = slice.actions;
export { addMessage, removeMessage, resetChat, addStack };
