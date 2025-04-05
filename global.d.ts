import { HTMLAttributes } from 'react';
import { MotionProps } from 'framer-motion';

declare module 'framer-motion' {
  export interface MotionProps extends HTMLAttributes<HTMLElement> {
    // Keep this empty to inherit all HTML attributes
  }
}