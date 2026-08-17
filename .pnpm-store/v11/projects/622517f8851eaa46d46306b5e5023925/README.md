# Recipe Finder App

A modern React-based web application for discovering, viewing, and managing recipes. Users can search for recipes, view detailed information, add favorites to a shopping cart-like feature, and manage their selections with support for multiple additions and removals.

## Features

- **Recipe Search**: Search for recipes by name using an integrated API.
- **Recipe Details**: View comprehensive details including ingredients, instructions, and images.
- **Cart Management**: Add recipes to a cart (supports adding the same recipe multiple times with quantity tracking), view cart contents, and remove items incrementally.
- **Responsive Design**: Built with Tailwind CSS for a clean, mobile-friendly interface.
- **Local Storage**: Cart items persist across sessions using localStorage.
- **Favorites Indicator**: Visual feedback for items already in the cart.

## Technologies Used

- **Frontend**: React (with Hooks and Context API for state management)
- **Build Tool**: Vite (for fast development and hot module replacement)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **API**: TheMealDB API for recipe data
- **Linting**: ESLint

## Prerequisites

- Node.js (version 18 or higher)
- npm (or yarn/pnpm)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd recipe-finder-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

1. **Searching Recipes**: Use the search input in the header to find recipes by name. Results are displayed as cards with basic info.
2. **Viewing Details**: Click on a recipe card to view full details, including ingredients and instructions.
3. **Adding to Cart**: On a recipe card, click the heart icon to add the recipe to your cart. You can add the same recipe multiple times; quantity will increment.
4. **Managing Cart**: Click the cart icon in the header to navigate to `/cart`. View items with quantities and use the "Remove One" button to decrement quantity (item is removed when quantity reaches 0).
5. **Cart Badge**: The cart icon shows the total number of items (sum of quantities).

## Project Structure

```
recipe-finder-app/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components (Cart, RecipeCard, etc.)
│   ├── assets/      # Images and static files
│   ├── App.jsx      # Main App component
│   └── main.jsx     # Entry point
├── package.json     # Dependencies and scripts
├── tailwind.config.js # Tailwind configuration
├── vite.config.js   # Vite configuration
└── README.md        # This file
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## API Integration

The app fetches recipe data from [TheMealDB API](https://www.themealdb.com/api.php). No API key is required.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is open-source and available under the MIT License.

## Contact

For questions or issues, open an issue on the repository or contact the developer.
