
import { useState } from 'react';

export default function TaskTwo() {
    const [outputString, setOutputString] = useState('');

    const handleTileClick = (letter) => {
        setOutputString((prevOutputString) => {
            const newOutputString = prevOutputString + letter;
            return processOutputString(newOutputString);
        });
    };

    const processOutputString = (str) => {
        return str.replace(/(.)\1{2,}/g, (match) => {
            return '_'.repeat(Math.ceil(match.length / 3));
        });
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="flex flex-col items-center justify-center py-28 bg-gray-400">
            <h1 className="text-3xl font-bold ">Task Two</h1>
            <p className="text-xl font-medium mt-3">Alphabet Tile Interaction</p>
            <div className="grid grid-cols-6 gap-4 my-8">
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleTileClick(letter)}
                        className="w-12 h-12 bg-blue-500 text-white font-bold rounded shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <div
                id="outputString"
                className="text-xl font-mono bg-white p-4 rounded shadow-md"
            >
                {outputString}
            </div>
        </div>
    );
}
