import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Projets', to: '/projets' },
  { label: 'Services', to: '/services' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Journal', to: '/journal' },
]

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white text-[13px] font-extrabold tracking-tight leading-none">
        Ext
      </span>
      <span className="text-xl font-bold text-ink">
        Excellence<span className="text-primary">.</span>
      </span>
    </NavLink>
  )
}

function DesktopLink({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `border-b-2 pb-0.5 text-[15px] font-medium transition-colors hover:text-primary ${
          isActive ? 'border-primary text-primary' : 'border-transparent text-ink'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="mx-auto max-w-[77.5rem] px-6 pt-6">
      <nav className="relative flex items-center justify-between rounded-full bg-white py-3 pr-3 pl-6 shadow-soft">
        <Logo />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <DesktopLink to={link.to} label={link.label} />
            </li>
          ))}
        </ul>

        <NavLink
          to="/contact"
          className="hidden rounded-full bg-ink px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary lg:block"
        >
          Nous contacter
        </NavLink>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-full bg-ink text-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mt-3 rounded-3xl bg-white p-6 shadow-soft lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-semibold transition-colors ${
                      isActive ? 'text-primary' : 'text-ink hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white"
              >
                Nous contacter
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
