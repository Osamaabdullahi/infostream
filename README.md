
---

# InfoStream

InfoStream is a web application that provides users with the latest news from various categories using **The Guardian API**. It also features user authentication for sign-in and sign-out, managed via a **Django** backend.

## Live Demo

You can visit the live site here: [InfoStream](https://infostream-one.vercel.app/)

## Features

- **News Feeds**: Fetches and displays the latest articles from various categories, such as technology, business, sports, and more.
- **Search Functionality**: Allows users to search for specific news articles.
- **User Authentication**: Sign-up, sign-in, and sign-out functionality using a Django backend.
- **Responsive Design**: The UI is responsive and adapts to different screen sizes.
- **Modern UI**: Built using Next.js and Tailwind CSS for fast, responsive, and clean UI.

## Technologies Used

### Frontend:
- **Next.js**: A React framework for building server-side rendering and static web applications.
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **The Guardian API**: Provides real-time news data.

### Backend:
- **Django**: A Python-based web framework that handles authentication (user sign-in, sign-out) and provides secure access to restricted areas of the app.
- **Django REST Framework (DRF)**: For creating REST APIs that handle user authentication.

## Installation and Setup

### Prerequisites:

- **Node.js**: Download and install Node.js [here](https://nodejs.org/).
- **Python**: Make sure Python is installed on your system. You can download it [here](https://www.python.org/downloads/).
- **Django**: Install Django by running `pip install django`.

### Clone the Repository

```bash
git clone https://github.com/Osamaabdullahi/infostream.git
cd infostream
```

### Install Frontend Dependencies

Navigate to the frontend directory:

```bash
cd frontend
npm install
```



### Environment Variables

Create a `.env.local` file in your frontend directory and add the following environment variables:

```bash
NEXT_PUBLIC_GUARDIAN_API_KEY=your_guardian_api_key
```

### Running the Application

#### Frontend:
In the `frontend` directory, start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.



### Deployment

InfoStream is deployed on **Vercel** for the frontend 

- **Frontend**: Deployed on Vercel. [Deploy on Vercel](https://vercel.com).

## API Reference

**The Guardian API** is used to fetch news articles. You will need to create an account and get your API key [here](https://open-platform.theguardian.com/access/).




## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

This README should give users and developers an overview of how the project works, how to set it up, and how they can contribute. Let me know if you need more details!
