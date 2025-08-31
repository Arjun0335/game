import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- SVG Icons ---
const HeartIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const MusicOnIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.532 8.532a4 4 0 10-5.064 5.064M15.532 8.532l-6.5 6.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l8-3v13l-8 3z" />
    </svg>
);

const MusicOffIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15.586a4 4 0 01-5.656-5.656l14.142-14.142a4 4 0 015.656 5.656L5.586 15.586z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l4.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l8-3v13l-8 3z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- Modal Components ---
const Modal = ({ children, onClose, visible }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 relative w-full max-w-md m-4 transform transition-all duration-300 scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <CloseIcon />
                </button>
                {children}
            </div>
        </div>
    );
};

const ApologyLetter = ({ onClose, visible }) => {
    return (
        <Modal onClose={onClose} visible={visible}>
            <div className="text-center p-4" style={{ fontFamily: "'Caveat', cursive" }}>
                <h2 className="text-3xl font-bold text-pink-500 mb-4">Dear Kuchupuchu,</h2>
                <div className="text-gray-700 text-lg space-y-3 leading-relaxed">
                    <p>I want to offer my sincerest apologies for the ways I have let you down...</p>
                    <p>I regret not being there when you needed me most and for the moments lost due to my thoughtlessness.</p>
                    <p>Please forgive me for my mistakes. I promise to learn, to grow, and to always cherish our bond.</p>
                </div>
                <p className="text-right mt-6 text-xl text-gray-600">Yours sincerely,</p>
                <p className="text-right text-xl text-pink-400">Madam Ji</p>
            </div>
        </Modal>
    );
};

const Game = ({ onClose, onGameWin, visible }) => {
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'won'
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [items, setItems] = useState([]);
    const gameAreaRef = useRef(null);
    const timerRef = useRef(null);

    const TARGET_SCORE = 15;

    const createItem = useCallback(() => {
        if (!gameAreaRef.current) return;
        const rect = gameAreaRef.current.getBoundingClientRect();
        const type = Math.random() < 0.1 ? 'kitty' : 'heart'; // 10% chance for Hello Kitty
        const size = type === 'kitty' ? 50 : 30;
        return {
            id: Date.now() + Math.random(),
            type,
            x: Math.random() * (rect.width - size),
            y: Math.random() * (rect.height - size),
        };
    }, []);

    useEffect(() => {
        if (gameState === 'playing') {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        if (score >= TARGET_SCORE) {
                            setGameState('won');
                            onGameWin();
                        } else {
                           // In this version, you can't lose, just win. We'll reset if time runs out.
                           setGameState('start');
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            const itemInterval = setInterval(() => {
                setItems(prevItems => [...prevItems.slice(-5), createItem()].filter(Boolean));
            }, 800);

            return () => {
                clearInterval(timerRef.current);
                clearInterval(itemInterval);
            };
        }
    }, [gameState, score, onGameWin, createItem]);


    const handleItemClick = (id) => {
        setItems(items => items.filter(item => item.id !== id));
        setScore(s => s + 1);
        if (score + 1 >= TARGET_SCORE) {
             clearInterval(timerRef.current);
             setGameState('won');
             onGameWin();
        }
    };
    
    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setItems([]);
        setGameState('playing');
        // Add one initial item
        setTimeout(() => setItems([createItem()]), 200);
    };

    const renderContent = () => {
        switch (gameState) {
            case 'won':
                return (
                    <div className="text-center p-8 flex flex-col items-center">
                        <div className="text-5xl mb-4">🏆</div>
                        <h3 className="text-2xl font-bold text-pink-500 mb-2">You did it!</h3>
                        <p className="text-gray-600 mb-4">You caught {score} hearts!</p>
                        <p className="text-sm text-gray-500">Thank you for playing! I hope this little game shows how much I care. My heart is yours to catch, always.</p>
                         <button onClick={onClose} className="mt-6 bg-pink-500 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105">
                            Close
                        </button>
                    </div>
                );
            case 'playing':
                return (
                    <div>
                        <div className="flex justify-between items-center p-4 bg-pink-100 rounded-t-xl">
                            <div className="font-bold text-pink-600">Score: {score}/{TARGET_SCORE}</div>
                            <div className="font-bold text-pink-600">Time: {timeLeft}s</div>
                        </div>
                        <div ref={gameAreaRef} className="relative w-full h-80 bg-pink-50 overflow-hidden rounded-b-xl">
                            {items.map(item => (
                                item && (
                                     <div key={item.id} style={{ top: item.y, left: item.x, position: 'absolute' }} onClick={() => handleItemClick(item.id)}>
                                        {item.type === 'kitty' ? (
                                            <img src="https://placehold.co/50x50/f8c3d1/7a2c49?text=Kitty" alt="Hello Kitty" className="w-12 h-12 cursor-pointer animate-pulse"/>
                                        ) : (
                                            <HeartIcon className="w-8 h-8 text-red-500 cursor-pointer animate-bounce" />
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                );
            case 'start':
            default:
                return (
                    <div className="text-center p-8">
                        <h3 className="text-2xl font-bold text-pink-500 mb-2">Catch Hearts & Hello Kitty!</h3>
                        <p className="text-gray-600 mb-6">Catch {TARGET_SCORE} hearts before time runs out!</p>
                        <button onClick={startGame} className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105">
                            Start Game
                        </button>
                    </div>
                );
        }
    };
    
    return <Modal onClose={onClose} visible={visible}>{renderContent()}</Modal>;
};

const SpecialMessage = ({ onClose, visible }) => {
    return (
        <Modal onClose={onClose} visible={visible}>
            <div className="p-4 text-center">
                 <div className="border border-gray-300 rounded-lg p-4 mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
                    <p className="text-xl">This is us btw~~</p>
                </div>
                <img src="https://i.pinimg.com/564x/b7/78/3a/b7783a5f021a8d8c36a4452093557879.jpg" alt="Batman and Hello Kitty" className="rounded-lg mx-auto w-full max-w-xs shadow-lg"/>
                 <div className="border border-gray-300 rounded-lg p-4 mt-4" style={{ fontFamily: "'Caveat', cursive" }}>
                    <p className="text-xl">Don't be angyyyyyy</p>
                </div>
            </div>
        </Modal>
    );
};


// --- Main App Component ---
export default function App() {
    const [showApology, setShowApology] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [showSpecialMessage, setShowSpecialMessage] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef(null);
    
    const onGameWin = () => {
        setTimeout(() => {
            setShowGame(false);
            setShowSpecialMessage(true);
        }, 1500);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(audioRef.current.muted);
            if(audioRef.current.paused) audioRef.current.play();
        }
    };
    
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    }

    return (
        <>
            {/* Styles and Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Poppins:wght@400;600;700&display=swap');
                body {
                    font-family: 'Poppins', sans-serif;
                    background: #fde4f2; /* A light, warm pink */
                    color: #4B5563; /* Tailwind gray-600 */
                }
            `}</style>
            
            <audio ref={audioRef} src="https://vgmsite.com/soundtracks/animal-crossing-new-horizons-k.k.-cruisin/bhnmnprvua/K.K.%20Cruisin%27.mp3" loop muted />

            <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 relative" onClick={playAudio}>
                
                <header className="absolute top-0 right-0 p-4 w-full flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-pink-500" style={{ fontFamily: "'Caveat', cursive" }}>Hieieieieieie,</h1>
                    <button onClick={toggleMute} className="p-2 rounded-full bg-white shadow-md text-pink-500">
                        {isMuted ? <MusicOffIcon className="w-6 h-6" /> : <MusicOnIcon className="w-6 h-6" />}
                    </button>
                </header>

                <main className="w-full max-w-sm space-y-6">
                    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">💌</div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Read My Apology Letter</h2>
                                <p className="text-gray-500">Click to hear my sincere apology.</p>
                            </div>
                        </div>
                         <button onClick={() => setShowApology(true)} className="w-full mt-4 bg-pink-200 text-pink-700 font-semibold py-2 px-4 rounded-lg hover:bg-pink-300 transition">
                           Open Letter
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">💖</div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Play a Game!</h2>
                                <p className="text-gray-500">Catch some hearts to unlock a special message.</p>
                            </div>
                        </div>
                        <button onClick={() => setShowGame(true)} className="w-full mt-4 bg-pink-200 text-pink-700 font-semibold py-2 px-4 rounded-lg hover:bg-pink-300 transition">
                           Play Game
                        </button>
                    </div>
                </main>

                <ApologyLetter visible={showApology} onClose={() => setShowApology(false)} />
                <Game visible={showGame} onClose={() => setShowGame(false)} onGameWin={onGameWin} />
                <SpecialMessage visible={showSpecialMessage} onClose={() => setShowSpecialMessage(false)} />

            </div>
        </>
    );
}
