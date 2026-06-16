import LocaleSwitcher from "@/components/locale-switcher";
import ThemeSwitcher from "@/components/theme-switcher";


export default function Header() {
  return (
    <div className="daisy-navbar bg-base-100 shadow-sm">
      <div className="daisy-navbar-start">
        <div className="daisy-dropdown">
          <div tabIndex={0} role="button" className="daisy-btn daisy-btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="daisy-dropdown-content daisy-menu z-1 mt-3 w-52 daisy-menu-sm rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="daisy-btn text-xl daisy-btn-ghost">daisyUI</a>
      </div>
      <div className="daisy-navbar-center hidden lg:flex">
        <ul className="daisy-menu daisy-menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="z-1 w-40 bg-base-100 p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="daisy-navbar-end">
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
