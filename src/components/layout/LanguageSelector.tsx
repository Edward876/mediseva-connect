
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const { language, setLanguage, t, isLoaded } = useLanguage();
  
  const getLanguageName = (lang: string) => {
    switch(lang) {
      case 'en': return 'English';
      case 'hi': return 'हिंदी';
      case 'bn': return 'বাংলা';
      default: return lang.toUpperCase();
    }
  };
  
  if (!isLoaded) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Globe className="h-4 w-4" />
      </Button>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="h-4 w-4 mr-2" />
          {getLanguageName(language)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border border-border">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="cursor-pointer">
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')} className="cursor-pointer">
          हिंदी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bn')} className="cursor-pointer">
          বাংলা
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
