"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  UtensilsCrossed,
  BellRing,
  LayoutDashboard,
  ArrowRight,
  Layers,
  ClipboardList,
  TrendingDown,
  Timer,
  QrCode,
  Radio,
  BarChart3,
  Settings2,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const GUEST_URL = process.env.NEXT_PUBLIC_GUEST_URL || "http://localhost:3000";
  const STAFF_URL = process.env.NEXT_PUBLIC_STAFF_URL || "http://localhost:5173";

  const apps = [
    {
      title: "Guest Menu",
      description:
        "Mobile-first ordering — guests scan, browse, and order without downloading anything.",
      icon: <UtensilsCrossed size={28} className="text-[#a3e635]" />,
      link: GUEST_URL,
      delay: 0.1,
    },
    {
      title: "Waiter Dashboard",
      description:
        "Real-time order queue with table status, instant notifications, and one-tap confirmations.",
      icon: <BellRing size={28} className="text-[#a3e635]" />,
      link: `${STAFF_URL}/waiter`,
      delay: 0.2,
    },
    {
      title: "Admin Panel",
      description:
        "Full CMS with live revenue tracking, menu control, and table occupancy monitoring.",
      icon: <LayoutDashboard size={28} className="text-[#a3e635]" />,
      link: `${STAFF_URL}/admin`,
      delay: 0.3,
    },
  ];

  const problems = [
    {
      icon: <Layers size={22} />,
      title: "Fragmented operations",
      text: "Orders get lost between guests, waitstaff, and the kitchen. Errors are costly and slow everything down.",
    },
    {
      icon: <ClipboardList size={22} />,
      title: "Outdated ordering",
      text: "Paper menus, handwritten orders, and verbal communication leave too much room for human error.",
    },
    {
      icon: <TrendingDown size={22} />,
      title: "Zero visibility",
      text: "Most owners run blind — no real-time data on what\u2019s selling, when it\u2019s busy, or where revenue is leaking.",
    },
    {
      icon: <Timer size={22} />,
      title: "Slow table turnaround",
      text: "Waiting for a waiter to take an order, return with the bill, and process payment adds unnecessary idle time.",
    },
  ];

  const features = [
    {
      icon: <QrCode size={20} className="text-[#a3e635]" />,
      text: "Guest QR ordering — scan, browse, order, and request the bill from the table",
    },
    {
      icon: <Radio size={20} className="text-[#a3e635]" />,
      text: "Waiter dashboard — live order queue, table status, and instant notifications",
    },
    {
      icon: <BarChart3 size={20} className="text-[#a3e635]" />,
      text: "Admin analytics — sales trends, peak hours, menu performance, and revenue insights",
    },
    {
      icon: <Settings2 size={20} className="text-[#a3e635]" />,
      text: "Menu management — update items, prices, and availability in real time",
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a3e635] selection:text-black">
        {/* ───── HERO ───── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a3e635]/5 blur-[140px] rounded-full pointer-events-none" />

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 max-w-3xl flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] to-teal-400">
                Resqro.
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              Running a restaurant is hard.
              <br />
              <span className="text-white font-medium">
                Managing it shouldn&apos;t be.
              </span>
            </p>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
              A restaurant operations platform that connects guests, waitstaff,
              and owners through a single QR code. One scan eliminates the
              friction between your kitchen and your customers.
            </p>
          </m.div>
        </section>

        {/* ───── LAUNCH APPS ───── */}
        <section className="relative px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-[#a3e635]/70 mb-8 text-center"
            >
              Explore the platform
            </m.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {apps.map((app, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: app.delay,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={app.link}
                    target="_blank"
                    className="block h-full group outline-none"
                  >
                    <div className="flex flex-col items-start text-left h-full bg-[#111] border border-white/[0.04] p-7 rounded-2xl hover:border-white/10 hover:bg-[#161616] transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-5 group-hover:bg-[#a3e635]/10 transition-colors duration-300">
                        {app.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#a3e635] transition-colors duration-300">
                        {app.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                        {app.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#a3e635] text-xs font-semibold opacity-60 group-hover:opacity-100 mt-auto transition-opacity">
                        Open{" "}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── DIVIDER ───── */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ───── THE PROBLEM ───── */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-gray-500 mb-3">
                The problem
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-16 max-w-lg">
                Restaurants lose money to{" "}
                <span className="text-gray-500">
                  the same preventable problems.
                </span>
              </h2>
            </m.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {problems.map((problem, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center text-gray-500 mt-0.5">
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1.5">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {problem.text}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───── DIVIDER ───── */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* ───── THE SOLUTION ───── */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-[#a3e635]/70 mb-3">
                Our solution
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 max-w-lg">
                Replace the chaos{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] to-teal-400">
                  with clarity.
                </span>
              </h2>
              <p className="text-gray-500 max-w-2xl leading-relaxed mb-16">
                Guests scan a table QR code to browse your menu and place orders
                instantly — no app download, no waiting. Orders flow directly to
                your waiter dashboard and kitchen in real time. And your admin
                panel gives you a live view of every table, every order, and
                every rupee.
              </p>
            </m.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-[#111] border border-white/[0.04] rounded-xl px-5 py-4"
                >
                  <div className="flex-shrink-0 mt-0.5">{feature.icon}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.text}
                  </p>
                </m.div>
              ))}
            </div>

            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 text-sm mt-12 max-w-xl leading-relaxed"
            >
              Whether you run a single outlet or a growing chain, Resqro scales
              with you — giving you the operational clarity and guest experience
              your business deserves.
            </m.p>
          </div>
        </section>

        {/* ───── FOOTER ───── */}
        <footer className="border-t border-white/[0.04] px-6 py-8">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs font-mono">
              Built with Next.js, Socket.io & Turborepo.
            </p>
            <p className="text-gray-700 text-xs">
              © {new Date().getFullYear()} Resqro
            </p>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
