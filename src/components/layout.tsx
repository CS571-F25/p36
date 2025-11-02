import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
