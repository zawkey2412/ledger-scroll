const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Welcome to My Home Page</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <p className="text-lg text-gray-700 mb-4">
          This is a simple and responsive home page using Tailwind CSS.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Get Started
        </button>
      </main>
      <footer className="w-full bg-gray-800 p-4 text-white text-center">
        <p>&copy; 2023 My Website</p>
      </footer>
    </div>
  );
};

export default Home;
