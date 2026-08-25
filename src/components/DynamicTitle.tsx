'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DynamicTitle() {
  const [scrollY, setScrollY] = useState(0);
  // Derived from scrollY during render — no effect, no cascading re-render.
  const titleState = scrollY < 50 ? 0 : 1;
  const t = useTranslations('home.hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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