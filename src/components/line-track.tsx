import { motion } from 'framer-motion';
import React, { useLayoutEffect, useRef, useState } from 'react';

export const ReversedBendingLine: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const [ratios, setRatios] = useState({ length: 0, endPosition: 0 });

  const pathData =
    'M419.5 784L245.5 784L245.5 293L113.5 293L113.5 105.5L40 105.499L40 -116';
  const SEGMENT_PX = 50;

  useLayoutEffect(() => {
    if (pathRef.current) {
      const totalLength = pathRef.current.getTotalLength();
      if (totalLength > 0) {
        const lengthRatio = SEGMENT_PX / totalLength;
        setRatios({
          length: lengthRatio,
          endPosition: 1 - lengthRatio, // This is the "start" of the path's end
        });
      }
    }
  }, []);

  return (
    <div style={{ background: '#111', padding: '40px' }}>
      <svg viewBox="0 0 400 200" width="100%" style={{ overflow: 'visible' }}>
        {/* Invisible measurement path */}
        <path ref={pathRef} d={pathData} fill="none" stroke="transparent" />

        {ratios.length > 0 && (
          <motion.path
            d={pathData}
            fill="none"
            stroke="#ff0055" // Different color for the reversed version
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            // REVERSED LOGIC:
            initial={{
              pathLength: ratios.length,
              pathOffset: ratios.endPosition, // Start at the end
            }}
            animate={{
              pathOffset: 0, // Move to the beginning
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </svg>
    </div>
  );
};
