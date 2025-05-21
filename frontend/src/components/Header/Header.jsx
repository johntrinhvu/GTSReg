export default function Header() {
  return (
    <div>
    <div className="bg-blue-400 flex justify-between p-4">
      <div className="flex text-white">
        <h1 className="pr-4 text-5xl font-bold">UCI</h1>
        <div>
          <h2 className="pl-1">University</h2>
          <h2>Registrar</h2>
        </div>
      </div>
      <div className="text-white">
       <h1>Search</h1>
      </div>
    </div>
    <div className="bg-yellow-400">
      <div className="flex justify-between px-4">
        <div className="font-bold flex space-x-4">
          <h1>UCI Home</h1>
          <h1>:</h1>
          <h1>Schedule of Classes</h1>
        </div>
        <div className="font-bold flex space-x-5">
          <h1>StudentAccess</h1>
          <h1>:</h1>
          <h1>WebAdmin</h1>
        </div>
      </div>
    </div>
    </div>
  );
};
