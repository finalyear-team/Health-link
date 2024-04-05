import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
      <div className="max-w-6xl overflow-hidden mx-auto px-4">
      {/* <Image src='/bg.jpg' alt='bg_image' fill className='z--10'/> */}

        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Website
          </h1>
          <p className="text-lg text-gray-600">
            A brief description of what your website is about.
          </p>
        </header>

        {/* Your main content section */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:flex items-center justify-center">
            {/* <img
              className="max-w-lg mx-auto"
              src="your-image-url"
              alt="Your Image"
            /> */}
          </div>
          <div className="md:flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Feature Title
            </h2>
            <p className="text-lg text-gray-600">
              Description of your feature or service.
            </p>
          </div>
        </main>

        {/* Other sections or components */}

        <footer className="mt-16 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Your Website. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
