# JobFit

JobFit is an intelligent web application designed to help job seekers optimize their resumes and track their application progress. Leveraging AI-powered analysis, JobFit provides detailed feedback on resumes, calculates an Applicant Tracking System (ATS) score, and identifies skill gaps based on job descriptions.

## Features

- **Resume Analysis:** Get comprehensive feedback on your resume's tone, style, content, and structure.
- **ATS Score Calculation:** Understand how well your resume aligns with Applicant Tracking Systems.
- **Skill Gap Analysis:** Identify missing skills based on a provided job description and receive suggestions for improvement.
- **Intuitive UI/UX:** A clean, modern, and responsive user interface built with Tailwind CSS for an enhanced user experience.
- **Application Tracking:** Keep a record of your submitted resumes and their corresponding feedback.

## Technologies Used

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Backend/Cloud Platform:** Puter (for file storage, key-value store, and AI feedback)

## Setup and Installation

To get JobFit up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd JobFit
    ```

2.  **Install dependencies:**
    JobFit uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it via npm:
    ```bash
    npm install -g pnpm
    ```
    Then, install the project dependencies:
    ```bash
    pnpm install
    ```

3.  **Environment Variables:**
    JobFit relies on Puter for its backend services. You will need to configure your Puter credentials. Create a `.env` file in the root directory of the project and add your Puter API key:
    ```
    VITE_PUTER_APP_ID=your_puter_app_id
    VITE_PUTER_APP_KEY=your_puter_app_key
    ```
    (Replace `your_puter_app_id` and `your_puter_app_key` with your actual Puter application ID and key.)

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application should now be running at `http://localhost:3000` (or another port if 3000 is in use).

## Usage

1.  **Upload Resume:** Navigate to the upload section and provide your resume (PDF format) along with the job title, company name, and job description.
2.  **Get Feedback:** JobFit will analyze your resume and provide an ATS score, detailed feedback, and identify skill gaps.
3.  **Review and Improve:** Use the insights to refine your resume and enhance your job application strategy.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.
