import { motion, HTMLMotionProps } from "framer-motion";

type ButtonProps = HTMLMotionProps<"button"> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    bgColor?: string;
    color?: string;
  };

export default function Button({
  children,
  bgColor = "#ffb85c",
  color = "#000000",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: bgColor, color: color }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.4,
        // stiffness: 100,
        // mass: 1,
        // damping: 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
