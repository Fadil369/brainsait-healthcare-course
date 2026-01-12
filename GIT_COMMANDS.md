# 📝 Git Commands Cheat Sheet

## Create GitHub Repository (First Time Only)

### Step 1: Create repo on GitHub.com
Go to: https://github.com/fadil369
Click: New Repository
- Name: `brainsait-healthcare-course`
- Public repo
- Don't initialize with README

### Step 2: Connect and Push (Run these in PowerShell)

```powershell
# Navigate to project
cd "c:\Users\rcmrejection3\podcaster-cf-pages"

# Rename branch to main
git branch -M main

# Add remote (replace with YOUR actual GitHub URL)
git remote add origin https://github.com/fadil369/brainsait-healthcare-course.git

# Push to GitHub
git push -u origin main
```

## Making Updates (After Initial Push)

```powershell
# See what files changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

## Common Update Scenarios

### Update Course Content
```powershell
# After editing index.html or modules
git add .
git commit -m "Updated course content and added new modules"
git push
```

### Add New Files (images, audio, etc.)
```powershell
# After adding new files to the project
git add .
git commit -m "Added audio files and course images"
git push
```

### Fix Bugs
```powershell
git add .
git commit -m "Fixed language switching bug in quiz section"
git push
```

### Add New Features
```powershell
git add .
git commit -m "Added certificate generation feature"
git push
```

## Useful Git Commands

```powershell
# See commit history
git log --oneline

# See remote URL
git remote -v

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard HEAD

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes from GitHub
git pull
```

## GitHub Pages Setup

### Enable Pages (One Time Setup)
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: main branch, / (root)
4. Save

### Check Deployment Status
- Go to Actions tab in your GitHub repo
- See deployment progress
- Click on workflow for details

### Your Live URL
After deployment completes (2-3 minutes):
```
https://fadil369.github.io/brainsait-healthcare-course/
```

## Authentication

If asked for password, use a Personal Access Token:

1. GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Select: `repo` (all repo permissions)
5. Generate token
6. Copy and save it (shown once!)
7. Use as password when git asks

## Quick Reference

| Task | Command |
|------|---------|
| Check status | `git status` |
| Add all files | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push` |
| Pull | `git pull` |
| View history | `git log --oneline` |
| Undo changes | `git reset --hard HEAD` |

## File Structure After Setup

```
brainsait-healthcare-course/         ← Your GitHub repo
├── .git/                             ← Git data (hidden)
├── .github/
│   └── workflows/
│       └── deploy.yml               ← Auto-deployment
├── assets/
│   └── logo.svg                     ← BrainSait logo
├── index.html                       ← Main page ⭐
├── index-old.html                   ← Backup
├── module1.html                     ← Module template
├── README.md                        ← Documentation
├── SETUP_GITHUB.md                  ← Setup guide
├── QUICK_START.md                   ← Quick start
├── GIT_COMMANDS.md                  ← This file
└── .gitignore                       ← Ignored files
```

## Emergency Help

### "Permission denied" error
```powershell
# Use token authentication instead of password
# Or use SSH: git remote set-url origin git@github.com:fadil369/brainsait-healthcare-course.git
```

### "Failed to push" error
```powershell
# Pull first, then push
git pull origin main
git push
```

### Wrong repository URL
```powershell
# Remove wrong remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/fadil369/correct-repo-name.git
```

### Start completely over
```powershell
# Delete .git folder
Remove-Item -Recurse -Force .git

# Start fresh
git init
git add .
git commit -m "Fresh start"
# Then add remote and push
```

## Pro Tips

1. **Commit Often**: Small, frequent commits are better
2. **Good Messages**: Write clear commit messages
3. **Test Locally**: Open index.html in browser before pushing
4. **Check Status**: Run `git status` before committing
5. **Pull First**: Always pull before making changes if working with others

## Need More Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

**Remember**: 
- Changes are only saved when you commit
- Changes only appear on GitHub after you push
- GitHub Pages updates automatically after push (2-3 min delay)
