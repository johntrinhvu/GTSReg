export default function Header() {
  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-2 bg-[#003366] text-white">
        <div className="flex">
          <div className="text-5xl font-bold mr-2">UCI</div>
          <div className="flex flex-col">
            <h1>University</h1>
            <h1 className="-ml-1.5">Registrar</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-sm">Search Registrar site:</label>
          <input id="search" className="px-2 py-1 border rounded text-black" />
          <button className="bg-yellow-400 px-3 py-1 rounded">GO»</button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex bg-yellow-300 text-black font-semibold text-sm px-6 py-1 justify-around">
        <span>UCI Home</span>
        <span>:</span>
        <span>Schedule of Classes</span>
        <span>:</span>
        <span>StudentAccess</span>
        <span>:</span>
        <span>WebAdmin</span>
      </div>
    </>
  );
}