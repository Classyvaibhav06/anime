/*
 * Cinematic Amber Afterglow, reduced to the user's sparse SUZUME RADIO composition:
 * open scene, restrained utility, centered title, and one clean bottom player.
 */
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Expand, Maximize2, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

type Track = {
  title: string;
  artist: string;
  anime: string;
  duration: string;
  audio: string;
  video: string;
};

const tracks: Track[] = [
  { title: "Suzume", artist: "RADWIMPS feat. Toaka", anime: "Suzume", duration: "4:12", audio: "/manus-storage/suzume_38392dfd.mp3", video: "/manus-storage/girl-chair_a1b36335.mp4" },
  { title: "Sparkle", artist: "RADWIMPS", anime: "Your Name", duration: "5:06", audio: "/manus-storage/sparkle_09599ca9.mp3", video: "/manus-storage/boy-girl-outdoors_35637ad9.mp4" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(72);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeTrack = tracks[activeIndex];

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;
    audio.src = activeTrack.audio;
    video.src = activeTrack.video;
    audio.load();
    video.load();
    setElapsed(0);
    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
      void video.play().catch(() => undefined);
    }
  }, [activeTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setElapsed(audio.currentTime || 0);
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;
    if (isPlaying) {
      audio.pause();
      video.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      void video.play().catch(() => undefined);
    }
  };

  const switchTrack = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(true);
  };

  const nextTrack = () => switchTrack((activeIndex + 1) % tracks.length);
  const previousTrack = () => switchTrack((activeIndex - 1 + tracks.length) % tracks.length);
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  return (
    <main className="radio-shell">
      <video ref={videoRef} className="radio-video" src={activeTrack.video} muted autoPlay loop playsInline aria-hidden="true" />
      <audio ref={audioRef} src={activeTrack.audio} preload="metadata" onEnded={nextTrack} />
      <div className="radio-shade" />
      <div className="radio-grain" />

      <header className="radio-topbar">
        <div className="radio-time"><span className="radio-live-dot" />10:14 PM</div>
        <div className="radio-utilities">
          <button aria-label="Volume"><Volume2 size={17} /></button>
          <button aria-label="Music library"><span className="music-symbol">♫</span></button>
          <button aria-label="Fullscreen"><Expand size={17} /></button>
        </div>
      </header>

      <section className="radio-notice">
        <strong>A DOOR TO ANOTHER WORLD</strong>
        <span>Close your eyes and listen...</span>
      </section>

      <div className="listener-count"><span className="listener-dot" />128 listening</div>

      <section className="radio-title-block">
        <p className="radio-kicker">NIGHT RADIO / 002</p>
        <h1>{activeTrack.title.toUpperCase()}<span>RADIO</span></h1>
        <button className="next-cue" onClick={nextTrack} aria-label="Next song"><ChevronRight size={26} /></button>
      </section>

      <div className="radio-rule" />

      <section className="radio-player" aria-label="Audio player">
        <div className="radio-track-identity"><div className="radio-disc"><span /></div><div className="radio-track-copy"><strong>{activeTrack.title}</strong><small>{activeTrack.artist}</small><div className="radio-progress"><span>{formatTime(elapsed)}</span><input aria-label="Seek track" type="range" min="0" max={Math.max(audioRef.current?.duration || 0, 1)} value={Math.min(elapsed, audioRef.current?.duration || 1)} onChange={(event) => { const value = Number(event.target.value); if (audioRef.current) audioRef.current.currentTime = value; setElapsed(value); }} /><span>{activeTrack.duration}</span></div></div></div>
        <div className="radio-transport"><button aria-label="Previous song" onClick={previousTrack}><SkipBack size={17} fill="currentColor" /></button><button aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlayback} className="radio-play">{isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}</button><button aria-label="Next song" onClick={nextTrack}><SkipForward size={17} fill="currentColor" /></button></div>
      </section>

      <div className="radio-track-switcher"><button className={activeIndex === 0 ? "active" : ""} onClick={() => switchTrack(0)}>01 / SUZUME</button><button className={activeIndex === 1 ? "active" : ""} onClick={() => switchTrack(1)}>02 / SPARKLE</button></div>
      <p className="radio-footer">A small room for songs that feel like memories.</p>
    </main>
  );
}
