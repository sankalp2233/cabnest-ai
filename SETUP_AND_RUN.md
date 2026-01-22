# CabNest AI - Setup and Run Guide

## 🎉 Current Status

✅ **Frontend is RUNNING** at http://localhost:3000
✅ **Backend API integration is READY**
✅ **Axios installed** for API communication
⚠️ **Backend needs to be started**

## 📋 Prerequisites

### Already Installed ✅
- ✅ Node.js and npm
- ✅ Java 23.0.2

### Need to Install ⚠️
- ⚠️ **Apache Maven** (for running the Spring Boot backend)
- ⚠️ **MySQL Server** (for database)

## 🚀 Quick Start

### Option 1: Frontend Only (Current State)
The frontend is already running at http://localhost:3000. You can view the UI, but booking functionality won't work without the backend.

### Option 2: Full Stack (Recommended)

#### Step 1: Install Maven
1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to a folder (e.g., `C:\Program Files\Apache\maven`)
3. Add Maven's `bin` folder to your PATH environment variable
4. Verify installation: `mvn -version`

#### Step 2: Install MySQL
1. Download MySQL from: https://dev.mysql.com/downloads/installer/
2. Install MySQL Server
3. During installation, set root password to `root` (or update `backend/src/main/resources/application.properties`)
4. Start MySQL service

#### Step 3: Start Backend
```powershell
cd "C:\Users\ksank\OneDrive\Desktop\CabNest AI\backend"
mvn spring-boot:run
```

The backend will start on http://localhost:8080

#### Step 4: Frontend is Already Running
Frontend is running at http://localhost:3000

## 🔧 Configuration

### Backend Configuration
File: `backend/src/main/resources/application.properties`

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/cabnest?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

**Note:** Update the database password if you used a different password during MySQL installation.

### Frontend Configuration
File: `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 📡 API Endpoints

The backend provides the following endpoints:

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Rides
- `POST /rides/book` - Book a new ride
- `GET /rides/user/{userId}` - Get all rides for a user

## 🎯 Testing the Integration

1. Open http://localhost:3000 in your browser
2. Fill in the booking widget:
   - Enter a pickup location (e.g., "Downtown")
   - Enter a destination (e.g., "Airport")
3. Click "Request Now"
4. If backend is running, you'll see a success message with the fare
5. If backend is not running, you'll see an error message

## 🗂️ Project Structure

```
CabNest AI/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/cabnest/
│   │       │       ├── controller/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       └── service/
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── src/                     # Next.js frontend
│   ├── app/
│   ├── components/
│   │   ├── BookingWidget.jsx  # ✨ Connected to backend
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── lib/
│       └── api.js           # ✨ API service layer
├── .env.local               # ✨ Environment variables
└── package.json

✨ = Recently updated/created for backend integration
```

## 🔍 Troubleshooting

### Frontend Issues
- **Port 3000 already in use**: Kill the process or use a different port
- **Module not found**: Run `npm install`

### Backend Issues
- **Maven not found**: Install Maven and add to PATH
- **MySQL connection error**: 
  - Ensure MySQL is running
  - Check username/password in `application.properties`
  - Verify MySQL is running on port 3306
- **Port 8080 already in use**: Change port in `application.properties`

### API Connection Issues
- **CORS errors**: Backend already has CORS configured for localhost:3000
- **Network errors**: Ensure backend is running on port 8080

## 📝 Next Steps

1. **Install Maven and MySQL** (if not already installed)
2. **Start the backend** using the commands above
3. **Test the booking functionality** on the frontend
4. **Optional**: Create user authentication flow
5. **Optional**: Add more features like ride history, user profile, etc.

## 🎨 Features Implemented

✅ Modern Uber-inspired UI design
✅ Booking widget with pickup/destination inputs
✅ API integration with axios
✅ Error handling and loading states
✅ Success/error messages
✅ Backend REST API with Spring Boot
✅ MySQL database integration
✅ CORS configuration

## 💡 Development Tips

- Frontend hot-reloads automatically when you make changes
- Backend requires restart after code changes (unless using Spring DevTools)
- Check browser console for frontend errors
- Check backend terminal for API errors
- Use browser DevTools Network tab to debug API calls

---

**Happy Coding! 🚀**
