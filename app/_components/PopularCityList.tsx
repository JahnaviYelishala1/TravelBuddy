"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

export function PopularCityList() {
    const cards = data.map((card, index) => (
        <Card
            key={card.src}
            card={{ ...card, content: <CardContent card={card} /> }}
            index={index}
        />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Popular Destinations to Visit
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const CardContent = ({ card }: { card: { title: string; src: string } }) => {
    return (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-6">
                <span className="font-bold text-neutral-700 dark:text-neutral-200 block mb-2">
                    {card.title}
                </span>
                Explore this beautiful city and immerse yourself in the culture, food, and landmarks.
            </p>
            <Image
                src={card.src}
                alt={card.title}
                height={500}
                width={500}
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-xl"
                unoptimized
            />
        </div>
    );
};

// City destination data
const data = [
    {
        category: "Paris, France",
        title: "Explore the City of Lights - Eiffel Tower, Louvre & more",
        src: "https://exploringrworld.com/wp-content/uploads/2020/02/IMG_5240-2.jpg"
    },
    {
        category: "New York, USA",
        title: "Experience NYC - Times Square, Central Park, Broadway",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMobIoayWpuXIJbYEdGAx9H9c5Ck3Q85kSuw&s"
    },
    {
        category: "Tokyo, Japan",
        title: "Discover Tokyo - Shibuya Crossing, Temples, and Sushi",
        src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
    },
    {
        category: "Rome, Italy",
        title: "Walk through History - Colosseum, Vatican & Pasta Delights",
        src: "https://images.unsplash.com/photo-1582881988321-ecb79a6b9f48?auto=format&fit=crop&w=800&q=80"
    },
    {
        category: "Bali, Indonesia",
        title: "Tropical Paradise - Beaches, Temples, and Rice Terraces",
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    }
];
