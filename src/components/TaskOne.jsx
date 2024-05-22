
import { useState } from 'react';
import Partition from './Partition';


const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

import React from 'react'

export default function TaskOne() {
    const [partitions, setPartitions] = useState([
        { id: 1, color: getRandomColor(), children: [] },
    ]);

    const handleSplit = (id, direction) => {
        setPartitions((prevPartitions) => {
            const newPartitions = JSON.parse(JSON.stringify(prevPartitions));
            const splitPartition = (partition) => {
                if (partition.id === id) {
                    const newPartition1 = {
                        id: new Date().getTime(),
                        color: partition.color,
                        children: [],
                    };
                    const newPartition2 = {
                        id: new Date().getTime() + 1,
                        color: getRandomColor(),
                        children: [],
                    };
                    partition.children = [newPartition1, newPartition2];
                    partition.direction = direction;
                } else {
                    partition.children.forEach(splitPartition);
                }
            };
            newPartitions.forEach(splitPartition);
            return newPartitions;
        });
    };

    const handleRemove = (id) => {
        setPartitions((prevPartitions) => {
            const newPartitions = JSON.parse(JSON.stringify(prevPartitions));
            const removePartition = (partition, parent) => {
                if (partition.id === id) {
                    if (parent) {
                        parent.children = parent.children.filter((child) => child.id !== id);
                    } else {
                        return false;
                    }
                } else {
                    partition.children = partition.children.filter((child) =>
                        removePartition(child, partition)
                    );
                }
                return true;
            };
            return newPartitions.filter((partition) =>
                removePartition(partition, null)
            );
        });
    };

    const renderPartitions = (partitions) =>
        partitions.map((partition) => (
            <div
                key={partition.id}
                className={`flex ${partition.direction === 'V' ? 'flex-row' : 'flex-col'}`}
                style={{ flex: 1 }}
            >
                <Partition
                    id={partition.id}
                    color={partition.color}
                    onSplit={handleSplit}
                    onRemove={handleRemove}
                />
                {partition.children.length > 0 && renderPartitions(partition.children)}
            </div>
        ));

    return (
        <div className="bg-gray-400">
            <div className="text-center"> <h1 className="text-3xl font-bold ">Task One</h1>
                <p className="text-xl font-medium mt-3">Recursive-Partitioning</p></div>
            <div className="flex items-center justify-center py-28">
                <div className="w-full h-full flex">
                    {renderPartitions(partitions)}
                </div>
            </div>
        </div>
    );
}
