import React, { useEffect, useState } from 'react'
import levels from '../levels/planets'
import LevelNumber from './Level/LevelNumber'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTime } from '../store/timer';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalDialog from './ModalDialog';
import Button from './Button';
import { ReactComponent as CameraArrow } from '../assets/img/cameraArrow.svg';
import { v4 as uuidv4 } from 'uuid';
import { BiCheck, BiLinkAlt } from 'react-icons/bi';

export default function LevelMenu() {
    const [uuid, setUuid] = useState('');
    const [isVisibleMenu, setVisibilityMenu] = useState(false);
    const [isLinkCopied, setLinkCopied] = useState(false);
    const [isVisibleCamera, setVisibilityCamera] = useState(true);
    const [isVisibleAddFriendModal, setVisibilityAddFriendModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const coinsCount = useSelector((state: RootState) => state.player.coins);
    const starsCount = useSelector((state: RootState) => state.player.stars);

    const handleMenuGoOut = () => {
        setVisibilityMenu(false);
        navigate('/');
    };

    const handleKeyPressed = (event: KeyboardEvent): void => {
        if (event.key === 'Escape' && !event.repeat && location.pathname === '/game') {
            setVisibilityMenu(!isVisibleMenu);
        }
    };

    const handleAddFriend = (): void => {
        setUuid(uuidv4());
        setVisibilityMenu(false);
        setVisibilityAddFriendModal(true);
    };

    const copyLink = (): void => {
        try {
            const el = document.createElement('textarea');
            el.value = `https://hand-labirint.ru/game?uuid=${uuid}`;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setLinkCopied(true);
        } catch (error) {
            console.error('ERROR COPY LINK');
            console.error(error);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPressed);
        return () => {
            document.removeEventListener('keydown', handleKeyPressed)
        };
    }, [location, isVisibleMenu]);


    // const dispatch = useDispatch();
    // const levelId = useSelector((state: RootState) => state.level.id);
    // const isStartPlay = useSelector((state: RootState) => state.level.isStartPlay);
    // const time = useSelector((state: RootState) => state.timer.time);
    // let level = levels[levelId];

    // let startTime: number = 0;
    // let flag: NodeJS.Timer | null = null;

    // const startTimer = (): void => {
    //     function timeIncrement() {
    //         let interval = new Date().getTime() - startTime;
    //         let s = Math.floor(interval % 60000 / 1000);
    //         let m = Math.floor(interval % 3600000 / 60000);
    //         const newTime = `${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s}`;
    //         dispatch(setTime(newTime));
    //     }

    //     startTime = new Date().getTime();
    //     flag = setInterval(timeIncrement, 1000);
    // };

    // const stopTimer = (): void => {
    //     if (flag !== null) {
    //         clearInterval(flag);
    //     }
    // };

    // useEffect(() => {
    //     if (isStartPlay) {
    //         if (flag) {
    //             startTimer();
    //         }
    //     } else {
    //         stopTimer();
    //     }
    // }, [isStartPlay]);

    return (
        <>
            {
                location.pathname === '/game'
                    ?
                    <div
                        id="menuButton"
                        onClick={() => setVisibilityMenu(true)}
                        className="flex paSm"
                    >
                        <div />
                        <div />
                    </div>
                    :
                    null
            }
            <div id="cameraInterface">
                <canvas
                    id="outputCanvas"
                    style={{ translate: isVisibleCamera ? '0 0 ' : '-100% 0' }}
                />
                <video
                    id="inputVideo"
                    className="displayNone"
                />
                <div
                    className="hideCameraButton"
                    style={{
                        rotate: isVisibleCamera ? '180deg' : '0deg',
                        right: isVisibleCamera ? '-43px' : 'calc(100% - 43px)',
                    }}
                    onClick={() => setVisibilityCamera(!isVisibleCamera)}
                >
                    <CameraArrow />
                </div>
                <div className="hideCameraText">
                    Камера все еще работает
                </div>
                <div className="flex own mtSm mlLg">
                    <div className="flex coinsCount">
                        <div className="count">
                            {coinsCount}
                        </div>
                        <div className="icon mlSm" />
                    </div>
                    <div className="flex starsCount">
                        <div className="count">
                            {starsCount}
                        </div>
                        <div className="icon mlSm" />
                    </div>
                </div>
            </div>

            <ModalDialog
                isVisible={isVisibleMenu}
                title="Меню"
                onClose={() => setVisibilityMenu(false)}
                width={400}
            >
                <div className="flex column">
                    <Button
                        text="Продолжить игру"
                        dense
                        color="gray"
                        onClick={() => setVisibilityMenu(false)}
                    />
                    <Button
                        text="Пригласить друга"
                        dense
                        color="gray"
                        className="mtMd"
                        onClick={handleAddFriend}
                    />
                    <Button
                        text="Настройки"
                        dense
                        color="gray"
                        className="mtMd"
                        onClick={() => { }}
                    />
                    <Button
                        text="Выйти в меню"
                        dense
                        color="negative"
                        className="mtMd"
                        onClick={handleMenuGoOut}
                    />
                </div>
            </ModalDialog>

            <ModalDialog
                isVisible={isVisibleAddFriendModal}
                title="Пригласить в игру"
                onClose={() => setVisibilityAddFriendModal(false)}
                width={600}
            >
                <div className="flex column">
                    <div>
                        Для того чтобы пригласить друга, отправьте ему эту ссылку:
                    </div>

                    <div className="mtMd flex nowrap fullWidth copyInputContainer">
                        <input
                            value={`https://hand-labirint.ru/game?uuid=${uuid}`}
                            type="text"
                            readOnly
                            className="copyInput"
                        />
                        <Button
                            Icon={isLinkCopied ? BiCheck : BiLinkAlt}
                            onClick={copyLink}
                            style={{ height: '40px' }}
                            squre
                        />
                    </div>

                    <Button
                        text="Отменить"
                        dense
                        color="negative"
                        className="mtMd"
                        onClick={() => setVisibilityAddFriendModal(false)}
                    />
                </div>

            </ModalDialog>
        </>
    )
}

