# 🍕 FoodHub - Food Delivery App

A modern, full-stack food delivery application built with Next.js, MongoDB, and Tailwind CSS. Features real-time order tracking, shopping cart functionality, and a beautiful, responsive UI.

## 🚀 Features

### ✨ Core Features
- **Menu Display**: Browse a wide variety of food items with images, descriptions, and prices
- **Category Filtering**: Filter menu items by category (Pizza, Burger, Pasta, Dessert, Beverage, Appetizer)
- **Search Functionality**: Search for items by name or description
- **Shopping Cart**: Add items to cart, adjust quantities, and view cart total
- **Order Placement**: Complete checkout with customer details validation
- **Order Tracking**: Real-time order status updates with visual progress indicator
- **Order History**: View all past and current orders

### 🎨 UI/UX Features
- Modern, clean, and responsive design
- Smooth animations and transitions
- Mobile-first approach
- Gradient backgrounds and card-based layouts
- Real-time cart updates
- Visual order status timeline
- Loading states and error handling

### 🔧 Technical Features
- RESTful API endpoints
- MongoDB database integration
- Input validation on both client and server
- Real-time order status simulation
- Persistent cart storage (localStorage)
- Test-driven development with Jest
- Responsive design with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd food-delivery-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/food-delivery
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/food-delivery?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Start MongoDB (if using local installation)

```bash
# For Windows
mongod

# For macOS/Linux
sudo systemctl start mongod
```

### 5. Seed the Database

Start the development server:

```bash
npm run dev
```

Then make a POST request to seed the menu:

**Using PowerShell:**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/seed -Method POST
```

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/seed
```

### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
food-delivery-app/
├── app/
│   ├── api/
│   │   ├── menu/
│   │   │   └── route.js          # Menu API endpoints
│   │   ├── orders/
│   │   │   ├── [id]/
│   │   │   │   └── route.js      # Single order endpoints
│   │   │   ├── route.js          # Orders list endpoints
│   │   │   └── update-status/
│   │   │       └── route.js      # Status update simulation
│   │   └── seed/
│   │       └── route.js          # Database seeding
│   ├── checkout/
│   │   └── page.js               # Checkout page
│   ├── orders/
│   │   ├── [id]/
│   │   │   └── page.js           # Order detail page
│   │   └── page.js               # Orders list page
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page (menu)
│   └── globals.css               # Global styles
├── components/
│   ├── Cart.js                   # Shopping cart component
│   ├── MenuItem.js               # Menu item card component
│   └── Navbar.js                 # Navigation bar
├── context/
│   └── CartContext.js            # Cart state management
├── lib/
│   └── mongodb.js                # MongoDB connection
├── models/
│   ├── MenuItem.js               # Menu item schema
│   └── Order.js                  # Order schema
├── __tests__/
│   ├── api.test.js               # API tests
│   ├── CartContext.test.js       # Cart context tests
│   └── MenuItem.test.js          # Component tests
├── .env.local                    # Environment variables
├── jest.config.js                # Jest configuration
├── jest.setup.js                 # Jest setup
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🧪 Running Tests

The project includes comprehensive tests for components and API logic.

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage:
- Cart Context (state management)
- UI Components (MenuItem)
- API validation logic
- Input validation
- Error handling

## 🔌 API Endpoints

### Menu

#### Get All Menu Items
```http
GET /api/menu
```

Response:
```json
{
  "success": true,
  "data": [...]
}
```

#### Create Menu Item
```http
POST /api/menu
Content-Type: application/json

{
  "name": "Pizza Name",
  "description": "Description",
  "price": 12.99,
  "image": "url",
  "category": "Pizza"
}
```

### Orders

#### Get All Orders
```http
GET /api/orders
```

#### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "menuItemId": "item_id",
      "quantity": 2
    }
  ],
  "customerDetails": {
    "name": "John Doe",
    "address": "123 Main St",
    "phone": "+1234567890"
  }
}
```

#### Get Order by ID
```http
GET /api/orders/:id
```

#### Update Order Status
```http
PATCH /api/orders/:id
Content-Type: application/json

{
  "status": "Preparing"
}
```

Valid statuses: `Order Received`, `Preparing`, `Out for Delivery`, `Delivered`, `Cancelled`

### Seed Database
```http
POST /api/seed
```

### Simulate Status Updates
```http
POST /api/orders/update-status
```

## 🎯 Key Features Explanation

### Real-Time Order Tracking

The application simulates real-time order status updates through:

1. **Client-Side Polling**: The order detail page polls the API every 5 seconds to check for status updates
2. **Server-Side Simulation**: The `/api/orders/update-status` endpoint automatically progresses orders through statuses based on time elapsed
3. **Visual Timeline**: A beautiful progress indicator shows the current order status

Status progression:
- Order Received → Preparing (2 minutes)
- Preparing → Out for Delivery (5 minutes)
- Out for Delivery → Delivered (8 minutes)

### Shopping Cart

- Persistent storage using localStorage
- Add, remove, and update quantities
- Real-time total calculation
- Smooth sliding cart panel
- Visual cart badge on navigation

### Input Validation

Both client-side and server-side validation:
- Name: Required, max 100 characters
- Address: Required, max 500 characters
- Phone: Required, must be valid format
- Items: At least 1 item required
- Quantities: Must be positive integers

## 🎨 Design Decisions

### Architecture

**Tech Stack:**
- **Next.js 14+**: App Router for modern React features and server-side rendering
- **MongoDB**: Flexible document database for menu items and orders
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **React Context**: Global state management for shopping cart
- **Jest & React Testing Library**: Comprehensive testing setup

**Why These Choices:**
- Next.js provides excellent developer experience and production performance
- MongoDB's document model fits perfectly for varying menu items and order structures
- Tailwind CSS enables rapid, consistent UI development
- Context API is sufficient for this scale; no need for Redux complexity

### UI/UX Design

- **Modern Gradient Backgrounds**: Creates visual interest without clutter
- **Card-Based Layout**: Clean separation of content
- **Consistent Color Scheme**: Indigo/purple theme throughout
- **Mobile-First**: Responsive design works on all screen sizes
- **Visual Feedback**: Loading states, hover effects, and smooth transitions

### Database Schema

**MenuItem:**
- Simple, focused schema
- Category-based organization
- Availability flag for inventory management

**Order:**
- Embedded item details for historical accuracy
- Reference to MenuItem for current data
- Comprehensive customer details
- Status tracking with predefined values

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Configure Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   NEXT_PUBLIC_API_URL=your_vercel_url
   ```

4. Deploy!

Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to production

### Database Setup for Production

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to Vercel environment variables

## 🔐 Security Considerations

- Input validation on all user inputs
- Mongoose schema validation
- Error messages don't expose sensitive data
- Phone number format validation
- Maximum length checks on text fields

## 🎬 Demo Workflow

1. **Browse Menu**: View all food items, filter by category, search
2. **Add to Cart**: Select items and quantities
3. **Checkout**: Enter delivery details
4. **Place Order**: Order is created with unique order number
5. **Track Order**: Watch real-time status updates
6. **Order History**: View all past orders

## 📝 Testing Strategy

### Unit Tests
- Cart state management
- Component rendering
- Validation logic

### Integration Tests (Documented)
- API endpoint behavior
- Database operations
- Error handling

### Manual Testing
- Complete user flow
- Mobile responsiveness
- Browser compatibility

## 🤖 AI Tools Used

During development, AI tools were used for:
- **Code Generation**: Boilerplate code, component structures
- **Problem Solving**: Debugging complex state management issues
- **Testing**: Writing comprehensive test cases
- **Documentation**: README structure and API documentation
- **UI/UX Suggestions**: Color schemes, layout improvements

## 🐛 Known Limitations

- Order status simulation is time-based (not triggered by real kitchen/delivery actions)
- No payment integration (would be added in production)
- No user authentication (would be added for user-specific order history)
- Images from Unsplash (would use CDN in production)

## 🔮 Future Enhancements

- User authentication and profiles
- Payment gateway integration
- Restaurant management dashboard
- Push notifications for order updates
- Order rating and reviews
- Delivery driver tracking
- Multiple restaurant support
- Promo codes and discounts

## 📄 License

This project was created as an assessment and is for demonstration purposes.

## 👨‍💻 Author

Created as part of the Full Stack Developer Assessment

---

**Built with ❤️ using Next.js, MongoDB, and Tailwind CSS**
