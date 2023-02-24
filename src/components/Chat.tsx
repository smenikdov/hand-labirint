import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as MegabotIcon } from '../assets/img/megabot.svg';
import { ReactComponent as EnterArrowIcon } from '../assets/img/enterArrow.svg';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import Typed from 'react-typed';
import { removeMessage } from '../store/chat';

export default function Chat() {
    const typedRef = useRef<Typed | null>(null);
    const chat = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();

    const showNextMessage = () => {
        dispatch(removeMessage());
        if (typedRef.current) {
            // @ts-ignore
            typedRef.current.reset();
        }
    };

    const handleKeyPressed = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.repeat) {
            event.preventDefault();
            showNextMessage();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPressed);
        return () => {
            document.removeEventListener('keydown', handleKeyPressed)
        };
    });


    return (
        chat.stack.length ?
            <div id="chat">
                <div className="header flex paLg">
                    <h2>
                        Мегабот-97
                    </h2>
                    <MegabotIcon className="icon" />
                </div>

                <div className="delimiter" />

                <div className="body paLg">
                    <Typed
                        typedRef={(typed: Typed) => { typedRef.current = typed; }}
                        strings={[chat.stack[0].text]}
                        typeSpeed={40}
                        backSpeed={100}
                        showCursor={false}
                    />
                </div>

                <EnterArrowIcon
                    className="enterArrow paSm"
                    style={{ boxSizing: 'content-box' }}
                    onClick={showNextMessage}
                />
            </div>
            :
            null
    )
}
