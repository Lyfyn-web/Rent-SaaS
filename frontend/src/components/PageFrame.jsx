import PropTypes from "prop-types";

function PageFrame({
  eyebrow,
  title,
  accent,
  description,
  metrics,
  highlights,
  actionLabel,
}) {
  return (
    <section
      className="relative overflow-hidden border border-cyan-100 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(8,145,178,0.45)] backdrop-blur-xl sm:p-8 lg:p-10"
      style={{ borderRadius: "32px" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, rgb(34 211 238) 0%, rgb(14 165 233) 50%, rgb(59 130 246) 100%)",
        }}
      />
      <div className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-cyan-100/70 blur-3xl" />
      <div className="absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.9fr)]">
        <div>
          <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold tracking-[0.24em] text-cyan-700">
            {eyebrow}
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
            {accent ? (
              <span className="block text-cyan-600">{accent}</span>
            ) : null}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>

          {metrics.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm"
                >
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                    {metric.label}
                  </div>
                  <div className="mt-2 text-lg font-bold text-slate-900">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {actionLabel ? (
            <div className="mt-8 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
              {actionLabel}
            </div>
          ) : null}
        </div>

        <div
          className="border border-cyan-100 p-5 shadow-lg shadow-cyan-100/50"
          style={{
            borderRadius: "28px",
            background:
              "linear-gradient(180deg, rgba(236, 254, 255, 0.9) 0%, rgba(255, 255, 255, 1) 100%)",
          }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-cyan-100 pb-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
                Spotlight
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                Quick Actions
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-cyan-600/10" />
          </div>

          <div className="mt-5 space-y-4">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-sm"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {highlight.title}
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

PageFrame.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  accent: PropTypes.string,
  description: PropTypes.string.isRequired,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
    }),
  ),
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
  actionLabel: PropTypes.string,
};

PageFrame.defaultProps = {
  accent: "",
  metrics: [],
  highlights: [],
  actionLabel: "",
};

export default PageFrame;
