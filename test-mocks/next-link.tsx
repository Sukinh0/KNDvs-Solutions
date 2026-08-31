import type { AnchorHTMLAttributes } from 'react';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Link(props: LinkProps) {
  return <a {...props} />;
}
