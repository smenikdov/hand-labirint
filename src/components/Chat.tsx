import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as MegabotIcon } from '../assets/img/megabot.svg';
import { ReactComponent as EnterArrowIcon } from '../assets/img/enterArrow.svg';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { removeMessage } from '../store/chat';

export default function Chat() {
    const chat = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();
    const lastMessage = chat.stack[0] || { text: '' };
    const [active, setActive] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const showNextMessage = () => {
        if (lastMessage.showTime) {
            return;
        }
        dispatch(removeMessage());
    };

    const handleKeyPressed = (event: KeyboardEvent | React.MouseEvent<SVGElement>) => {
        if (!(event instanceof KeyboardEvent) || (event.key === 'Enter' && !event.repeat)) {
            event.preventDefault();
            if (active) {
                stopPrinting();
            } else {
                showNextMessage();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPressed);
        return () => {
            document.removeEventListener('keydown', handleKeyPressed)
        };
    }, [active]);

    useEffect(() => {
        if (lastMessage && lastMessage.text) {
            startPrinting();
        }
    }, [lastMessage]);

    const stopPrinting = () => {
        setActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setDisplayText(lastMessage.text);
    };

    const startPrinting = () => {
        setActive(true);
        let i = 0;
        setDisplayText('');

        intervalRef.current = setInterval(() => {
            if (i < lastMessage.text.length) {
                setDisplayText((prevText) => prevText + lastMessage.text[i]);
                i++;
            } else {
                stopPrinting();
                if (lastMessage.showTime) {
                    setTimeout(() => {
                        dispatch(removeMessage());
                    }, lastMessage.showTime);
                }
            }
        }, 40);
    };

    return (
        <div id="chat" style={{ opacity: chat.stack.length ? 1 : 0 }}>
            <div className="header flex column paLg">
                <MegabotIcon className="icon" />
                <h2>
                    Мегабот-97
                </h2>
            </div>

            <div className="delimiter" />

            <div className="body paLg">
                {displayText}
            </div>

            {
                !lastMessage.showTime
                    ?
                    <EnterArrowIcon
                        className="enterArrow paSm"
                        style={{ boxSizing: 'content-box' }}
                        onClick={handleKeyPressed}
                    />
                    :
                    null
            }
        </div>
    )
}
