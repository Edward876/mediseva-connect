
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
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border border-border">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')}>
          हिंदी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('mr')}>
          मराठी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('gu')}>
          ગુજરાતી
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ra')}>
          राजस्थानी
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bn')}>
          বাংলা
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ta')}>
          தமிழ்
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('te')}>
          తెలుగు
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
