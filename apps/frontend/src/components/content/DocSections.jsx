'use client';
import t from '@/locales/en.json';

/* ---------- Helper: render text with **bold** markdown ---------- */
function RichText({ text }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}

/* ---------- Breadcrumb ---------- */
function Breadcrumb({ items, onSelect }) {
  return (
    <div className="doc-breadcrumb">
      <button className="doc-breadcrumb__home" onClick={() => onSelect && onSelect('overview')}>
        🏠
      </button>
      {items.map((item, i) => {
        const label = typeof item === 'string' ? item : item.label;
        const id = typeof item === 'string' ? null : item.id;
        return (
          <span key={i}>
            <span className="doc-breadcrumb__sep">›</span>
            {i === items.length - 1 ? (
              <span className="doc-breadcrumb__current">{label}</span>
            ) : id && onSelect ? (
              <button className="doc-breadcrumb__link" onClick={() => onSelect(id)}>{label}</button>
            ) : (
              <span>{label}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/* ---------- Callout Box ---------- */
function Callout({ header, items }) {
  return (
    <div className="doc-callout">
      <div className="doc-callout__header">{header}</div>
      <ul className="doc-callout__list">
        {items.map((item, i) => (
          <li key={i}>
            {typeof item === 'string' ? <RichText text={item} /> : item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Bold-text list item ---------- */
function BoldListItem({ bold, text }) {
  return (
    <li>
      <strong>{bold}</strong> {text}
    </li>
  );
}

/* ============================================================
   OVERVIEW SECTION
   ============================================================ */
export function OverviewSection({ onSelect }) {
  const d = t.overview;
  return (
    <section className="doc-section doc-section--animate" id="section-overview">
      <Breadcrumb items={[d.breadcrumb]} onSelect={onSelect} />
      <h1 className="doc-section__title">{d.title}</h1>
      <Callout header={d.calloutHeader} items={d.calloutItems} />

      <h2 className="doc-section__heading">{d.aboutHeading}</h2>
      <p className="doc-section__text"><RichText text={d.aboutText} /></p>

      <h2 className="doc-section__heading">{d.navigateHeading}</h2>
      <p className="doc-section__text"><RichText text={d.navigateText} /></p>

      <h2 className="doc-section__heading">{d.sectionsHeading}</h2>
      <ul className="doc-section__list">
        {d.sectionsList.map((item, i) => (
          <BoldListItem key={i} bold={item.bold} text={item.text} />
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   INTRO SECTION
   ============================================================ */
export function IntroSection({ onSelect }) {
  const d = t.intro;
  return (
    <section className="doc-section doc-section--animate" id="section-intro">
      <Breadcrumb items={[{ label: t.sidebar.overview, id: 'overview' }, d.breadcrumb]} onSelect={onSelect} />
      <h1 className="doc-section__title">{d.title}</h1>
      <Callout header={d.calloutHeader} items={d.calloutItems} />

      <h2 className="doc-section__heading">{d.introHeading}</h2>
      <p className="doc-section__text"><RichText text={d.introText1} /></p>
      <p className="doc-section__text"><RichText text={d.introText2} /></p>

      <h2 className="doc-section__heading">{d.archHeading}</h2>
      <p className="doc-section__text"><RichText text={d.archText} /></p>

      <h2 className="doc-section__heading">{d.techHeading}</h2>
      <p className="doc-section__text">{d.techIntro}</p>
      <ul className="doc-section__list">
        {d.techList.map((item, i) => (
          <BoldListItem key={i} bold={item.bold} text={item.text} />
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   PLATFORMS OVERVIEW SECTION
   ============================================================ */
export function PlatformsOverviewSection() {
  const d = t.platformsOverview;
  return (
    <section className="doc-section doc-section--animate" id="section-platforms">
      <Breadcrumb items={[t.sidebar.overview, d.breadcrumb]} />
      <h1 className="doc-section__title">{d.title}</h1>
      <Callout header={d.calloutHeader} items={d.calloutItems} />

      <p className="doc-section__text"><RichText text={d.overviewText} /></p>

      <h2 className="doc-section__heading">{d.webHeading}</h2>
      <ul className="doc-section__list">
        {d.webList.map((item, i) => (
          <BoldListItem key={i} bold={item.bold} text={item.text} />
        ))}
      </ul>

      <h2 className="doc-section__heading">{d.mobileHeading}</h2>
      <ul className="doc-section__list">
        {d.mobileList.map((item, i) => (
          <BoldListItem key={i} bold={item.bold} text={item.text} />
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   INDIVIDUAL PLATFORM SECTION
   ============================================================ */
export function PlatformSection({ platformId }) {
  const platform = t.platforms[platformId];
  if (!platform) return null;

  return (
    <section className="doc-section doc-section--animate" id={`section-${platformId}`}>
      <Breadcrumb items={[t.sidebar.overview, t.sidebar.platforms, platform.breadcrumb]} />
      <h1 className="doc-section__title">{platform.name}</h1>

      <Callout
        header="💡 ABOUT THIS PLATFORM"
        items={[
          <><strong>Type:</strong> {platform.type}</>,
          <><strong>Status:</strong> {platform.status}</>,
          platform.description,
        ]}
      />

      <h2 className="doc-section__heading">Purpose</h2>
      <p className="doc-section__text">{platform.purpose}</p>

      <h2 className="doc-section__heading">Key Features</h2>
      <ul className="doc-section__list">
        {platform.keyFeatures.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   LINKS SECTION
   ============================================================ */
export function LinksSection({ onSelect }) {
  const d = t.links;
  return (
    <section className="doc-section doc-section--animate" id="section-links">
      <Breadcrumb items={[{ label: t.sidebar.overview, id: 'overview' }, d.breadcrumb]} onSelect={onSelect} />
      <h1 className="doc-section__title">{d.title}</h1>
      <Callout header={d.calloutHeader} items={d.calloutItems} />

      <h2 className="doc-section__heading">{d.docsHeading}</h2>
      <p className="doc-section__text">{d.docsText}</p>
      <ul className="doc-section__list">
        {d.docsList.map((item, i) => (
          <BoldListItem key={i} bold={item.bold} text={item.text} />
        ))}
      </ul>

      <h2 className="doc-section__heading">{d.commHeading}</h2>
      <ul className="doc-section__list">
        {d.commList.map((item, i) => (
          <BoldListItem key={i} bold={item.bold} text={item.text} />
        ))}
      </ul>
    </section>
  );
}

/* ============================================================
   GIT REPOS SECTION
   ============================================================ */
export function GitReposSection({ onSelect }) {
  const d = t.gitRepos;
  return (
    <section className="doc-section doc-section--animate" id="section-git-repos">
      <Breadcrumb items={[{ label: t.sidebar.overview, id: 'overview' }, d.breadcrumb]} onSelect={onSelect} />
      <h1 className="doc-section__title">{d.title}</h1>
      <Callout header={d.calloutHeader} items={d.calloutItems} />

      <h2 className="doc-section__heading">{d.webHeading}</h2>
      <ul className="doc-section__list">
        {d.webList.map((item, i) => (
          <li key={i}>
            <strong>{item.label}</strong>{' '}
            <a className="doc-link" href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">{item.url}</a>
          </li>
        ))}
      </ul>

      <h2 className="doc-section__heading">{d.mobileHeading}</h2>
      <ul className="doc-section__list">
        {d.mobileList.map((item, i) => (
          <li key={i}>
            <strong>{item.label}</strong>{' '}
            <a className="doc-link" href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">{item.url}</a>
          </li>
        ))}
      </ul>

      <h2 className="doc-section__heading">{d.sharedHeading}</h2>
      <ul className="doc-section__list">
        {d.sharedList.map((item, i) => (
          <li key={i}>
            <strong>{item.label}</strong>{' '}
            <a className="doc-link" href={`https://${item.url}`} target="_blank" rel="noopener noreferrer">{item.url}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
