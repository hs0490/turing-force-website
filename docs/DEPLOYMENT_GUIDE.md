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

### Custom Domain Setup for turingforce.ai (GoDaddy)

Since your domain `turingforce.ai` is registered with GoDaddy, here's the specific setup:

#### Step 1: Add Domain in Amplify Console

1. **In Amplify Console:**
   - Go to your app → **"Domain management"**
   - Click **"Add domain"**
   - Enter `turingforce.ai`
   - Choose **"Add both www and non-www"** (recommended)

#### Step 2: Configure DNS in GoDaddy

1. **Log into GoDaddy:**
   - Go to https://dcc.godaddy.com/
   - Sign in to your account
   - Go to **"My Products"** → **"DNS"**

2. **Update DNS Records:**
   
   **For Root Domain (turingforce.ai):**
   - **Type:** CNAME
   - **Name:** @ (or leave blank)
   - **Value:** [Amplify will provide this - looks like: `d1234567890.cloudfront.net`]
   - **TTL:** 600 (10 minutes)

   **For WWW Subdomain (www.turingforce.ai):**
   - **Type:** CNAME  
   - **Name:** www
   - **Value:** [Same Amplify value as above]
   - **TTL:** 600

3. **Remove Conflicting Records:**
   - Delete any existing A records for `@` and `www`
   - Keep only the CNAME records you just added

#### Step 3: SSL Certificate (Automatic)

- Amplify automatically provisions SSL certificates via AWS Certificate Manager
- Your site will be available at both:
  - `https://turingforce.ai`
  - `https://www.turingforce.ai`

#### Step 4: Verify Domain Connection

1. **Wait for DNS Propagation:** 5-60 minutes
2. **Check Status in Amplify:** Should show "Available"
3. **Test Your Domain:** Visit `https://turingforce.ai`

#### GoDaddy-Specific Notes:

- **CNAME for Root Domain:** GoDaddy supports CNAME for root domains (unlike some other providers)
- **DNS Propagation:** GoDaddy typically propagates changes within 15-30 minutes
- **Backup Plan:** If CNAME doesn't work, use A records with Amplify's IP addresses

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

4. **Domain Not Working (turingforce.ai):**
   - **DNS Not Propagated:** Wait 15-60 minutes after GoDaddy changes
   - **Wrong CNAME Value:** Double-check the Amplify-provided CNAME value
   - **Conflicting Records:** Remove old A records in GoDaddy
   - **GoDaddy Caching:** Clear GoDaddy DNS cache or wait longer
   - **Test DNS:** Use `nslookup turingforce.ai` to verify DNS resolution

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
   - Visit your Amplify URL: `https://[app-id].amplifyapp.com`
   - Test your custom domain: `https://turingforce.ai`
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
