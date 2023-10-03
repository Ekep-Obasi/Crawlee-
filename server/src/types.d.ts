export type CategoryGroups =
  | "scholarships"
  | "internships"
  | "online-courses"
  | "writing-tips"
  | "events"
  | "admissions"
  | "jobs"
  | string
  | null;

export interface Data {
  title: string;
  image: string;
  address: string;
  datetime: string | null | undefined;
  label: string;
}