'use client';

import { useTranslations } from 'next-intl';
import { stages } from '@/data/principles';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function FourQuadrantDiagram() {
  const t = useTranslations('quiz');

  const positions = [
    { top: '10%', left: '10%', width: '35%', height: '35%' }, // Stage 1: Prepare
    { top: '10%', right: '10%', width: '35%', height: '35%' }, // Stage 2: Execute  
    { bottom: '10%', right: '10%', width: '35%', height: '35%' }, // Stage 3: Collaborate
    { bottom: '10%', left: '10%', width: '35%', height: '35%' }, // Stage 4: Iterate
  ];

  const colors = [
    'bg-stage1-wash text-stage1 border-stage1',
    'bg-stage2-wash text-stage2 border-stage2',
    'bg-stage3-wash text-stage3 border-stage3',
    'bg-stage4-wash text-stage4 border-stage4',
  ];

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      {/* Center circle with arrows */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-surface-2 flex items-center justify-center border-2 border-line-control">
          <div className="text-center">
            <div className="text-sm font-semibold text-t2">
              AI-Human
            </div>
            <div className="text-xs text-t3">
              Collaboration
            </div>
          </div>
        </div>
        
        {/* Curved arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="currentColor"
                className="text-t3"
              />
            </marker>
          </defs>
          
          {/* Four curved arrows forming a circle */}
          <path
            d="M 75 25 Q 25 25 25 75"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="text-t3"
          />
          <path
            d="M 25 75 Q 25 125 75 125"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="text-t3"
          />
          <path
            d="M 75 125 Q 125 125 125 75"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="text-t3"
          />
          <path
            d="M 125 75 Q 125 25 75 25"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="text-t3"
          />
        </svg>
      </div>

      {/* Four stage quadrants */}
      {stages.map((stage, index) => (
        <motion.div
          key={stage.id}
          className={`absolute border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${colors[index]}`}
          style={positions[index]}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={{
            pathname: '/principles',
            query: { stage: stage.id }
          }} className="block h-full">
            <div className="h-full flex flex-col justify-center text-center">
              <div className="text-lg font-bold mb-2">
                {t(`${stage.messageKey}.name`)}
              </div>
              <div className="text-sm opacity-75">
                {t(`${stage.messageKey}.description`)}
              </div>
              <div className="mt-2 text-xs opacity-60">
                {stage.principles.length} principles
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}