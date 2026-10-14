import { STEPS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Steps() {
  return (
    <section id="process" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container-x">
        <Reveal><h2 className="font-display text-3xl font-extrabold sm:text-5xl">Joining takes four simple steps</h2></Reveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <li className="relative border-t-4 border-sun pt-5">
                <span className="font-display text-4xl font-extrabold text-ink/20">{i + 1}</span>
                <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-ink/75">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
