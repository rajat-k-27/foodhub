# 🚀 Quick Setup Guide

This guide will help you get the FoodHub application up and running in minutes.

## Step 1: Install MongoDB

### Option A: Local MongoDB (Recommended for Development)

**Windows:**
1. Download MongoDB Community Server from [mongodb.com/download-center/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service
5. MongoDB will start automatically

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud - Free Tier Available)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Sandbox - Free)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string

## Step 2: Verify MongoDB is Running

**Test local MongoDB:**
```bash
# Windows (PowerShell)
mongosh

# macOS/Linux
mongosh
```

You should see a MongoDB shell prompt. Type `exit` to quit.

## Step 3: Navigate to Project Directory

```bash
cd d:\Projects-web\raftlab_assignment\food-delivery-app
```

## Step 4: Install Node.js Dependencies

```bash
npm install
```

This will install all required packages including Next.js, MongoDB driver, testing libraries, etc.

## Step 5: Configure Environment Variables

The `.env.local` file should already exist with these values:

```env
MONGODB_URI=mongodb://localhost:27017/food-delivery
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**If using MongoDB Atlas**, update the file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/food-delivery?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

## Step 6: Start the Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000

 ✓ Ready in 2.3s
```

## Step 7: Seed the Database

Open a new terminal/PowerShell window and run:

```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST
```

Or using curl:
```bash
curl -X POST http://localhost:3000/api/seed
```

You should see a response indicating 12 menu items were created.

## Step 8: Open the Application

Open your browser and go to:
```
http://localhost:3000
```

You should see the FoodHub homepage with menu items!

## 🎉 Success!

If you can see the menu items, you're all set! Try:

1. **Browse the menu** - Use category filters and search
2. **Add items to cart** - Click "Add to Cart" on any item
3. **View cart** - Click the cart icon in the navigation
4. **Place an order** - Click "Proceed to Checkout" and fill in your details
5. **Track your order** - Watch the status update in real-time

## 🧪 Run Tests

```bash
npm test
```

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
- Make sure MongoDB is running
- Windows: Check Windows Services for "MongoDB Server"
- macOS/Linux: Run `sudo systemctl status mongod`

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
- Stop the process using port 3000
- Or use a different port: `npm run dev -- -p 3001`

### Seed Command Not Working

**Error:** Seed endpoint not responding

**Solution:**
- Make sure the dev server is running first
- Wait a few seconds for Next.js to compile
- Try accessing `http://localhost:3000` in browser first
- Then run the seed command again

### Module Not Found Errors

**Error:** `Cannot find module '@/...'`

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Test Errors

**Error:** Tests failing with module errors

**Solution:**
- Tests are configured for the environment
- Make sure all dependencies are installed
- The API tests are documentation-based and should pass

## 📝 Next Steps

1. **Explore the Code**
   - Check out the component structure
   - Review the API routes
   - Look at the database models

2. **Customize**
   - Add more menu items via the API
   - Modify the color scheme in components
   - Add new features

3. **Deploy**
   - Follow the deployment guide in README.md
   - Set up MongoDB Atlas for production
   - Deploy to Vercel

## 🆘 Still Having Issues?

Common solutions:
1. Restart your terminal/command prompt
2. Make sure you're in the correct directory
3. Check Node.js version: `node --version` (should be 18+)
4. Check npm version: `npm --version`
5. Clear Next.js cache: `rm -rf .next`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

---

**Happy Coding! 🚀**
