import * as React from 'react';
import { Link } from 'react-router';

interface BreadcrumbsItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
  className?: string;
  'aria-label'?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, 'aria-label': ariaLabel }) => {
  return (
    <nav
      aria-label={ariaLabel || 'breadcrumb'}
      className={
        className
          ? `flex items-center space-x-2 text-sm ${className}`
          : 'flex items-center space-x-2 text-sm'
      }
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link to={item.href} className="hover:underline hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-muted-foreground/60">/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export { Breadcrumbs };
