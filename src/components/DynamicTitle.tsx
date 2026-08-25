'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DynamicTitle() {
  const [scrollY, setScrollY] = useState(0);
  const [titleState, setTitleState] = useState(0);
  const t = useTranslations('home.hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY < 50) {
      setTitleState(0);
    } else {
      setTitleState(1);
    }
  }, [scrollY]);

  const titleVariants = [
    t('title'),
    t('titleAlt') || "10x Engineer Efficiency."
  ];

  return (
    <motion.h1 
      className="hero-text text-hero mb-8"
      key={titleState}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {titleVariants[titleState]}
    </motion.h1>
  );
}