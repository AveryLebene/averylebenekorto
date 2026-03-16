import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed right-0 flex shadow bg-transparent px-8 z-50 pt-10">
      <ul className="space-y-3">
        <li>
          <Link href="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/about" className="text-white">About</Link>
        </li>
        <li>
          <Link href="/projects" className="text-white">Projects</Link>
        </li>
        <li>
          <Link href="/contact" className="text-white">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;