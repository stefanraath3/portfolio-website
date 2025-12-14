import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function useScramble(
  text: string,
  trigger: boolean = false,
  speed: number = 30
) {
  const [scrambled, setScrambled] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!trigger) {
      setScrambled(text);
      return;
    }

    let iteration = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setScrambled(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, trigger, speed]);

  return scrambled;
}

export function useScrambleInput(trigger: boolean) {
  // This hook is for scrambling existing input values
  // It returns a function that takes a string and scrambles it if trigger is true
  // But since input values change, we might need a simpler approach:
  // We just return a function that generates random string of same length

  const scramble = (text: string) => {
    return text
      .split("")
      .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
      .join("");
  };

  return scramble;
}
