/** Shared props every component accepts for QA/e2e hooks. */
export interface BaseProps {
  /** Rendered as `data-test-id` for test selectors. */
  dataTestId?: string;
}
