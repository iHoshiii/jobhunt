# JobHunt Development Plan

## What this plan is for

This plan shows how to build JobHunt in small steps. Each phase ends with a working part of the app that can be checked before the next part begins.

The first release should help a user set up a profile, find jobs, review matches, and automatically apply to matching jobs at 85% or higher. Telegram alerts are optional.

## Main rules

- Build one small part at a time. Keep the app usable as it grows.
- Keep private data, passwords, and service keys out of the source code and Git.
- Show where job details and AI results came from.
- Let the user change or remove their profile, saved jobs, and application records.
- Submit an application automatically when the match score is at least 85%, the job site allows it, and all required answers are known.
- Follow each job site's rules. Start with sources that allow the planned way of collecting job listings.
- Keep Telegram optional. The dashboard must work without it.
- Build JobHunt as a job search and application helper, not as a public job listing site.

## Product requirements

- The first release is for job seekers in the Philippines.
- Users choose the work level and type they want from their dashboard. Choices can include internship, entry-level, junior, mid-level, and senior roles.
- LinkedIn, JobStreet, Indeed, and Trabaho.com are the planned job sources. Check each site's rules and available access method before connecting it. Add sources one at a time.
- The user uploads a resume first. AI makes a draft profile summary, and the user can edit it before saving.
- The profile can also include skills, work history, education, job titles, location, work type, and salary needs.
- Compare each job's skills and description with the resume and the user's edited profile. At 75% or higher, mark it **High Priority**. At 85% or higher, submit the application automatically when the site allows it and all required answers are known. Below 75%, mark it **Related**.
- Show the match score, matching skills, missing skills, and the reason for the result.
- The first release should include job search, matching, the dashboard, company research, application document help, browser help, and optional Telegram alerts.
- Record every automatic application so the user can see what JobHunt sent and when.

## Phase 1: Confirm the first release choices

**Goal:** Agree on the details the team needs before building features.

**Work:**

- Confirm the Philippines as the first search area.
- Confirm LinkedIn, JobStreet, Indeed, and Trabaho.com as target sources. For each one, find an allowed way to get listings, such as an official API or approved feed. Do not assume that a site allows automated collection.
- Decide whether users can choose any job level or only levels supported by the first source, such as internship, entry-level, junior, mid-level, and senior.
- Select the Foundry model for resume summaries and job matching.
- Confirm that resume upload is the first profile step, and that the user can edit the AI-written summary before it is used.
- Confirm profile fields for skills, work history, education, job titles, location, work type, and salary needs.
- Set the match groups: **High Priority** at 75% or higher, and **Related** below 75%. Automatically apply at 85% or higher.
- Define how match scores are calculated from the job description and the user's resume and profile.
- If a site blocks automated applications or needs information that is not in the profile, send the job to manual review and explain why.
- Confirm that all requested features are part of the first release, while still building and checking them in the order in this plan.

**Done when:** The open choices above are answered, source access methods are known, and the first release scope is written in the project docs.

## Phase 2: Prepare the project

**Goal:** Make it easy to run and change the app on a developer's computer.

**Work:**

- Create the React and Vite frontend and the Node.js and Express backend in TypeScript.
- Add Tailwind CSS, ESLint, Prettier, and TypeScript checks.
- Use `src/client` for frontend code and `src/server` for backend code, with folders for pages, shared UI parts, routes, and services.
- Add example environment settings with blank values. Keep real keys in ignored local files.
- Add simple setup steps to the README, including how to start the frontend and backend.
- Add a basic page and a health route that says whether the backend is running.

**Done when:** A new developer can follow the setup guide, start both parts, open the page, and see that the backend is running.

## Phase 3: Connect Supabase and add sign-in

**Goal:** Give each user a private account and safe data storage.

**Work:**

- Set up the Supabase project for local development and the first hosted version.
- Add sign-up, sign-in, sign-out, and password reset.
- Protect backend routes so a signed-in user can only read or change their own data.
- Set up database access rules for user-owned data.
- Add a first database change process so updates to the data layout can be repeated.
- Add clear messages for sign-in errors and expired sessions.

**Done when:** A user can make an account, sign in, sign out, and only see their own test data.

## Phase 4: Build the user profile and job choices

**Goal:** Let users tell JobHunt what kind of work they want.

**Work:**

- Make resume upload the first profile step.
- Use AI to draft a short summary of the resume. Show it to the user for edits and approval before saving it as the profile summary.
- Add profile fields for skills, work history, education, location, job titles, work type, and salary needs.
- Add dashboard choices for the job level the user wants, such as internship, entry-level, junior, mid-level, or senior.
- Let users add several skills and job titles.
- Let users set work type and location choices, such as remote or in-person.
- Let users set a minimum match score for alerts.
- Save profile changes to Supabase and load them when the user signs in.
- Add form checks and explain missing or invalid fields in plain language.

**Done when:** A user can upload a resume, review and edit its summary, set their job choices, and reload the saved profile.

## Phase 5: Find and store jobs from chosen sources

**Goal:** Bring job listings into the app in one consistent format.

**Work:**

- Add LinkedIn, JobStreet, Indeed, and Trabaho.com as planned sources, one at a time, using only an access method each site allows.
- Keep each source in its own part of the backend so it can be changed without rewriting the rest of the app.
- Collect only the details needed, such as title, company, location, description, source link, and date found.
- Clean up text and dates so listings from different sources use the same fields.
- Check required fields and skip broken listings with a useful log message.
- Find duplicate listings by source ID when available, and by link or other job details when it is not.
- Save the source name and original link with every listing.
- Make the search serve the user's selected job level, role, and location. JobHunt should use the listings to find jobs to apply for, not present itself as a public job board.
- Add a manual way for a developer to start a search run.

**Done when:** Each connected source can be searched, clean jobs are stored with source links, and another run does not create copies of the same jobs.

## Phase 6: Add Foundry job matching

**Goal:** Compare each job with the user's profile and explain the result.

**Work:**

- Connect the backend to the chosen Foundry service using settings from the environment.
- Send only the profile and job details needed for matching.
- Ask Foundry for a match score, matching skills, missing skills, and a short reason based on the job, resume, and edited profile.
- At 75% or higher, mark the result **High Priority**. At 85% or higher, submit the application automatically when the site allows it and all answers are known. Mark lower scores **Related**.
- Check the result before saving it. Handle missing or invalid answers without breaking the job list.
- Save the score and explanation with the job and user, along with the time of the match.
- Avoid repeating the same AI request when the profile and job have not changed.
- Show a clear message when the AI service is unavailable. Keep the job listing visible.
- Make it clear that the score is a guide and can be wrong.

**Done when:** A user can see the score, matching and missing skills, and the correct **High Priority** or **Related** group. The app handles an AI service error safely.

## Phase 7: Build the job search dashboard and application tracking

**Goal:** Give users one place to review and manage jobs.

**Work:**

- Make the dashboard a personal job search workspace, not a general job listing site.
- Show **High Priority** jobs first and **Related** jobs in a separate group.
- Show title, company, location, date found, match score, source, and application link.
- Add search and filters for title, location, source, score, and status.
- Add a job details page with the full description, source link, and match explanation.
- Let a user save a job, dismiss it, or mark it as interesting.
- Record each application that JobHunt submits and its result. Let the user update simple states such as interview, offer, and closed.
- Let users add notes and dates to an application record.
- Make sure job and application changes belong to the signed-in user.
- Add useful empty states, such as when the user has no jobs yet.

**Done when:** A user can review High Priority and Related jobs, understand each match, see which applications were sent automatically, and update their progress.

## Phase 8: Add optional Telegram alerts

**Goal:** Send alerts for new jobs that meet the user's choices.

**Work:**

- Let users connect a Telegram chat using a safe setup flow.
- Let users turn alerts on or off and set their score limit.
- Send alerts only for new High Priority matches that meet that user's limit.
- Include the job title, company, match score, a short reason, and a link to the job.
- Track sent alerts so a job does not create repeated messages.
- Handle missing settings or Telegram errors without stopping job collection.
- Do not put private profile details in the Telegram message.

**Done when:** A user can turn alerts on or off, and qualifying new jobs create one useful message.

## Phase 9: Run job searches on a schedule

**Goal:** Find new jobs without needing a developer to start each run.

**Work:**

- Add a schedule for the job collection task.
- Keep the schedule and time zone in settings.
- Prevent two copies of the same collection task from running at once.
- Record when each run starts, finishes, and fails.
- Retry only safe temporary errors, with a limit on the number of retries.
- Add a way for an admin or developer to start a run by hand.
- Show the last run result in a simple status page or log.

**Done when:** Scheduled runs find jobs, avoid duplicate work, and leave a clear record when a run succeeds or fails.

## Phase 10: Add company research and application help

**Goal:** Help users prepare after they choose a job to pursue.

**Work:**

- Add a company details page using public information and clearly show its source.
- Add a resume and cover letter helper that uses the selected job and the user's profile.
- Let the user review and edit every generated document before saving it.
- Save user files in private Supabase storage, with access limited to that user.
- Add a way for users to remove saved files.
- Add browser help to fill and submit application forms where the job site allows it.
- Use only facts and documents saved in the user's profile. Do not make up answers to application questions.
- Before sending, check the score is at least 85%, the job was not already submitted, and all required answers are known.
- If a site does not allow automation or asks something the profile cannot answer, do not submit. Save the job for manual review and explain why.
- Save the submission result and notify the user with the job link and date.

**Done when:** A qualifying application is sent only when all checks pass. The app records the result and sends incomplete or unsupported applications to the user for review.

## Phase 11: Check safety, quality, and ease of use

**Goal:** Find common problems before the app is shared.

**Work:**

- Check sign-up, sign-in, profile updates, job search, matching, saving, and application tracking.
- Check that one user cannot read another user's profile, jobs, notes, or files.
- Check that passwords and service keys do not appear in source files, logs, or error messages.
- Check that job source failures, Foundry errors, and Telegram errors do not expose private data.
- Check the app on phone and desktop screen sizes.
- Check keyboard use, page labels, and error messages.
- Check slow or empty job lists and missing profile fields.
- Write down any known limits, such as job sources that are not yet supported.

**Done when:** The main user paths work, private data stays private, and known issues are written down.

## Phase 12: Deploy the first release

**Goal:** Make the app available to the user and keep a safe way to update it.

**Work:**

- Choose hosting for the frontend and backend, and confirm the final database and Foundry settings.
- Set production keys in the host's secret settings, not in Git.
- Use separate settings for local development and production.
- Set up a private production database and storage rules.
- Add a simple health check and error logs that do not include private user data.
- Make a backup plan for the database and user files.
- Deploy a small test version, check the main user paths, then open it for normal use.
- Write down how to deploy an update and how to restore a backup.

**Done when:** The app is online, the main paths work in production, and the owner knows how to update and restore it.

## Suggested first release

The first release should include all features in this plan: resume-first profile setup, user-selected job choices, the four requested job sources where allowed access is available, Foundry matching, the High Priority and Related groups, auto-apply for scores of 85% or higher, company research, resume and cover letter help, browser help, application history, and optional Telegram alerts. Build these in order and make sure each part works before adding the next one.

## After the first release

- Connect any remaining requested job sources after confirming an allowed access method and checking data quality.
- Improve search filters based on what users need.
- Add better match explanations based on user feedback.
- Add export tools for application records and generated documents.
- Review alert quality and tune how often alerts are sent.
- Improve browser assistance for sites that allow automatic applications.
