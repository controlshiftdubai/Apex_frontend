"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Your accent palette
const ACCENTS = [
  "#a7f3d0", // emerald-200
  "#bfdbfe", // blue-200
  "#c7d2fe", // indigo-200
  "#fca5a5", // red-300
  "#fde68a", // yellow-300
];

/** Reusable heading with pastel background stripe behind the text */
function HeadingStripe({
  children,
  color,
  className = "",
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <h3 className={`text-2xl sm:text-3xl text-neutral-900 ${className}`}>
      <span className="relative inline-block align-baseline">
        <span className="relative z-10 px-0.5">{children}</span>
        {/* stripe behind text (same vibe as previous pages) */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-1 h-3 rounded-md"
          style={{ backgroundColor: color }}
        />
      </span>
    </h3>
  );
}

export default function ProjectsShowcase() {
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-[1220px] mx-auto px-6">
        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT */}
          <div className="space-y-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <h3 className="text-2xl mt-4 sm:text-3xl text-neutral-900">
                Join Us</h3>
              <p className="mt-2 text-[15px] sm:text-base lg:text-lg leading-7 text-neutral-600">
                Grow with our team and shape the future with us.
              </p>
              <EmailLink href="mailto:careers@apex.com" color={ACCENTS[0]}>
                careers@apex.com
              </EmailLink>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <p className="mt-4  text-[15px] sm:text-base lg:text-lg leading-7 text-neutral-600">
                Collaborate with us to bring your ideas to life.
              </p>
              {/* fixed: ACCENTS[5] would be out of range */}
              <EmailLink href="mailto:enquiries@apex.com" color={ACCENTS[1]}>
                enquiries@apex.com
              </EmailLink>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="space-y-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >
              <p className="text-xl sm:text-2xl lg:text-xl font-medium text-neutral-800 leading-tight">
                We’re Always Open To Opportunities
                <br className="hidden sm:block" /> For Collaboration.
              </p>

              {/* Socials — border and hover background use the SAME accent */}
              <div className="mt-6 flex items-center gap-3 sm:gap-4">
                <Social
                  href="https://instagram.com"
                  aria="Instagram"
                  iconSrc="https://d33609liqwio9r.cloudfront.net/2025-09-25T14:19:04.166Z-1.png"
                  color={ACCENTS[0]}
                />
                <Social
                  href="https://linkedin.com"
                  aria="LinkedIn"
                  iconSrc="https://d33609liqwio9r.cloudfront.net/2025-09-25T14:20:24.970Z-2.png"
                  color={ACCENTS[1]}
                />
                <Social
                  href="https://behance.net"
                  aria="Behance"
                  iconSrc="https://d33609liqwio9r.cloudfront.net/2025-09-25T14:20:56.025Z-3.png"
                  color={ACCENTS[2]}
                />
                <Social
                  href="https://pinterest.com"
                  aria="Pinterest"
                  iconSrc="https://d33609liqwio9r.cloudfront.net/2025-09-25T14:22:40.504Z-4.png"
                  color={ACCENTS[3]}
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
            >


              <h3 className="text-2xl sm:text-3xl text-neutral-900">Publish our work</h3>
              <p className="mt-2 text-[15px] sm:text-base lg:text-lg leading-7 text-neutral-600">
                For media, features, and press enquiries.
              </p>
              <EmailLink href="mailto:press@apex.com" color={ACCENTS[4]}>
                press@apex.com
              </EmailLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI helpers ---------------- */

function EmailLink({
  href,
  children,
  color,
}: {
  href: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <Link
      href={href}
      style={{ ["--accent" as any]: color }}
      className="mt-4 inline-block text-lg sm:text-xl font-medium text-neutral-900
                 underline decoration-[3px] underline-offset-[6px]
                 decoration-[var(--accent)] hover:decoration-[var(--accent)] transition"
    >
      {children}
    </Link>
  );
}

function Social({
  href,
  aria,
  iconSrc,
  color,
}: {
  href: string;
  aria: string;
  iconSrc: string; // URL to your PNG/SVG icon
  color: string;
}) {
  return (
    <Link
      href={href}
      aria-label={aria}
      style={{ ["--accent" as any]: color }}
      className="group p-2.5 rounded-full border transition
                 border-[var(--accent)] hover:bg-[var(--accent)] hover:text-neutral-900"
      title={aria}
    >
      <img
        src={iconSrc}
        alt={aria}
        width={27}
        height={27}
        className="w-[27px] h-[27px] object-contain"
        loading="lazy"
      />
    </Link>
  );
}
