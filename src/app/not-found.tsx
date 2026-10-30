import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-lux flex min-h-[80svh] flex-col justify-center pb-24 pt-40">
      <p className="eyebrow mb-8 text-forest">404</p>
      <h1 className="display-xl max-w-[12ch]">This page has moved on.</h1>
      <p className="lede mt-8 max-w-md text-ink-soft">The page you were looking for doesn&apos;t exist. Let&apos;s get you somewhere useful.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>Go home</ButtonLink>
        <ButtonLink href="/treatments" variant="outline">View treatments</ButtonLink>
      </div>
    </section>
  );
}
