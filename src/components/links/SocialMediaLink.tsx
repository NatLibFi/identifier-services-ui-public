import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import NatlibfiLinkText from '@/components/text/NatlibfiLinkText';

interface SocialMediaLinkProps extends FontAwesomeIconProps {
  href: string;
  text: string;
}

function SocialMediaLink({ href, icon, text, ...props }: SocialMediaLinkProps) {
  return (
    <a href={href} className="flex gap-2 items-center" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon size="1x" icon={icon} {...props} />

      <NatlibfiLinkText>{text}</NatlibfiLinkText>
      <FontAwesomeIcon size="xs" icon={faArrowUpRightFromSquare} />
    </a>
  );
}

export default SocialMediaLink;
