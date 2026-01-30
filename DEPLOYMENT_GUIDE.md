# 🚀 Deployment Guide - Vercel & MongoDB Atlas

This guide walks you through deploying the FoodHub application to production using Vercel and MongoDB Atlas.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

## Part 1: Set Up MongoDB Atlas

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with Google, email, or GitHub

### Step 2: Create a Cluster

1. After signing in, click "Build a Database"
2. Choose the **FREE M0** tier
3. Select a cloud provider and region (choose closest to your users)
4. Name your cluster (or use default)
5. Click "Create Cluster" (takes 1-3 minutes)

### Step 3: Create a Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., `foodhub-app`)
5. Click "Autogenerate Secure Password" and **SAVE THIS PASSWORD**
6. Under "Database User Privileges", select "Read and write to any database"
7. Click "Add User"

### Step 4: Allow Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note:** For production, restrict to Vercel IPs
4. Click "Confirm"

### Step 5: Get Your Connection String

1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select Driver: "Node.js" and Version: "6.7 or later"
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add the database name before the `?`:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/food-delivery?retryWrites=true&w=majority
   ```

**Save this connection string - you'll need it for Vercel!**

## Part 2: Prepare Your Code for Deployment

### Step 1: Push to GitHub

If you haven't already:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - FoodHub application"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/foodhub-app.git
git branch -M main
git push -u origin main
```

### Step 2: Verify Environment Variables

Make sure your `.gitignore` includes `.env.local` so secrets aren't committed:

```
.env*.local
```

## Part 3: Deploy to Vercel

### Step 1: Sign Up / Log In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" (or "Log In")
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Find your GitHub repository (foodhub-app)
3. Click "Import"

### Step 3: Configure Project

1. **Framework Preset:** Next.js (should be auto-detected)
2. **Root Directory:** ./ (leave as is)
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** `.next` (default)

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

**Variable:** `MONGODB_URI`
**Value:** Your MongoDB Atlas connection string
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/food-delivery?retryWrites=true&w=majority
```

**Variable:** `NEXT_PUBLIC_API_URL`
**Value:** (Leave empty for now, we'll update after first deployment)

### Step 5: Deploy

1. Click "Deploy"
2. Wait 1-3 minutes for the build to complete
3. Once complete, you'll see "Congratulations!"

### Step 6: Update API URL

1. Copy your deployment URL (e.g., `https://foodhub-app.vercel.app`)
2. Go to your project → Settings → Environment Variables
3. Edit `NEXT_PUBLIC_API_URL`
4. Set it to your deployment URL: `https://foodhub-app.vercel.app`
5. Click "Save"
6. Redeploy: Go to "Deployments" → Click "..." on latest → "Redeploy"

### Step 7: Seed the Production Database

Once deployed, seed your production database:

```bash
curl -X POST https://your-app-url.vercel.app/api/seed
```

Or use your browser's console:
```javascript
fetch('https://your-app-url.vercel.app/api/seed', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data));
```

## Part 4: Verify Deployment

### Test Your Application

1. Open your Vercel URL in a browser
2. Verify the menu loads (shows 12 items)
3. Test adding items to cart
4. Test checkout process
5. Test order tracking
6. Check order history

### Monitor Your Application

**Vercel Dashboard:**
- View deployment logs
- Monitor build times
- Check error logs
- View analytics

**MongoDB Atlas:**
- Monitor database usage
- View collections
- Check query performance

## Part 5: Set Up Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update feature X"
git push

# Vercel will automatically build and deploy!
```

## Part 6: Custom Domain (Optional)

### Add Your Domain

1. In Vercel project, go to "Settings" → "Domains"
2. Enter your domain name
3. Follow DNS configuration instructions
4. Wait for DNS propagation (a few minutes to 48 hours)

### Update Environment Variables

Update `NEXT_PUBLIC_API_URL` to your custom domain.

## Troubleshooting

### Build Fails

**Error:** Module not found

**Solution:**
- Check `package.json` has all dependencies
- Verify import paths use `@/` alias correctly
- Check for typos in imports

### Database Connection Fails

**Error:** MongoServerError: Authentication failed

**Solution:**
- Verify username and password in connection string
- Check special characters are URL-encoded
- Ensure database user has correct permissions

### Application Loads but No Menu

**Error:** Empty menu on production

**Solution:**
- Run the seed endpoint: `POST /api/seed`
- Check MongoDB Atlas → Collections to verify data
- Check Vercel deployment logs for errors

### Environment Variables Not Working

**Error:** API calls failing

**Solution:**
- Verify variables are set in Vercel project settings
- Redeploy after adding/changing variables
- Check variable names match exactly (case-sensitive)
- Don't include quotes in the values

## Security Best Practices

### Production Checklist

- [ ] Use MongoDB Atlas IP whitelist (add Vercel IPs)
- [ ] Use strong database passwords
- [ ] Don't commit `.env.local` to git
- [ ] Use Vercel environment variables for secrets
- [ ] Enable MongoDB Atlas backup
- [ ] Monitor error logs regularly
- [ ] Set up alerts in MongoDB Atlas

### Vercel IPs for MongoDB Whitelist

Instead of 0.0.0.0/0, use Vercel's IP ranges (check Vercel docs for current list).

## Cost Considerations

### Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited deployments
- Hobby projects only

**MongoDB Atlas Free (M0):**
- 512 MB storage
- Shared RAM
- Shared vCPU
- Perfect for development/demos

### When to Upgrade

- High traffic (>100GB/month)
- Need more storage (>512MB)
- Need better performance
- Commercial use
- Need priority support

## Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Check error logs in Vercel
- Monitor database usage in Atlas
- Test critical user flows

**Monthly:**
- Review analytics
- Check for dependency updates
- Review and optimize slow queries

**As Needed:**
- Update dependencies: `npm update`
- Deploy security patches
- Add new features

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check MongoDB Atlas metrics
3. Review error messages carefully
4. Check this guide's troubleshooting section
5. Search Vercel and MongoDB Atlas forums

---

## Quick Reference

### Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Your App:** https://your-app.vercel.app

### Key Commands

```bash
# Local development
npm run dev

# Build locally
npm run build

# Start production build locally
npm start

# Deploy (automatic on push)
git push

# Seed production database
curl -X POST https://your-app.vercel.app/api/seed
```

### Environment Variables

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/food-delivery
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

---

**Congratulations! Your FoodHub app is now live! 🎉**
