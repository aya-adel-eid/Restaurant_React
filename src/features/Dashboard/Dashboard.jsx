import style from "./Dashboard.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LoaderSpinner } from "../../components/Shared/LoaderSpinner/LoaderSpinner";
import { formatDate } from "../../components/Shared/utils/utils";
import { Helmet } from "react-helmet";

export function Dashboard() {
  const token = localStorage.getItem("userToken");

  const {
    data: dashboardResp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getDashboardData"],
    queryFn: getDashboardData,
  });

  function getDashboardData() {
    return axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const stats = dashboardResp?.data.data;

  const STAT_CARDS = [
    {
      key: "totalBookings",
      label: "Total Bookings",
      icon: "fa-solid fa-calendar-check",
      accent: "bg-main-500/10 text-main-500",
    },
    {
      key: "todayBookings",
      label: "Today's Bookings",
      icon: "fa-solid fa-calendar-day",
      accent: "bg-blue-100 text-blue-600",
    },
    {
      key: "pendingBookings",
      label: "Pending",
      icon: "fa-regular fa-clock",
      accent: "bg-amber-100 text-amber-600",
    },
    {
      key: "confirmedBookings",
      label: "Confirmed",
      icon: "fa-regular fa-circle-check",
      accent: "bg-green-100 text-green-600",
    },
    {
      key: "cancelledBookings",
      label: "Cancelled",
      icon: "fa-regular fa-circle-xmark",
      accent: "bg-red-100 text-red-600",
    },
    {
      key: "totalContacts",
      label: "Contact Messages",
      icon: "fa-regular fa-envelope",
      accent: "bg-purple-100 text-purple-600",
    },
    {
      key: "totalUsers",
      label: "Total Users",
      icon: "fa-solid fa-users",
      accent: "bg-teal-100 text-teal-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderSpinner></LoaderSpinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-bold text-gray-400">
          Something went wrong while loading the dashboard.
        </p>
      </div>
    );
  }

  const total = stats?.totalBookings ?? 0;
  const confirmed = stats?.confirmedBookings ?? 0;
  const pending = stats?.pendingBookings ?? 0;
  const cancelled = stats?.cancelledBookings ?? 0;

  const pct = (n) => (total > 0 ? Math.round((n / total) * 100) : 0);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section className="px-4 sm:px-8 lg:px-15 py-8 min-h-screen bg-bgMain">
        <div className="pt-2 pb-8">
          <h2 className="font-bold text-2xl text-main-500">Dashboard</h2>
          <p className="text-gray-500 font-medium">
            Overview of your restaurant's activity
          </p>
        </div>

        {/* top stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
          {STAT_CARDS.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`size-12 shrink-0 rounded-full flex items-center justify-center text-lg ${card.accent}`}
              >
                <i className={card.icon}></i>
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-800 leading-tight">
                  {stats?.[card.key] ?? 0}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* summary + donut chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Bookings Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
              Bookings Summary
            </h3>
            <div className="divide-y divide-gray-100">
              <SummaryRow
                icon="fa-solid fa-square-check"
                iconColor="text-gray-700 bg-gray-100"
                label="Total"
                value={total}
                badge={`${pct(total)}%`}
                badgeColor="bg-gray-100 text-gray-600"
              />
              <SummaryRow
                icon="fa-solid fa-circle-check"
                iconColor="text-green-600 bg-green-100"
                label="Confirmed"
                value={confirmed}
                badge={`${pct(confirmed)}%`}
                badgeColor="bg-green-100 text-green-600"
              />
              <SummaryRow
                icon="fa-solid fa-hourglass-half"
                iconColor="text-amber-600 bg-amber-100"
                label="Pending"
                value={pending}
                badge={`${pct(pending)}%`}
                badgeColor="bg-amber-100 text-amber-600"
              />
              <SummaryRow
                icon="fa-solid fa-circle-xmark"
                iconColor="text-red-600 bg-red-100"
                label="Cancelled"
                value={cancelled}
                badge={`${pct(cancelled)}%`}
                badgeColor="bg-red-100 text-red-600"
              />
              <SummaryRow
                icon="fa-solid fa-users"
                iconColor="text-blue-600 bg-blue-100"
                label="Users"
                value={stats?.totalUsers ?? 0}
                badge="Registered"
                badgeColor="bg-blue-100 text-blue-600"
              />
              <SummaryRow
                icon="fa-solid fa-envelope"
                iconColor="text-sky-600 bg-sky-100"
                label="Messages"
                value={stats?.totalContacts ?? 0}
                badge="Inbox"
                badgeColor="bg-sky-100 text-sky-600"
              />
            </div>
          </div>

          {/* Booking Status donut */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
              Booking Status
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <DonutChart
                total={total}
                confirmed={confirmed}
                pending={pending}
                cancelled={cancelled}
              />
              <div className="flex-1 w-full space-y-4">
                <LegendRow
                  dotColor="bg-green-500"
                  label="Confirmed"
                  value={`${pct(confirmed)}%`}
                />
                <LegendRow
                  dotColor="bg-amber-500"
                  label="Pending"
                  value={`${pct(pending)}%`}
                />
                <LegendRow
                  dotColor="bg-main-500"
                  label="Cancelled"
                  value={`${pct(cancelled)}%`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Today & Tomorrow */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-5">
          <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
            <i className="fa-solid fa-calendar-days text-main-500"></i>
            Today & Tomorrow
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
              <p className="text-xs font-bold tracking-widest text-green-700 uppercase">
                Today
              </p>
              <p className="text-sm text-gray-500 mb-3">{formatDate(today)}</p>
              <p className="text-4xl font-bold text-gray-800">
                {stats?.todayBookings ?? 0}
              </p>
              <p className="text-xs text-gray-400 mt-1">bookings</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Tomorrow
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {formatDate(tomorrow)}
              </p>
              <p className="text-4xl font-bold text-gray-800">—</p>
              <p className="text-xs text-gray-400 mt-1">
                needs a `tomorrowBookings` field from the API
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SummaryRow({ icon, iconColor, label, value, badge, badgeColor }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`size-8 shrink-0 rounded-full flex items-center justify-center text-sm ${iconColor}`}
        >
          <i className={icon}></i>
        </span>
        <span className="font-medium text-gray-700 truncate">{label}</span>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="font-bold text-gray-800">{value}</span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}

function LegendRow({ dotColor, label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
      <div className="flex items-center gap-2.5">
        <span className={`size-2.5 rounded-full ${dotColor}`}></span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function DonutChart({ total, confirmed, pending, cancelled }) {
  const size = 180;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const safeTotal = total > 0 ? total : 1;
  const confirmedLen = (confirmed / safeTotal) * circumference;
  const pendingLen = (pending / safeTotal) * circumference;
  const cancelledLen = (cancelled / safeTotal) * circumference;

  // running offset so each arc starts where the previous one ended
  let offset = 0;
  const segments = [
    { length: confirmedLen, color: "#16a34a" }, // green-600
    { length: pendingLen, color: "#d97706" }, // amber-600
    { length: cancelledLen, color: "#bb2d2d" }, // brand red
  ];

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F1F1F1"
          strokeWidth={strokeWidth}
        />
        {segments.map((seg, i) => {
          if (seg.length <= 0) return null;
          const dashArray = `${seg.length} ${circumference - seg.length}`;
          const circle = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += seg.length;
          return circle;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{total}</span>
        <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
          Total
        </span>
      </div>
    </div>
  );
}
