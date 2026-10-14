import { HOSTELS, SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink2 py-10 text-sm text-paper/75">
      <div className="container-x flex flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-paper">{SITE.name}</p>
          <p className="mt-1">Hostels in {SITE.city}</p>
        </div>
        <ul className="space-y-1">
          {HOSTELS.map((h) => <li key={h.id}>{h.name}: {h.area}</li>)}
        </ul>
        <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
