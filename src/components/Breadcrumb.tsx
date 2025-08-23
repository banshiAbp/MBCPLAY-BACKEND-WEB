import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/breadcrumb.scss";

export interface BreadcrumbItem {
  label: string;
  path?: string; // If not provided, not clickable
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <nav className="breadcrumb-nav">
      {items.map((item, idx) => (
        <React.Fragment key={item.label + idx}>
          {item.path && idx !== items.length - 1 ? (
            <span
              className="breadcrumb-link"
              onClick={() => navigate(item.path!)}
            >
              {item.label}
            </span>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <span className="breadcrumb-separator">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
