
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  const [dots, setDots] = useState(".");
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg font-medium">
        {message || t("common.loading")}{dots}
      </p>
    </div>
  );
}
