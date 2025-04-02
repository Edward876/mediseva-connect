
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
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="h-4 w-4 mr-2" />
          {t(`language.${language}`)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          {t('language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')}>
          {t('language.hi')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('mr')}>
          {t('language.mr')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('gu')}>
          {t('language.gu')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ra')}>
          {t('language.ra')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('bn')}>
          {t('language.bn')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
