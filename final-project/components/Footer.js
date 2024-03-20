function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-[100px]">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Sanber Daily. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
