
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
      case 'en': return t('language.en');
      case 'hi': return t('language.hi');
      case 'bn': return t('language.bn');
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
          {t('language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')} className="cursor-pointer">
          {t('language.hi')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bn')} className="cursor-pointer">
          {t('language.bn')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
