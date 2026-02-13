"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const leaders = {
    commander: {
        name: "Col Satyabrata Swain",
        rank: "Group Commander",
        img: "/media/Officers/GC_Satyabrata_Swain.png",
        quote: "Leadership is earned through courage and responsibility."
    },
    sd: [
        {
            name: "Lt Col Shantanu Dey",
            role: "Officer Commanding (OC)",
            img: "/media/Officers/OC_Shantunu_Dey.jpg",
            quote: "Discipline is the foundation of true strength."
        },
        {
            name: "Sreyansu Satya Prakash",
            role: "Care Taker Officer (CTO)",
            img: "/media/Officers/CTO_Rima_Sahani.png",
            quote: "Duty performed with honor builds lasting respect."
        }
    ],
    sw: [
        {
            name: "Col Sanjeev Dewan",
            role: "Commanding Officer (CO)",
            img: "/media/Officers/CO_Sanjeev_Dewan.jpg",
            quote: "Discipline and determination create unstoppable leaders."
        },
        {
            name: "Dr. Rima Sahani",
            role: "Care Taker Officer (CTO)",
            img: "/media/Officers/CTO_Rima_Sahani.png",
            quote: "Resilience and willpower shape the strongest warriors."
        }
    ]
};

// Flatten all officers for horizontal scroll
const allOfficers = [
    leaders.commander,
    ...leaders.sd,
    ...leaders.sw
];

interface OfficerCardProps {
    officer: typeof allOfficers[0];
    index: number;
    isActive: boolean;
}

const OfficerCard = ({ officer, index, isActive }: OfficerCardProps) => (
    <motion.div
        className="leadership-card flex-shrink-0 w-[320px] md:w-[380px]"
        initial={{ opacity: 0, x: -100 }}
        animate={{
            opacity: isActive ? 1 : 0.6,
            scale: isActive ? 1.05 : 0.95,
            x: 0,
        }}
        transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        }}
    >
        <div className={`bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border-2 transition-all duration-500 ${isActive ? 'border-green-400 shadow-green-500/30' : 'border-white/30'
            }`}>
            <div className="relative h-96 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f4b] via-transparent to-transparent opacity-60 z-10"></div>
                <Image
                    src={officer.img}
                    alt={officer.name}
                    fill
                    className="object-cover object-top transition-transform duration-700"
                />
                <div className={`absolute inset-3 border-2 z-20 pointer-events-none transition-colors duration-500 ${isActive ? 'border-green-400/50' : 'border-white/30'
                    }`}></div>
            </div>
            <div className="p-6 text-center relative z-20 -mt-12 bg-white mx-4 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-[#0b1f4b] mb-1">{officer.name}</h3>
                <p className="text-sm font-semibold text-blue-600 mb-4">
                    {'rank' in officer ? officer.rank : officer.role}
                </p>
                <div className="relative pt-4 border-t border-gray-100">
                    <Quote className="w-4 h-4 text-gray-300 absolute top-0 left-0" />
                    <p className="text-gray-600 text-sm italic px-4">
                        {officer.quote}
                    </p>
                    <Quote className="w-4 h-4 text-gray-300 absolute top-0 right-0 rotate-180" />
                </div>
            </div>
        </div>
    </motion.div>
);

export default function LeadershipSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const [activeCardIndex, setActiveCardIndex] = React.useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const subtext = subtextRef.current;
        const cardsContainer = cardsContainerRef.current;

        if (!section || !heading || !subtext || !cardsContainer) return;

        // Create master timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=200%',
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Update active card based on scroll progress
                    const progress = self.progress;
                    const cardIndex = Math.min(
                        Math.floor(progress * allOfficers.length * 1.5),
                        allOfficers.length - 1
                    );
                    setActiveCardIndex(cardIndex);
                },
            },
        });

        // Background color animation (3 stages)
        tl.to(section, {
            backgroundColor: '#22c55e',
            duration: 0.3,
            ease: 'power2.inOut',
        })
            .to(section, {
                backgroundColor: '#0b1f4b',
                duration: 0.3,
                ease: 'power2.inOut',
            }, '+=0.4');

        // Heading animation: scale down + letter spacing
        tl.fromTo(
            heading,
            {
                fontSize: '12rem',
                letterSpacing: '0.2em',
                opacity: 0.3,
            },
            {
                fontSize: '3rem',
                letterSpacing: '0.02em',
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out',
            },
            0
        );

        // Subtext fade in (after heading settles)
        tl.fromTo(
            subtext,
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            },
            0.3
        );

        // Cards horizontal scroll effect
        tl.fromTo(
            cardsContainer,
            {
                x: '-100%',
            },
            {
                x: '0%',
                duration: 0.6,
                ease: 'power2.inOut',
            },
            0.2
        );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === section) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="leadership"
            className="relative min-h-screen overflow-hidden bg-[#0b1f4b] text-white flex items-center justify-center"
        >
            {/* Background Patterns */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f4b]/50 via-transparent to-[#0b1f4b]/50"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center gap-2 w-fit mx-auto mb-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>Our Leaders</span>
                    </div>

                    <h2
                        ref={headingRef}
                        className="leadership-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
                        style={{
                            fontSize: '12rem',
                            letterSpacing: '0.2em',
                            opacity: 0.3,
                            lineHeight: 1.2,
                        }}
                    >
                        LEADERS
                    </h2>

                    <p
                        ref={subtextRef}
                        className="text-white/70 max-w-2xl mx-auto text-lg"
                        style={{ opacity: 0 }}
                    >
                        Meet the distinguished leaders who guide our NCC unit with dedication and vision
                    </p>
                </div>

                {/* Cards Container - Horizontal Scroll */}
                <div className="overflow-hidden">
                    <div
                        ref={cardsContainerRef}
                        className="flex gap-8 justify-center items-center"
                        style={{ transform: 'translateX(-100%)' }}
                    >
                        {allOfficers.map((officer, index) => (
                            <OfficerCard
                                key={index}
                                officer={officer}
                                index={index}
                                isActive={index === activeCardIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
