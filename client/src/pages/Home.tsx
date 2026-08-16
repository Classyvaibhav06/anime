/*
 * Cinematic Amber Afterglow: scene-first composition, warm contrast, asymmetric calm,
 * quiet utility, frosted charcoal glass, expressive display type, tactile interactions.
 */
import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Expand,
  Headphones,
  Heart,
  ListMusic,
  Menu,
  MoreHorizontal,
  Pause,
  Play,
  Repeat2,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

type Track = {
  title: string;
  artist: string;
  anime: string;
  duration: string;
  cover: string;
  accent: string;
};

const tracks: Track[] = [
  { title: "Unravel", artist: "TK from Ling tosite sigure", anime: "Tokyo Ghoul", duration: "3:59", cover: "/manus-storage/animewave-hero_3f2f8bdd.png", accent: "#E58A4F" },
  { title: "Again", artist: "YUI", anime: "Fullmetal Alchemist: Brotherhood", duration: "4:18", cover: "/manus-storage/animewave-dawn_cad9aecf.png", accent: "#F0B36A" },
  { title: "Blue Bird", artist: "Ikimono-gakari", anime: "Naruto Shippuden", duration: "3:35", cover: "/manus-storage/animewave-night_269a9c1a.png", accent: "#97B7B1" },
  { title: "Silhouette", artist: "KANA-BOON", anime: "Naruto Shippuden", duration: "4:02", cover: "/manus-storage/animewave-hero_3f2f8bdd.png", accent: "#D77A49" },
  { title: "Kyouran Hey Kids!!", artist: "THE ORAL CIGARETTES", anime: "Noragami Aragoto", duration: "4:13", cover: "/manus-storage/animewave-dawn_cad9aecf.png", accent: "#E9C18F" },
];

const backgrounds = [
  "/manus-storage/animewave-hero_3f2f8bdd.png",
  "/manus-storage/animewave-dawn_cad9aec.png",
  "/manus-storage/animewave-night_269a9c1a.png",
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(72);
  const [showQueue, setShowQueue] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const activeTrack = tracks[activeIndex];
  const filteredTracks = useMemo(() => tracks.filter((track) => `${track.title} ${track.anime} ${track.artist}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const selectTrack = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(true);
    setShowQueue(false);
  };

  const nextTrack = () => setActiveIndex((index) => (index + 1) % tracks.length);
  const previousTrack = () => setActiveIndex((index) => (index - 1 + tracks.length) % tracks.length);

  return (
    <main className="player-shell" style={{ "--accent": activeTrack.accent } as React.CSSProperties}>
      <div className="backdrop" style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }} />
      <div className="backdrop-vignette" />
      <div className="grain" />

      <header className="topbar">
        <div className="brand-lockup">
          <img src="/manus-storage/animewave-mark_0bf33999.png" alt="AnimeWave mark" className="brand-mark" />
          <span className="brand-name">ANIMEWAVE</span>
        </div>
        <div className="time-display"><span className="live-dot" /> 10:02 PM <span className="time-city">TOKYO / 08.16</span></div>
        <div className="top-actions">
          <button className="icon-button subtle" aria-label="Open search" onClick={() => setSearchOpen((open) => !open)}><Search size={18} /></button>
          <button className="icon-button subtle hide-mobile" aria-label="Show listening mood"><Sparkles size={18} /></button>
          <button className="support-button hide-mobile"><Headphones size={15} /> Support us</button>
          <button className="icon-button" aria-label="Toggle fullscreen"><Expand size={18} /></button>
        </div>
      </header>

      <section className="announcement" aria-label="Site notice">
        <span className="announcement-kicker">A NOTE FROM THE ROOM</span>
        <strong>This little radio lives on your support.</strong>
        <span className="announcement-copy">Help keep the signal warm and the songs playing.</span>
        <button className="announcement-close" aria-label="Dismiss notice"><X size={14} /></button>
      </section>

      {searchOpen && (
        <div className="search-panel glass-panel">
          <Search size={17} />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search an anime, track, or artist" aria-label="Search tracks" />
          <button className="search-close" onClick={() => { setSearchOpen(false); setQuery(""); }}><X size={16} /></button>
          {query && <div className="search-results">{filteredTracks.length ? filteredTracks.map((track) => <button key={track.title} onClick={() => selectTrack(tracks.indexOf(track))}><span>{track.title}</span><small>{track.anime}</small></button>) : <p>No songs in the room yet.</p>}</div>}
        </div>
      )}

      <div className="online-pill"><span className="online-dot" /> 316 listeners in the room</div>

      <section className="hero-copy">
        <p className="eyebrow">ANIME SONGS / LATE NIGHT RADIO</p>
        <h1>Scenes<br /><em>in sound.</em></h1>
        <p className="hero-description">A quiet corner for opening themes, ending credits, and the songs that stay after the episode ends.</p>
        <div className="hero-actions">
          <button className="primary-action" onClick={() => setIsPlaying((playing) => !playing)}>{isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />} {isPlaying ? "Pause room" : "Play the room"}</button>
          <button className="text-action" onClick={() => setShowQueue(true)}>Browse queue <ChevronRight size={16} /></button>
        </div>
      </section>

      <aside className={`queue-panel glass-panel ${showQueue ? "queue-open" : ""}`} aria-label="Up next queue">
        <div className="queue-header"><div><span className="eyebrow">UP NEXT</span><h2>Tonight's queue</h2></div><button className="icon-button mobile-only" aria-label="Close queue" onClick={() => setShowQueue(false)}><X size={18} /></button></div>
        <div className="queue-list">{tracks.map((track, index) => <button key={track.title} className={`queue-item ${index === activeIndex ? "active" : ""}`} onClick={() => selectTrack(index)}><span className="queue-number">{String(index + 1).padStart(2, "0")}</span><img src={track.cover} alt="" /><span className="queue-meta"><strong>{track.title}</strong><small>{track.anime}</small></span><span className="queue-duration">{track.duration}</span>{index === activeIndex && <span className="equalizer"><i /><i /><i /></span>}</button>)}</div>
        <button className="queue-footer"><ListMusic size={15} /> View full library <ChevronRight size={14} /></button>
      </aside>

      <div className="ambient-caption"><span>NOW PLAYING</span><strong>{activeTrack.anime}</strong><span className="caption-line" /> <span>VOL. 01</span></div>

      <section className="player-bar glass-panel" aria-label="Audio player">
        <div className="track-info"><div className="cover-wrap"><img src={activeTrack.cover} alt={`${activeTrack.title} artwork`} /><span className="cover-glint" /></div><div className="track-copy"><span className="now-playing-label">NOW PLAYING</span><strong>{activeTrack.title}</strong><small>{activeTrack.artist}</small></div><button className={`heart-button ${isLiked ? "liked" : ""}`} aria-label="Like track" onClick={() => setIsLiked((liked) => !liked)}><Heart size={18} fill={isLiked ? "currentColor" : "none"} /></button></div>
        <div className="transport"><div className="transport-buttons"><button className="transport-button hide-mobile" aria-label="Shuffle"><Shuffle size={16} /></button><button className="transport-button" aria-label="Previous track" onClick={previousTrack}><SkipBack size={18} fill="currentColor" /></button><button className="main-play" aria-label={isPlaying ? "Pause" : "Play"} onClick={() => setIsPlaying((playing) => !playing)}>{isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button><button className="transport-button" aria-label="Next track" onClick={nextTrack}><SkipForward size={18} fill="currentColor" /></button><button className="transport-button hide-mobile" aria-label="Repeat"><Repeat2 size={16} /></button></div><div className="progress-row"><span>0:00</span><div className="progress-track"><span style={{ width: isPlaying ? "38%" : "9%" }} /></div><span>{activeTrack.duration}</span></div></div>
        <div className="player-tools"><div className="volume-control"><Volume2 size={16} /><input aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ "--range-progress": `${volume}%` } as React.CSSProperties} /></div><button className="queue-toggle" aria-label="Toggle queue" onClick={() => setShowQueue((open) => !open)}><Menu size={18} /></button><button className="more-button" aria-label="More options"><MoreHorizontal size={19} /></button></div>
      </section>

      <div className="background-switcher" aria-label="Background scene selector">{backgrounds.map((_, index) => <button key={index} className={index === backgroundIndex ? "active" : ""} aria-label={`Show background ${index + 1}`} onClick={() => setBackgroundIndex(index)} />)}</div>
      <div className="footer-note">A small, student-built radio for anime songs <span>·</span> made with feeling</div>
    </main>
  );
}
