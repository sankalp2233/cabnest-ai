# 🚕 CabNest - Premium Cab Booking Platform

A modern, full-stack cab booking application with real-time ride management, driver registration, and secure authentication.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-cyan)

## ✨ Features

### 🔐 Authentication
- **Flexible Login**: Sign up/login with email OR phone number
- **Secure Passwords**: SHA-256 hashing
- **Real-time Validation**: Instant feedback on form inputs
- **Session Persistence**: Stay logged in across page refreshes

### 🚗 Ride Management
- **Multiple Ride Types**: Regular rides, courier service, advance reservations
- **Interactive Map**: Leaflet-powered map with custom markers
- **Dual Location Selection**: Separate pickup and drop-off markers
- **Ride History**: View all past bookings with status tracking

### 👨‍✈️ Driver Features
- **Driver Registration**: Complete onboarding form
- **Vehicle Management**: Add vehicle details and documents
- **Availability Tracking**: Real-time driver status

### 🎨 Modern UI/UX
- **Taxi Yellow Theme**: Professional branding (#FFC107)
- **Dark Mode Ready**: Charcoal black accents
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Micro-interactions and transitions
- **Premium Components**: Glass-morphism effects and shadows

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.3 (React 19)
- **Styling**: Tailwind CSS 4.1
- **Maps**: React-Leaflet
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot 3.2.1
- **Language**: Java 17
- **Database**: MySQL 8.0
- **ORM**: Hibernate (JPA)
- **Build Tool**: Maven

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cabnest-ai.git
   cd cabnest-ai
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Configure database**
   - Create MySQL database: `cabnest`
   - Update `backend/src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/cabnest
     spring.datasource.username=root
     spring.datasource.password=YOUR_PASSWORD
     ```

4. **Run the application**
   ```bash
   npm run dev:all
   ```

   This starts both frontend (port 3000) and backend (port 8080)

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## 📁 Project Structure

```
cabnest-ai/
├── src/                      # Next.js frontend
│   ├── app/                  # App router pages
│   │   ├── page.jsx         # Home/Dashboard
│   │   ├── login/           # Login page
│   │   ├── signup/          # Signup page
│   │   ├── rides/           # Ride history
│   │   ├── drive/           # Driver registration
│   │   ├── safety/          # Safety information
│   │   └── help/            # Help center
│   ├── components/          # React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── BookingWidget.jsx
│   │   ├── MapComponent.jsx
│   │   └── RideHistory.jsx
│   ├── context/             # React context
│   │   └── AuthContext.js
│   ├── lib/                 # Utilities
│   │   └── api.js          # API client
│   └── utils/               # Helper functions
│       └── validation.js    # Form validation
├── backend/                 # Spring Boot backend
│   └── src/main/java/com/cabnest/
│       ├── controller/      # REST controllers
│       ├── entity/          # JPA entities
│       ├── repository/      # Data repositories
│       └── service/         # Business logic
├── public/                  # Static assets
└── package.json            # Dependencies

```

## 🔑 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cabnest
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 📱 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Rides
- `POST /rides/book` - Book a new ride
- `GET /rides/user/{userId}` - Get user's ride history

### Drivers
- `POST /drivers/register` - Register as driver
- `GET /drivers/available` - Get available drivers

## 🎨 Design System

### Colors
- **Primary**: Taxi Yellow (#FFC107)
- **Secondary**: Charcoal Black (#2C2C2C)
- **Accent**: White (#FFFFFF)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Body**: Normal weight

## 🧪 Testing

### Manual Testing Checklist
- [ ] Sign up with email
- [ ] Sign up with phone number
- [ ] Login with email
- [ ] Login with phone
- [ ] Book a ride
- [ ] View ride history
- [ ] Register as driver
- [ ] Map marker placement
- [ ] Session persistence

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to:
- GitHub
- Vercel (Frontend)
- Railway/Render (Backend)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Spring Boot for robust backend
- Leaflet for interactive maps
- Tailwind CSS for utility-first styling

---

Made with ❤️ and ☕
