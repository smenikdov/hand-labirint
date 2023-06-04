import React, { useState, useEffect, useRef } from 'react';

import { ReactComponent as MegabotIcon } from '../assets/img/megabot.svg';
import { ReactComponent as NicePlanet } from '../assets/img/nice-planet.svg';
import { ReactComponent as ScaryPlanet } from '../assets/img/scary-planet.svg';
import { ReactComponent as AngryPlanet } from '../assets/img/angry-planet.svg';
import { ReactComponent as EnterArrowIcon } from '../assets/img/enterArrow.svg';

import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { removeMessage, setVoice } from '../store/chat';

import sadVoice from '../assets/mp3/sad-voice.mp3';
import angryVoice from '../assets/mp3/angry-voice.mp3';
import niceVoice from '../assets/mp3/nice-voice.mp3';
import scaryVoice from '../assets/mp3/scary-voice.mp3';


const sadAudio = new Audio(sadVoice);
sadAudio.loop = true;
const angryAudio = new Audio(angryVoice);
angryAudio.loop = true;
angryAudio.volume = 0.6;
const niceAudio = new Audio(niceVoice);
niceAudio.loop = true;
niceAudio.volume = 0.4;
const scaryAudio = new Audio(scaryVoice);
scaryAudio.loop = true;
scaryAudio.volume = 0.6;

export default function Chat() {
    const chat = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();
    const lastMessage = chat.stack[0] || { text: '' };
    const [active, setActive] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const names = {
        'nice': 'Плаента умиротворения',
        'sad': 'Плаента грусти',
        'scary': 'Плаента страха',
        'angry': 'Плаента гнева',
    }

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
            if (lastMessage.set) {
                dispatch(setVoice(lastMessage.set));
            }

            if (lastMessage.set === 'nice' && niceAudio.paused) {
                niceAudio.play();
            }
            if (lastMessage.set === 'angry' && niceAudio.paused) {
                angryAudio.play();
            }
            if (lastMessage.set === 'scary' && niceAudio.paused) {
                scaryAudio.play();
            }
            if (lastMessage.set === 'sad' && niceAudio.paused) {
                sadAudio.play();
            }
            startPrinting();
        } else {
            niceAudio.pause()
            sadAudio.pause()
            scaryAudio.pause()
            angryAudio.pause()
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
                {
                    chat.voice === 'nice' ?
                    <NicePlanet className="icon" />
                    : chat.voice === 'scary' ?
                    <ScaryPlanet className="icon" />
                    : chat.voice === 'angry' ?
                    <AngryPlanet className="icon" />
                    : null
                }
                <h2>
                    { names[chat.voice] }
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
