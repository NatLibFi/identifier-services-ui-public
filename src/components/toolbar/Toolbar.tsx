import { useLocation, useNavigate } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Separator } from '@/components/shadcn/separator';
import { Button } from '@/components/shadcn/button';

import NatlibfiInteractiveElementText from '@/components/text/NatlibfiInteractiveElementText';

import useTranslation from '@/hooks/useTranslation';

function Toolbar() {
  const location = useLocation();
  const backlink = location?.state?.backlink;

  const navigate = useNavigate();
  const { translate: t } = useTranslation();

  const handleGoBack = () => {
    if (backlink) {
      return navigate(backlink);
    }

    return window.history.go(-1);
  };

  return (
    <>
      <div className="mb-4">
        <Button variant={'outline'} onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <NatlibfiInteractiveElementText>{t('components.toolbar.back-button')}</NatlibfiInteractiveElementText>
        </Button>
      </div>
      <Separator className="mb-4" />
    </>
  );
}

export default Toolbar;
