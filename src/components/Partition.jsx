

export default function Partition({ id, color, onSplit, onRemove }) {
    return (
        <div className="relative p-6" style={{ backgroundColor: color, flex: 1 }}>
            <div className="absolute inset-0 flex justify-center items-center">
                <button
                    className="bg-white text-black m-1 p-3 rounded"
                    onClick={() => onSplit(id, 'V')}
                >
                    V
                </button>
                <button
                    className="bg-white text-black m-1 p-3 rounded"
                    onClick={() => onSplit(id, 'H')}
                >
                    H
                </button>
                <button
                    className="bg-red-500 text-white ml-1  p-3 rounded"
                    onClick={() => onRemove(id)}
                >
                    -
                </button>
            </div>
        </div>
    )
}

