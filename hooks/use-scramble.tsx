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

export function useReverseScramble(
  text: string,
  isHovered: boolean,
  duration: number = 300
) {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    const reversed = text.split("").reverse().join("");
    const startTime = Date.now();

    // First phase: reverse the text
    const reverseAnimate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease in-out for smooth animation
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const currentLength = Math.floor(eased * text.length);
      const result = text
        .split("")
        .map((_, index) => {
          if (index < currentLength) {
            return reversed[index];
          }
          return text[index];
        })
        .join("");

      setDisplayText(result);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(reverseAnimate);
      } else {
        // Second phase: return to normal
        const returnStartTime = Date.now();
        const returnAnimate = () => {
          const returnElapsed = Date.now() - returnStartTime;
          const returnProgress = Math.min(returnElapsed / duration, 1);
          const returnEased =
            returnProgress < 0.5
              ? 2 * returnProgress * returnProgress
              : 1 - Math.pow(-2 * returnProgress + 2, 2) / 2;

          const returnCurrentLength = Math.floor(returnEased * text.length);
          const returnResult = reversed
            .split("")
            .map((_, index) => {
              if (index < returnCurrentLength) {
                return text[index];
              }
              return reversed[index];
            })
            .join("");

          setDisplayText(returnResult);

          if (returnProgress < 1) {
            animationRef.current = requestAnimationFrame(returnAnimate);
          } else {
            setDisplayText(text);
          }
        };
        animationRef.current = requestAnimationFrame(returnAnimate);
      }
    };

    animationRef.current = requestAnimationFrame(reverseAnimate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, isHovered, duration]);

  return displayText;
}
