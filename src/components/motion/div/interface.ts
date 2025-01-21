import { MotionScrollContext } from '../scroll/interface';

export interface MotionDivContext extends Record<string, Object> {
  'motion-scroll': MotionScrollContext['motion-scroll'];
}
