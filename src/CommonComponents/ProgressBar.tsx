import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ProgressBarRow = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: red;
  transform-origin: 0%;
  /* width: 100vw; */
  max-width: 100%;
  margin: 0;
  padding: 0;
  z-index: 1000;
`;

// export const ProgressBarCol = styled(motion.div)`
//   position: fixed;
//   bottom: 0;
//   top: 0;
//   right: 0;
//   width: 5px;
//   background: red;
//   /* transform-origin: 0%; */
//   height: 100%;
//   max-height: 100vh;
//   margin: 0;
//   padding: 0;
//   z-index: 1000;
// `;
