import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}
export const ContinueButton = ({ children, disabled=false, ...rest }: Props) => (
    <motion.button
        className={`w-full py-2 rounded-lg font-semibold text-white transition
       ${disabled ? 'bg-mint-300 opacity-50 cursor-not-allowed' : 'bg-mint-500 hover:bg-mint-600 shadow-md hover:shadow-lg'}`}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        disabled={disabled}
        {...rest}
    >{children}</motion.button>
);