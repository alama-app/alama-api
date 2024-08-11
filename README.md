# Alama API

This is the API for Alama Applications, providing endpoints for managing business owners, businesses, foods, drinks, orders, and more. The API is built using Node.js, Express, MongoDB, and integrates with Cloudinary for image storage.

## Table of Contents
- [Installation](#installation)
  - [Using Docker](#using-docker)
  - [Without Docker](#without-docker)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [License](#license)

## Installation

### Using Docker

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/alama-api.git
    cd alama-api
    ```

2. **Create a `.env` file** in the root directory with the required environment variables (see [Environment Variables](#environment-variables)).

3. **Build and run the Docker container**:
    ```bash
    docker-compose up --build
    ```

4. The API will be available at `http://localhost:3000`.

### Without Docker

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/alama-api.git
    cd alama-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory with the required environment variables (see [Environment Variables](#environment-variables)).

4. **Start the server**:
    ```bash
    npm run server
    ```

5. The API will be available at `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root of your project with the following content:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/alama-db
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
