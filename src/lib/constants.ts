// Enquiry status constants
export const ENQUIRY_STATUS = {
  NEW: "new",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  SPAM: "spam",
} as const;

export const STATUS_COLORS: Record<string, string> = {
  new: "#f59e0b",
  in_progress: "#3b82f6",
  resolved: "#22c55e",
  spam: "#ef4444",
};

export const STATUS_LABELS: Record<string, string> = {
  new: "New",
  in_progress: "In Progress",
  resolved: "Resolved",
  spam: "Spam",
};

export const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "spam", label: "Spam" },
] as const;

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Search
export const SEARCH = {
  MIN_QUERY_LENGTH: 1,
  MAX_QUERY_LENGTH: 100,
  DEFAULT_LIMIT: 20,
  DEFAULT_OFFSET: 0,
} as const;

// Cloudinary
export const CLOUDINARY = {
  UPLOAD_PRESET: "delta_preset",
  FOLDER: "products",
} as const;
