# Operations
Private development deployment is owner-only. Studio Editor uses ChatGPT sign-in and server-side EDITOR_EMAILS allowlist. Configure this secret through Sites; never commit .env. No passwords are stored by the app.

Public launch requires studio verification of all concept copy, reference photography, contact workflow and service availability. Change the private-development robots policy only when publishing publicly. No email notifications are configured: enquiries are saved in the private inbox for review.

Content: use /editor, create or edit a study/article, save draft or select published and save. Project publishing requires the five story headings. Unpublish by saving as draft. Inbox statuses are new, read and archived. Archived enquiries remain recoverable through the status selector.

Schema changes: edit db/schema.ts, generate a new Drizzle migration, inspect SQL, then build and publish. Applied migration files are immutable. Reference images use approved images.unsplash.com URLs without query parameters.

Local development uses the Sites test identity seedy@sites.test. Temporarily include it only in the ignored local .env EDITOR_EMAILS to test the editor. Hosted allowlist remains the studio owner's configured email.
