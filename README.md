# Restaurant App 🍽️

A full-featured restaurant web application built with React, where customers can browse the menu, view meal details, and make table reservations, while admins manage meals, categories, and bookings through a dedicated dashboard.

## Features

### Customer

- Browse the full menu, filtered by category
- View detailed meal pages (description, ingredients, price, related meals)
- Book a table reservation
- View and cancel personal bookings (up to 24 hours before the reservation)
- User authentication (login / register)

### Admin

- Manage menu items (create, edit, delete) with image upload
- Manage categories (create, rename, delete)
- Manage bookings (view details, confirm, cancel, delete) with search and pagination by status

## Tech Stack

| Category                | Technology           |
| ----------------------- | -------------------- |
| Framework               | React (Vite)         |
| Styling                 | Tailwind CSS         |
| UI Components           | Flowbite React       |
| Data Fetching & Caching | TanStack React Query |
| Forms & Validation      | Formik + Yup         |
| HTTP Client             | Axios                |
| Notifications           | React Toastify       |
| Routing                 | React Router         |
| SEO / Meta Tags         | React Helmet         |

## Project Structure

```
src/
├── components/
│   ├── Shared/
│   │   ├── hooks/            # Shared read-only hooks (useMenu, useCategories)
│   │   ├── header/
│   │   ├── LoaderSpinner/
│   │   └── utils/
│   │
│   ├── menu/                 # Public menu page
│   ├── meal/                 # Meal card component
│   ├── CardDetails/           # Meal details page
│   ├── MyBooking/             # Customer's bookings page
│   │
│   ├── MenuAdmin/             # Admin: manage meals
│   │   ├── hooks/
│   │   └── FormAddMeal/
│   ├── MangeCategories/       # Admin: manage categories
│   │   └── hooks/
│   ├── BookingsAdmin/         # Admin: manage bookings
│   │   └── hooks/
│   ├── BookingDetailsModel/
│   │
│   ├── Protect-route/         # Route protection (auth required)
│   ├── ProtectRouteFromAdmin/
│   ├── ProtectRoteLogged/
│   └── NavBar/
│
├── App.jsx
└── main.jsx
```

## Demo Admin Account

For testing purposes, you can log in to the admin dashboard using:

```
Email:basmala@gmail.com
Password: P@ssw0rd
```

> ⚠️ Replace these with your actual test credentials before sharing this README, or remove this section entirely for production.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/aya-adel-eid/Restaurant_React.git
cd Restaurant_React

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-api-url.com/api
```

### Run the app

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

## Data Fetching Pattern

This project follows a shared-hooks pattern to avoid duplicated API logic:

- **Read hooks** (e.g. `useMenu`, `useCategories`) live in `Shared/hooks/` and are used anywhere the data is needed (customer pages, admin pages).
- **Mutation hooks** (e.g. `useMenuAdmin`, `useCategoriesAdmin`, `useBookingsAdmin`) live inside their feature folder and handle create/update/delete operations, since they are only needed in the admin panel.
- All hooks sharing the same `queryKey` automatically stay in sync via React Query's cache — an admin action (like deleting a meal) is instantly reflected on the customer-facing pages without extra code.

## Author

Aya Adel Eid

## License

This project is for educational purposes.
