import { motion, HTMLMotionProps } from "framer-motion";

type ButtonProps = HTMLMotionProps<"button"> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "#ffb85c" }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.4,
        // stiffness: 100,
        // mass: 1,
        // damping: 10,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
