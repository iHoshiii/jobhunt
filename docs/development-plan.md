# JobHunt Development Plan

## What this plan is for

This plan shows how to build JobHunt in small steps. Each phase ends with a working part of the app that can be checked before the next part begins.

The first release should help a user set up a profile, find jobs, review AI match results, and track jobs they want to follow. Telegram alerts can be turned on by the user. The app must leave final job choices and application submissions to the user.

## Main rules

- Build one small part at a time. Keep the app usable as it grows.
- Keep private data, passwords, and service keys out of the source code and Git.
- Show where job details and AI results came from.
- Let the user change or remove their profile, saved jobs, and application records.
- Do not submit job applications for the user.
- Follow each job site's rules. Start with sources that allow the planned way of collecting job listings.
- Keep Telegram optional. The dashboard must work without it.

## Phase 1: Set the first release choices

**Goal:** Agree on the details the team needs before building features.

**Work:**

- Pick the first job sources. Start with one source that allows job listings to be collected, then add more later.
- Pick the first user location and job types to support.
- Choose the Foundry service, model, and access method. Record the needed settings, but keep keys in local environment files.
- Agree on the profile fields, such as skills, work history, education, location, and preferred roles.
- Decide what a match score means and how the user can change the score limit for alerts.
- Decide which application states the app will support, such as interested, applied, interview, offer, and closed.
- Confirm which features belong in the first release and which can wait.

**Done when:** The choices are written in the project docs, and the team knows what the first working release will include.

## Phase 2: Prepare the project

**Goal:** Make it easy to run and change the app on a developer's computer.

**Work:**

- Create the React and Vite frontend and the Node.js and Express backend.
- Add Tailwind CSS and the agreed code checks.
- Add a clear folder layout for pages, shared UI parts, API routes, database code, and job source code.
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

- Add a profile page for skills, experience, education, location, and preferred job titles.
- Let users add several skills and job titles.
- Let users set work type and location choices, such as remote or in-person.
- Let users set a minimum match score for alerts.
- Save profile changes to Supabase and load them when the user signs in.
- Add form checks and explain missing or invalid fields in plain language.

**Done when:** A user can add, edit, save, and reload their job search profile.

## Phase 5: Collect and store job listings

**Goal:** Bring job listings into the app in one consistent format.

**Work:**

- Build one job source first. Keep each source in its own part of the backend so it can be changed without rewriting the rest of the app.
- Collect only the details needed, such as title, company, location, description, source link, and date found.
- Clean up text and dates so listings from different sources use the same fields.
- Check required fields and skip broken listings with a useful log message.
- Find duplicate listings by source ID when available, and by link or other job details when it is not.
- Save the source name and original link with every listing.
- Add a manual way for a developer to start a collection run.

**Done when:** A developer can run the first source, see clean listings in the database, and run it again without making copies of the same jobs.

## Phase 6: Add Foundry job matching

**Goal:** Compare each job with the user's profile and explain the result.

**Work:**

- Connect the backend to the chosen Foundry service using settings from the environment.
- Send only the profile and job details needed for matching.
- Ask Foundry for a match score, matching skills, missing skills, and a short reason.
- Check the result before saving it. Handle missing or invalid answers without breaking the job list.
- Save the score and explanation with the job and user, along with the time of the match.
- Avoid repeating the same AI request when the profile and job have not changed.
- Show a clear message when the AI service is unavailable. Keep the job listing visible.
- Make it clear that the score is a guide and can be wrong.

**Done when:** A user can see a match score and plain explanation for jobs, and the app handles an AI service error safely.

## Phase 7: Build the job dashboard and tracking

**Goal:** Give users one place to review and manage jobs.

**Work:**

- Show a list of jobs with title, company, location, date found, and match score.
- Add search and filters for title, location, source, score, and status.
- Add a job details page with the full description, source link, and match explanation.
- Let a user save a job, dismiss it, or mark it as interesting.
- Add application records and simple states such as interested, applied, interview, offer, and closed.
- Let users add notes and dates to an application record.
- Make sure job and application changes belong to the signed-in user.
- Add useful empty states, such as when the user has no jobs yet.

**Done when:** A user can find a job, review why it matched, save or dismiss it, and update its application state.

## Phase 8: Add optional Telegram alerts

**Goal:** Send alerts for new jobs that meet the user's choices.

**Work:**

- Let users connect a Telegram chat using a safe setup flow.
- Let users turn alerts on or off and set their score limit.
- Send alerts only for new matches that meet that user's limit.
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
- Do not send applications or contact employers automatically.

**Done when:** A user can review company notes and draft application documents, edit them, and keep or remove them.

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

The first release should include Phases 1 through 8, with one approved job source, profile setup, Foundry matching, the dashboard, application tracking, and optional Telegram alerts. Phase 9 can follow once manual runs are reliable. Company research, document help, and browser help can come later.

## After the first release

- Add more job sources after checking their rules and data quality.
- Improve search filters based on what users need.
- Add better match explanations based on user feedback.
- Add export tools for application records and generated documents.
- Review alert quality and tune how often alerts are sent.
- Add browser assistance only as a guided helper. The user must review and submit each application.
