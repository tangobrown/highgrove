/** Shared enquiry-form types and validation (used by the client form and /api/enquiry). */

export type EnquiryPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interests: string[];
  message?: string;
  /** Which page/variant the form was sent from. */
  source?: string;
  /** Honeypot. Real people leave this empty. */
  company?: string;
};

export type EnquiryErrors = Partial<Record<"firstName" | "lastName" | "email" | "interests", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(p: Partial<EnquiryPayload>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!p.firstName?.trim()) errors.firstName = "Please enter your first name.";
  if (!p.lastName?.trim()) errors.lastName = "Please enter your last name.";
  if (!p.email?.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(p.email.trim())) errors.email = "Please enter a valid email address.";
  if (!p.interests || p.interests.length === 0) errors.interests = "Please choose at least one option.";
  return errors;
}

export const interestOptions = {
  default: ["One bedroom apartment", "Two bedroom apartment", "Patrick Ferry House", "Other"],
  home: ["Independent living", "Care suites", "Patrick Ferry House", "Not sure yet"],
} as const;
