# Instructions for Using the Chat and Project Workspace

## Overview
This workspace is for the PRO192 course and includes all course materials, code, and supporting files. You can use this chat to ask questions, request code changes, or get help with the project.

## How to Use This Chat
- **Ask for Help:** Type your question or describe the feature you want to implement.
- **Request Edits:** Ask for code changes, bug fixes, or new features. The assistant will make the changes directly in your workspace.
- **Get Explanations:** Request explanations for code, project structure, or any file in the workspace.
- **Run Commands:** Ask to install dependencies, run the development server, or build the project. The assistant will provide the correct PowerShell commands for Windows.

## Project Structure
- `src/`: React source code for the course website.
- `Org_code/`: Course materials (Markdown, HTML, images, slides).
- `public/`: Static assets (fonts, images).
- `index.html`: Main HTML entry point.
- `package.json`: Project dependencies and scripts.
- `summary_codebase.txt`: Overview of the codebase.

## Common Tasks
- **Install dependencies:**
  ```powershell
  npm install
  ```
- **Start development server:**
  ```powershell
  npm run dev
  ```
- **Build for production:**
  ```powershell
  npm run build
  ```

## Editing Course Content
- Update or add Markdown/HTML files in `Org_code/` for lessons and workshops.
- React section components are in `src/components/sections/`.
- Update navigation and section metadata in `src/data/courseSections.ts`.

## Additional Notes
- For a summary of the codebase, see `summary_codebase.txt`.
- Course slides and workshop PDFs are in `Org_code/resource/` and `Org_code/workshop/`.
- Use the integrated terminal and editor in VS Code for the best experience.

---
For further help, ask questions in this chat at any time.
