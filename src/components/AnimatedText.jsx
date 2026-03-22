import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text }) => {
  const isMulti = Array.isArray(text);
  const lines = isMulti ? text : [text];
  
  let charCount = 0;

  return (
    <>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line.split('').map((ch, i) => {
            const delayIndex = charCount++;
            return (
              <span 
                key={i} 
                style={{
                  display: 'inline-block',
                  overflow: ch === ' ' ? 'visible' : 'hidden',
                  verticalAlign: 'top',
                  // paddingBottom and negative marginBottom give enough room for standard descenders to not clip without creating extra gap
                  paddingBottom: '0.15em',
                  marginBottom: '-0.15em',
                }}
              >
                {ch === ' ' ? (
                  <span>&nbsp;</span>
                ) : (
                  <motion.span
                    style={{ display: 'inline-block', willChange: 'transform' }}
                    initial={{ y: '110%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, delay: 0.05 * delayIndex, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {ch}
                  </motion.span>
                )}
              </span>
            );
          })}
          {isMulti && lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

export default AnimatedText;
