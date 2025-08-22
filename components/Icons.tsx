

import React from 'react';

type IconProps = {
    className?: string;
};

export const PdvsaLogo: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="PDVSA Logo">
        <path 
            fill="#D50000" 
            d="M50,5 C25,25 25,60 50,95 C75,60 75,25 50,5 Z" 
        />
    </svg>
);

export const CorporacionJFLogo: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Corporacion JF Logo">
        <rect width="100" height="100" rx="15" fill="#1f2937"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="65" fontFamily="Arial, sans-serif" fontWeight="bold">
            JF
        </text>
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export const QRIcon: React.FC<IconProps> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6.5 2.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM12 12h.01M17 12h.01M7 12h.01M7 17h.01M12 7h.01M7 7h.01M4 4h16v16H4V4z" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 3a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const IdCardIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4m-9 4h2m-2 4h6" />
    </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const TruckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM13 16h2a1 1 0 001-1V7a1 1 0 00-1-1h-2" />
    </svg>
);

export const RouteIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LogIcon: React.FC<IconProps> = ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

export const ErrorIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" />
    </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459l-6.323 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.885-.002 2.024.604 3.965 1.698 5.595l.406.606-1.037 3.787 3.849-1.009.587.353z" />
    </svg>
);

export const LockClosedIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

export const SpinnerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2 2-2.293-2.293a1 1 0 010-1.414L10 6l2.293-2.293a1 1 0 011.414 0zM18 10l-2 2-2.293-2.293a1 1 0 010-1.414L18 4l2.293 2.293a1 1 0 010 1.414L18 10z" />
    </svg>
);


// Base64 encoded logos for PDF generation.
export const PDVSA_LOGO_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQeSURBVHgB7Z1/T9tVGMaf/883FBeIixVjGCNiE8E4jI1JxEiM4v+AEY9ejDS6cuEnMOMvMDHiwUTBxFDEBCMGF0wMvBjj+K9r2/t+f2pft32e/b7Xrq217fnAc+55nuc8z3me5/l17b2XQqFQKBQKhUKhUCgUCoXCLyD5Cq83kGxJOk3Sg6T/SPptM2aTpDGS/knSL5LOJj2SNJmkuZ7n8yTtYJ/fk/Qf/f6+S5oXp0VSJUm9Bv8vku5MOhM98d/oB5J2SpqS9JykqSTN/fI/vYykAUnDks5MOhP9v9n8KOkZST9P+puk1/xY2nNJI5IOJe2VdDfp93bV7o9Jv5P0o6R1/HhN0v5Jn0w6k3Qm+n/n87ek1wH/h6THJX1KelbS1iT1/HhF0vskXU86k3Qm+v+6+fOklUk/lPSRpFf5945395+k5/z/Gkl/k/Q/SRv4+ZukP/j/3d+SvucfS8f7m6QzyWzSHj8n6VGSVklDki4m/SnpN0mn4+cvyQck3Uo6J+l4/F+n83MkHUn6IUmXJq2XNLmX/z+1r13r48eTpE+S/pf0IknDkgYk3U06k3Qm+h/mbyRNSIaT3icdTrqbdCbpTPT/x+ZfSPqIpJsk/SppA/+/X+f3JZ32/+v1A7/u6o7X+T2SJkl6lPQ+SdsljSftTjqb9DrpfJI2J13Mv+frWdIXJP1U0uU+f08yY9L5JG1M+g/JG5LOJh1JOpN0Jvqf5v9Z0vUkXSPpKkkPkv5P0sEk/Zq/9940SdMkjUtaWNKw5J3v99H70x/495tI+pSkA0knks5k3J8kXUi6nvQ/SWuT3vD//s95k3Qg6VzS977/S7qR9D3/XvW+ZPb7+L/m8rOkl5Lg0f9P8+cleSTpXNJMyaeStiR9b518QNKb/P1+dO3/b/j/b9b/n+e/P1k+IOlcyaYkHZJ0Pvl1v8/Pkv4o6VzyT0i+R9J+SXv9+1rSg6QPS/qOpBNJeiLpfJK2/h+S1/z7/1yStCdpbZLpJF3P3y+8L0lH+ff177ek9Ukfk/SQpA38v0vaPklb+fuBfUDSQZL+LWkzP5+X9E7S975+T9L/Jf1S0iZ+viXpSJLGSZoq6XfS7yV9Iele0gT+fyHpM5I+k/QnSW9z3S7oA5K2JP1X0iZ+nqTvk75O+gn/3yT9S9LfJH1G0gT+33z/mKTZ7/8L/T//xY/PCoVCofB/y8N/3z84kG1gEwqFQqFQKBQKhUKhUPhPyINoEAqFQqFQKBQKhUKh8P+QD1EjFIpCIJkg1P4vCmV/BEEQhG5C/g/ZIAiCIAiCIAh+h5CfiDqFQqFQ/l8I/bY4kUIIgiAIgiAIgvsI+YmoUyh8hyC0y/4oFAqFQqFQKBQKhUKh8J/m9z/8KxS8r8cAAAAASUVORK5CYII=';
export const CORPORACION_JF_LOGO_B64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHElEQVQ4T2NkYPh/x0BGGgj/GAkADGjBqA0QBQBLbgZ/fPOqYwAAAABJRU5kJggg==';