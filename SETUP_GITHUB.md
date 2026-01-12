# GitHub Repository Setup Guide

## Step 1: Create Repository on GitHub

1. Go to https://github.com/fadil369
2. Click on the "+" icon in the top right → "New repository"
3. **Repository name**: `brainsait-healthcare-course` (or your preferred name)
4. **Description**: Interactive bilingual online course on healthcare data insights
5. **Visibility**: Public (required for GitHub Pages)
6. **Do NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Initialize and Push Local Repository

Open PowerShell in your project directory and run:

```powershell
# Navigate to project directory
cd "c:\Users\rcmrejection3\podcaster-cf-pages"

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: BrainSait Interactive Healthcare Course with bilingual support"

# Add remote repository (replace with your actual repository URL)
git remote add origin https://github.com/fadil369/brainsait-healthcare-course.git

# Set main branch name
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** (in the left sidebar)
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait a few minutes for deployment
7. Your site will be live at: `https://fadil369.github.io/brainsait-healthcare-course/`

## Step 4: Configure GitHub Actions (Optional - Already Configured)

The `.github/workflows/deploy.yml` file is already set up for automatic deployment.
Every time you push changes, the site will automatically update!

## Step 5: Update Content

To make updates:

```powershell
# Make your changes to files

# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Step 6: Add Custom Domain (Optional)

1. In repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take 24-48 hours)

## Troubleshooting

### If you get authentication errors:
- Use a personal access token instead of password
- Go to GitHub Settings → Developer settings → Personal access tokens
- Generate new token with `repo` scope
- Use token as password when pushing

### If pages don't deploy:
- Check the Actions tab for deployment status
- Ensure repository is public
- Verify main branch has the correct files
- Wait 5-10 minutes after enabling Pages

## Repository Structure

```
brainsait-healthcare-course/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment configuration
├── assets/
│   └── logo.svg                # BrainSait logo
├── index.html                  # Main course homepage (bilingual)
├── index-old.html              # Original podcast page (backup)
├── module1.html                # Sample module page
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules
```

## Features Implemented

✅ Bilingual support (English/Arabic)
✅ BrainSait branding with purple/cyan gradient
✅ Interactive course modules
✅ Audio player for podcast
✅ Quiz functionality
✅ Progress tracking
✅ Responsive design
✅ Modern glassmorphism UI
✅ Smooth animations
✅ SEO optimized

## Next Steps

1. Add actual audio files (.mp3) for the podcast
2. Create additional module pages (module2.html - module6.html)
3. Add video content or embedded videos
4. Implement backend for progress tracking (optional)
5. Add more interactive quizzes
6. Create downloadable resources (PDFs, slides)
7. Add certificate generation functionality

## Need Help?

- GitHub Pages documentation: https://docs.github.com/pages
- Git documentation: https://git-scm.com/doc
- Tailwind CSS docs: https://tailwindcss.com/docs
