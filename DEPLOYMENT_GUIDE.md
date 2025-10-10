# AWS Amplify Deployment Guide for TuringForce Website

## Prerequisites

1. **AWS Account** - You need an active AWS account
2. **Git Repository** - Your website code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **AWS CLI** (Optional) - For advanced configuration

## Method 1: Deploy via AWS Amplify Console (Recommended)

### Step 1: Prepare Your Repository

1. **Commit all changes to your Git repository:**
   ```bash
   cd /Users/himanshu.saxena/project_workspace/turing_force_workspace/turing-force-website
   git add .
   git commit -m "Add Amplify configuration files"
   git push origin main
   ```

### Step 2: Create Amplify App

1. **Go to AWS Amplify Console:**
   - Visit: https://console.aws.amazon.com/amplify/
   - Sign in to your AWS account

2. **Create New App:**
   - Click **"New app"** → **"Host web app"**
   - Choose **"GitHub"**, **"GitLab"**, or **"Bitbucket"** (whichever you're using)
   - Authorize AWS Amplify to access your repository

3. **Select Repository:**
   - Choose your `turing-force-website` repository
   - Select the branch (usually `main` or `master`)

### Step 3: Configure Build Settings

Amplify will auto-detect your static site, but you can verify:

1. **Build Settings:**
   - **App build command:** `echo "Static site - no build process needed"`
   - **Output directory:** `.` (root directory)
   - **Base directory:** Leave empty

2. **Environment Variables:** (Optional)
   - No environment variables needed for static sites

### Step 4: Deploy

1. **Review Settings:**
   - Review the build settings
   - Click **"Save and deploy"**

2. **Monitor Build:**
   - Watch the build process in the console
   - Your site will be available at: `https://[app-id].amplifyapp.com`

## Method 2: Deploy via AWS CLI

### Step 1: Install AWS CLI

```bash
# macOS
brew install awscli

# Or download from: https://aws.amazon.com/cli/
```

### Step 2: Configure AWS CLI

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
# Enter your default output format (json)
```

### Step 3: Deploy with CLI

```bash
# Initialize Amplify in your project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

## Method 3: Manual Deployment (Quick Test)

### Step 1: Create Zip File

```bash
cd /Users/himanshu.saxena/project_workspace/turing_force_workspace/turing-force-website
zip -r turingforce-website.zip . -x "*.git*" "node_modules/*" "*.DS_Store"
```

### Step 2: Upload to Amplify

1. Go to AWS Amplify Console
2. Click **"New app"** → **"Deploy without Git"**
3. Upload your `turingforce-website.zip` file
4. Click **"Save and deploy"**

## Post-Deployment Configuration

### Custom Domain (Optional)

1. **In Amplify Console:**
   - Go to your app → **"Domain management"**
   - Click **"Add domain"**
   - Enter your domain name
   - Follow DNS configuration instructions

### Environment Variables (If Needed)

1. **In Amplify Console:**
   - Go to **"Environment variables"**
   - Add any required variables

### Build Settings Optimization

Your `amplify.yml` is already optimized, but you can customize:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Pre-build phase"
    build:
      commands:
        - echo "Build phase - static site ready"
  artifacts:
    baseDirectory: .
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check that all files are committed to Git
   - Verify `amplify.yml` syntax
   - Check build logs in Amplify console

2. **404 Errors:**
   - Verify `_redirects` file is in root directory
   - Check that all HTML files are properly linked

3. **Assets Not Loading:**
   - Ensure all asset paths are relative
   - Check that files are in the correct directories

### Build Logs:

- Go to Amplify Console → Your App → **"Build history"**
- Click on any build to see detailed logs

## Performance Optimization

### Already Configured:

✅ **Caching Headers** - Static assets cached for 1 year
✅ **Security Headers** - X-Frame-Options, Content-Type-Options
✅ **Gzip Compression** - Automatic with Amplify
✅ **CDN Distribution** - Global edge locations

### Additional Optimizations:

1. **Image Optimization:**
   - Consider using WebP format for images
   - Compress images before upload

2. **Code Splitting:**
   - Your site is already optimized as static HTML

## Monitoring and Analytics

### AWS Amplify Analytics:

1. **Enable Analytics:**
   - Go to your app → **"Analytics"**
   - Enable visitor analytics

2. **Custom Events:**
   - Track user interactions
   - Monitor page views

## Cost Estimation

### AWS Amplify Pricing:

- **Free Tier:** 1,000 build minutes/month
- **Hosting:** $0.15 per GB served
- **Build:** $0.01 per build minute after free tier

**Estimated Monthly Cost:** $5-20 for typical website traffic

## Next Steps After Deployment

1. **Test Your Site:**
   - Visit your Amplify URL
   - Test all pages and functionality
   - Check mobile responsiveness

2. **Set Up Monitoring:**
   - Enable CloudWatch logs
   - Set up alerts for build failures

3. **Configure CI/CD:**
   - Every Git push will trigger automatic deployment
   - Set up branch-based deployments for staging

## Support

- **AWS Amplify Documentation:** https://docs.aws.amazon.com/amplify/
- **AWS Support:** Available through AWS Console
- **Community:** AWS Amplify Discord/Forums

---

**Your website is now ready for AWS Amplify deployment! 🚀**
