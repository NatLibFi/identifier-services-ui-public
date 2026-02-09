import { useSearchParams, type LinkProps } from 'react-router';

import InternalLink from '@/components/links/InternalLink';
import NatlibfiLinkText from '@/components/text/NatlibfiLinkText';

import { getParameterizedLink } from '@/utils/link-utils';

interface NavbarLinkProps extends Omit<LinkProps, 'to'> {
  onClick?: () => void;
  path: string;
  text: string;
}

function NavbarLink({ onClick, path, text, ...props }: NavbarLinkProps) {
  const [searchParams] = useSearchParams();
  const useLink = (href: string) => getParameterizedLink(href, searchParams);

  return (
    <InternalLink className={props.className} onClick={onClick} to={useLink(path)}>
      <NatlibfiLinkText focus={path === location.pathname}>{text}</NatlibfiLinkText>
    </InternalLink>
  );
}

export default NavbarLink;
