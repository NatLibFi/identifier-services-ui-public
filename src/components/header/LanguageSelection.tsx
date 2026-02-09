import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select';

import useTranslation from '@/hooks/useTranslation';

function changeBacklinkLanguage(backlink: string, lng: string) {
  const [path, searchparams] = backlink.split('?');

  const backlinkUrlParams = searchparams ? new URLSearchParams(searchparams) : new URLSearchParams();

  backlinkUrlParams.set('lng', lng);
  return `${path}?${backlinkUrlParams.toString()}`;
}

function LanguageSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const backlink = location?.state?.backlink;

  const [searchParams] = useSearchParams();

  const { translate: t, getCurrentLanguage } = useTranslation();
  const currentLanguage = getCurrentLanguage();

  const handleChangeLanguage = (selectedLanguage: string) => {
    const languageChanged = currentLanguage !== selectedLanguage;
    if (languageChanged) {
      const newBacklink = backlink ? changeBacklinkLanguage(backlink, selectedLanguage) : undefined;

      searchParams.set('lng', selectedLanguage);
      return navigate(`${window.location.pathname}?${searchParams.toString()}`, { state: { backlink: newBacklink } });
    }
  };

  return (
    <div data-test="language-select" className="text-brand-white max-w-[100%]">
      <Select value={currentLanguage} onValueChange={handleChangeLanguage}>
        <SelectTrigger aria-label={t('components.navbar.select-language.aria-label')} className="md:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-brand-darkblue text-brand-white overflow-hidden">
          <SelectGroup>
            <SelectItem data-test="select-finnish-language" value="fi">
              {t('components.header.options.languages.finnish')}
            </SelectItem>
            <SelectItem data-test="select-swedish-language" value="sv">
              {t('components.header.options.languages.swedish')}
            </SelectItem>
            <SelectItem data-test="select-english-language" value="en">
              {t('components.header.options.languages.english')}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSelection;
