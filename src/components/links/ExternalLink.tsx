import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import NatlibfiLinkText from '@/components/text/NatlibfiLinkText';

import { cn } from '@/lib/utils';

interface ExternalLinkProps extends React.ComponentProps<'div'> {
  href: string;
  text: string;
}

function ExternalLink({ className, href, text, ...props }: ExternalLinkProps) {
  return (
    <div className={className} {...props}>
      <a href={href} className={cn('flex gap-2 items-baseline')} target="_blank" rel="noopener noreferrer">
        <NatlibfiLinkText>{text}</NatlibfiLinkText>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
}

export default ExternalLink;
