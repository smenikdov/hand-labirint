import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';

export default function MyParticles() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);
    const particlesLoaded = useCallback(async (container: Container | undefined) => { }, []);

    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: '#0B0B17',
                        },
                    },
                    fpsLimit: 30,
                    particles: {
                        color: {
                            value: '#ffffff'
                        },
                        links: {
                            enable: false
                        },
                        move: {
                            enable: true,
                            speed: 0.2,
                            random: true,
                            straight: false,
                            attract: {
                                enable: false
                            },
                        },
                        number: {
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                            random: false,
                            animation: {
                                enable: true,
                                speed: 0.5,
                                minimumValue: 0,
                                sync: false
                            }
                        },
                        shadow: {
                            enable: true,
                            blur: 5,
                            color: '#bdbdbd',

                        },
                        size: {
                            value: 2,
                            random: true,
                            animation: {
                                enable: true,
                                speed: 2,
                                sync: false
                            }
                        },
                        shape: {
                            type: 'circle'
                        },
                        reduceDuplicates: true,
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: false,
                            },
                        },
                        detectsOn: 'canvas',
                    },
                    fullScreen: false
                }}
            />
            <div id="eclipseBlock" />
        </>
    )
}
