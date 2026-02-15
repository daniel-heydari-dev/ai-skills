# Deploy Web Viewer to GitHub Pages

## 🚀 Setup Steps

### 1. Initialize Git (if not already done)
```bash
cd /Users/dani.dev/Home/ai
git init
```

### 2. Create GitHub Repository
Go to https://github.com/new and create a repository named:
- **Repository name:** `personal-ai-skills`
- **Visibility:** Public (required for GitHub Pages on free tier)
- **Don't** initialize with README (your code already has one)

### 3. Connect Local Repo to GitHub
```bash
cd /Users/dani.dev/Home/ai

# Add remote
git remote add origin https://github.com/daniel-heydari-dev/personal-ai-skills.git

# Or if remote exists, update it:
git remote set-url origin https://github.com/daniel-heydari-dev/personal-ai-skills.git
```

### 4. Add, Commit, and Push
```bash
# Stage all files
git add .

# Commit
git commit -m "feat: rename to personal-ai-skills and add GitHub Pages deployment"

# Push to main branch
git branch -M main
git push -u origin main
```

### 5. Enable GitHub Pages
1. Go to your repository: `https://github.com/daniel-heydari-dev/personal-ai-skills`
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Source**, select:
   - **Source:** GitHub Actions
4. Click **Save**

### 6. Trigger Deployment
The workflow will run automatically on push. You can also:
- Go to **Actions** tab
- Click **Deploy to GitHub Pages**
- Click **Run workflow**

### 7. Access Your Live Site
After deployment (takes ~2-3 minutes):
```
https://daniel-heydari-dev.github.io/personal-ai-skills/
```

---

## 📁 Files Created

✅ `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
✅ Updated `package.json` - Repository URLs updated to match new name

---

## 🔄 Future Updates

After making changes to the web viewer:

```bash
cd /Users/dani.dev/Home/ai

# Make your changes
# Test locally: cd web && pnpm dev

# Build and test
pnpm build:all

# Commit and push
git add .
git commit -m "update: your changes"
git push

# GitHub Actions will automatically deploy! 🚀
```

---

## ⚡ Quick Commands

```bash
# Test build locally
cd /Users/dani.dev/Home/ai/web
pnpm dev          # Dev server at localhost:5173
pnpm build        # Build for production

# Check deployment status
# Visit: https://github.com/daniel-heydari-dev/personal-ai-skills/actions
```

---

## 🐛 Troubleshooting

**If deployment fails:**
1. Check Actions tab for error logs
2. Ensure repository is public
3. Verify GitHub Pages is enabled in Settings → Pages
4. Make sure pnpm version matches (using pnpm 8 in workflow)

**If site shows 404:**
1. Check that deployment completed successfully
2. Wait 2-3 minutes after first deployment
3. Clear browser cache

---

## 🎯 What's Included

The deployed site includes:
- ✅ Interactive catalog browser (45 templates)
- ✅ Search functionality
- ✅ Skill/Agent/Command detail pages
- ✅ Installation guide
- ✅ Animated space background
- ✅ Responsive design

Your web viewer will be live at:
**https://daniel-heydari-dev.github.io/personal-ai-skills/**
