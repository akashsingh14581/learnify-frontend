import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/logo.png"
import { FaLinkedinIn, FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6'

const footerLinks = [
  {
    title: "Subjects",
    links: [
      { label: "AI & Machine Learning", path: "/catalog/machine-learning" },
      { label: "Web Development",       path: "/catalog/web-development"  },
      { label: "App Development",       path: "/catalog/app-development"  },
      { label: "Data Science",          path: "/catalog/data-science"     },
      { label: "Cloud Computing",       path: "/catalog/cloud-computing"  },
      { label: "Cybersecurity",         path: "/catalog/cybersecurity"    },
      { label: "UI/UX Design",          path: "/catalog/ui-ux-design"     },
    ],
  },
  {
    title: "Languages",
    links: [
      { label: "Python",     path: "/catalog/python"     },
      { label: "JavaScript", path: "/catalog/javascript" },
      { label: "Java",       path: "/catalog/java"       },
      { label: "C++",        path: "/catalog/cpp"        },
      { label: "Go",         path: "/catalog/golang"     },
      { label: "Rust",       path: "/catalog/rust"       },
      { label: "TypeScript", path: "/catalog/typescript" },
    ],
  },
  {
    title: "Career Building",
    links: [
      { label: "Career Paths",    path: "/career-paths"    },
      { label: "Interview Prep",  path: "/interview-prep"  },
      { label: "Resume Builder",  path: "/resume-builder"  },
      { label: "Mock Interviews", path: "/mock-interviews" },
      { label: "Job Board",       path: "/jobs"            },
      { label: "Mentorship",      path: "/mentorship"      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",          path: "/about"      },
      { label: "Careers",           path: "/careers"    },
      { label: "Blog",              path: "/blog"       },
      { label: "Press",             path: "/press"      },
      { label: "Contact Us",        path: "/contact"    },
      { label: "Become Instructor", path: "/instructor" },
    ],
  },
]

const socialLinks = [
  { icon: <FaLinkedinIn />, href: "https://linkedin.com",  label: "LinkedIn"  },
  { icon: <FaXTwitter   />, href: "https://twitter.com",   label: "Twitter"   },
  { icon: <FaYoutube    />, href: "https://youtube.com",   label: "YouTube"   },
  { icon: <FaInstagram  />, href: "https://instagram.com", label: "Instagram" },
]

function Footer() {
  return (
    <footer className="bg-richblack-800 text-richblack-400">

      {/* Top Grid */}
      <div className="w-11/12 max-w-[1200px] mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,_1fr)] gap-8">

        {/* Brand Column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/">
            <img src={logo} alt="CodeElevator" width={160} loading="lazy" className="mb-4" />
          </Link>
          <p className="text-sm text-richblack-400 leading-relaxed max-w-[220px]">
            Empowering learners worldwide with high-quality education. Build skills that matter, at your own pace.
          </p>

          {/* Social Icons */}
        <div className="flex gap-3 mt-5">
  {socialLinks.map(({ icon, href, label }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-md bg-richblack-700 border border-richblack-600 flex items-center justify-center text-richblack-300 hover:border-yellow-50 hover:text-yellow-50 transition-all"
    >
      {icon}
    </a>
  ))}
</div>
        </div>

        {/* Link Columns */}
        {footerLinks.map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-richblack-100 text-xs font-semibold uppercase tracking-widest mb-4">
              {title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {links.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-sm text-richblack-400 hover:text-yellow-50 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-richblack-700" />

      {/* Bottom Bar */}
      <div className="w-11/12 max-w-[1200px] mx-auto py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-richblack-500">
          © {new Date().getFullYear()} CodeElevator. All rights reserved. Made with ♥ in India.
        </p>
        <div className="flex flex-wrap gap-5">
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-xs text-richblack-500 hover:text-richblack-300 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer