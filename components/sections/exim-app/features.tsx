import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * The app features shown in the App section. Each one is shown next to the screenshot
 * (in public/app-images) that matches it best. `tone` and `icon` are used by the desktop design.
 */
export const features = [
  {
    id: "f1",
    screen: "4",
    tone: "bg-sky-100 text-sky-600",
    icon: (
      <Icon>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4M10 12h5M10 16h5" />
      </Icon>
    ),
  },
  {
    id: "f2",
    screen: "1",
    tone: "bg-emerald-100 text-emerald-600",
    icon: (
      <Icon>
        <path d="M9 6h11M9 12h11M9 18h11" />
        <circle cx="4.5" cy="6" r="1" />
        <circle cx="4.5" cy="12" r="1" />
        <circle cx="4.5" cy="18" r="1" />
      </Icon>
    ),
  },
  {
    id: "f3",
    screen: "2",
    tone: "bg-violet-100 text-violet-600",
    icon: (
      <Icon>
        <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" />
      </Icon>
    ),
  },
  {
    id: "f4",
    screen: "4",
    tone: "bg-orange-100 text-orange-600",
    icon: (
      <Icon>
        <path d="M5 8h14l-1 12H6z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </Icon>
    ),
  },
  {
    id: "f5",
    screen: "1",
    tone: "bg-blue-100 text-blue-600",
    icon: (
      <Icon>
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="M16 10l5-3v10l-5-3" />
      </Icon>
    ),
  },
  {
    id: "f6",
    screen: "2",
    tone: "bg-rose-100 text-rose-600",
    icon: (
      <Icon>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </Icon>
    ),
  },
  {
    id: "f7",
    screen: "3",
    tone: "bg-teal-100 text-teal-600",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </Icon>
    ),
  },
  {
    id: "f8",
    screen: "3",
    tone: "bg-purple-100 text-purple-600",
    icon: (
      <Icon>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M9 3v4M15 3v4" />
      </Icon>
    ),
  },
] as const;

export const screens = ["1", "2", "3", "4"] as const;

/** What each App section design needs from the shared state. */
export type FeaturePickerProps = {
  /** Index of the feature being shown. */
  active: number;
  /** Show another feature (wraps around); also pauses the automatic rotation for a while. */
  select: (index: number) => void;
};
