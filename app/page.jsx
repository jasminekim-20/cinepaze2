"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import {
  Bell,
  BookOpen,
  Compass,
  Film,
  Globe2,
  Heart,
  Home,
  Lock,
  MessageSquareText,
  Plus,
  Search,
  Send,
  Trophy,
  Users,
  X,
} from "lucide-react";

const sampleFilms = [
  {
    id: "sample-1",
    title: "화양연화",
    sub: "In the Mood for Love",
    director: "왕가위",
    country: "홍콩",
    year: "2000",
    rating: "5",
    tags: "고독, 기억, 느린 호흡, 홍콩 누아르",
    memo: "빛과 침묵으로 남는 사랑의 잔상.",
    lat: 22.3193,
    lon: 114.1694,
    score: 95,
    color: "#ff4fa3",
  },
  {
    id: "sample-2",
    title: "중경삼림",
    sub: "Chungking Express",
    director: "왕가위",
    country: "홍콩",
    year: "1994",
    rating: "4.5",
    tags: "도시, 실연, 속도, 네온",
    memo: "도시의 속도와 마음의 지연.",
    lat: 22.3193,
    lon: 114.1694,
    score: 91,
    color: "#a855f7",
  },
  {
    id: "sample-3",
    title: "아무도 모른다",
    sub: "Nobody Knows",
    director: "고레에다 히로카즈",
    country: "일본",
    year: "2004",
    rating: "5",
    tags: "가족, 상실, 침묵, 일본 영화",
    memo: "사건보다 방치된 시간의 밀도를 보는 영화.",
    lat: 35.6762,
    lon: 139.6503,
    score: 92,
    color: "#38bdf8",
  },
  {
    id: "sample-4",
    title: "기생충",
    sub: "Parasite",
    director: "봉준호",
    country: "한국",
    year: "2019",
    rating: "5",
    tags: "계급, 공간, 사회비판, 한국 영화",
    memo: "수직 구조로 읽는 계급의 감각.",
    lat: 37.5665,
    lon: 126.978,
    score: 93,
    color: "#facc15",
  },
  {
    id: "sample-5",
    title: "헤어질 결심",
    sub: "Decision to Leave",
    director: "박찬욱",
    country: "한국",
    year: "2022",
    rating: "4.5",
    tags: "욕망, 미스터리, 안개, 한국 영화",
    memo: "사랑과 수사의 경계가 흐려지는 영화.",
    lat: 35.1796,
    lon: 129.0756,
    score: 89,
    color: "#fb7185",
  },
  {
    id: "sample-6",
    title: "어느 가족",
    sub: "Shoplifters",
    director: "고레에다 히로카즈",
    country: "일본",
    year: "2018",
    rating: "5",
    tags: "가족, 윤리, 빈곤, 일본 영화",
    memo: "가족이라는 말의 경계를 다시 묻는 영화.",
    lat: 35.6762,
    lon: 139.6503,
    score: 90,
    color: "#34d399",
  },
  {
    id: "sample-7",
    title: "타락천사",
    sub: "Fallen Angels",
    director: "왕가위",
    country: "홍콩",
    year: "1995",
    rating: "4.5",
    tags: "도시, 외로움, 밤, 홍콩 누아르",
    memo: "도시의 밤과 외로운 인물들의 블루스.",
    lat: 22.3193,
    lon: 114.1694,
    score: 88,
    color: "#22d3ee",
  },
  {
    id: "sample-8",
    title: "퍼펙트 데이즈",
    sub: "Perfect Days",
    director: "빔 벤더스",
    country: "일본",
    year: "2023",
    rating: "4",
    tags: "일상, 침묵, 관찰, 일본 영화",
    memo: "반복되는 하루 속에서 발견되는 작은 빛.",
    lat: 35.6762,
    lon: 139.6503,
    score: 84,
    color: "#f97316",
  },
    {
    id: "sample-9",
    title: "펄프 픽션",
    sub: "Pulp Fiction",
    director: "쿠엔틴 타란티노",
    country: "미국",
    year: "1994",
    rating: "5",
    tags: "범죄, 비선형 서사, 블랙코미디, 미국 영화",
    memo: "파편화된 이야기와 스타일이 강렬하게 남는 영화.",
    lat: 34.0522,
    lon: -118.2437,
    score: 94,
    color: "#facc15",
  },
  {
    id: "sample-10",
    title: "파이트 클럽",
    sub: "Fight Club",
    director: "데이비드 핀처",
    country: "미국",
    year: "1999",
    rating: "4.5",
    tags: "정체성, 분열, 자본주의, 심리",
    memo: "불안한 자아와 소비사회를 거칠게 해체하는 영화.",
    lat: 40.7128,
    lon: -74.006,
    score: 90,
    color: "#fb7185",
  },
  {
    id: "sample-11",
    title: "라라랜드",
    sub: "La La Land",
    director: "데이미언 셔젤",
    country: "미국",
    year: "2016",
    rating: "4.5",
    tags: "음악, 꿈, 사랑, 색채",
    memo: "꿈과 사랑이 같은 방향으로 갈 수 없을 때의 아름다움.",
    lat: 34.0522,
    lon: -118.2437,
    score: 88,
    color: "#a855f7",
  },
  {
    id: "sample-12",
    title: "인셉션",
    sub: "Inception",
    director: "크리스토퍼 놀란",
    country: "미국",
    year: "2010",
    rating: "4.5",
    tags: "꿈, 시간, 기억, SF",
    memo: "꿈의 구조를 액션과 감정으로 설계한 영화.",
    lat: 34.0522,
    lon: -118.2437,
    score: 91,
    color: "#38bdf8",
  },
  {
    id: "sample-13",
    title: "대부",
    sub: "The Godfather",
    director: "프랜시스 포드 코폴라",
    country: "미국",
    year: "1972",
    rating: "5",
    tags: "가족, 권력, 범죄, 고전",
    memo: "가족과 권력이 어떻게 하나의 질서가 되는지 보여주는 영화.",
    lat: 40.7128,
    lon: -74.006,
    score: 96,
    color: "#f97316",
  },
  {
    id: "sample-14",
    title: "아멜리에",
    sub: "Amélie",
    director: "장 피에르 주네",
    country: "프랑스",
    year: "2001",
    rating: "4.5",
    tags: "상상력, 사랑, 파리, 감성",
    memo: "일상의 작은 장난과 상상이 사랑으로 이어지는 영화.",
    lat: 48.8566,
    lon: 2.3522,
    score: 87,
    color: "#34d399",
  },
  {
    id: "sample-15",
    title: "그랜드 부다페스트 호텔",
    sub: "The Grand Budapest Hotel",
    director: "웨스 앤더슨",
    country: "미국",
    year: "2014",
    rating: "4.5",
    tags: "미장센, 색채, 유머, 동화적 세계",
    memo: "정교한 색채와 구도로 완성된 영화적 장난감 상자.",
    lat: 40.7128,
    lon: -74.006,
    score: 89,
    color: "#ff4fa3",
  },
  {
    id: "sample-16",
    title: "로마",
    sub: "Roma",
    director: "알폰소 쿠아론",
    country: "멕시코",
    year: "2018",
    rating: "4.5",
    tags: "기억, 계급, 가족, 흑백",
    memo: "개인의 기억과 사회의 시간이 함께 흐르는 영화.",
    lat: 19.4326,
    lon: -99.1332,
    score: 88,
    color: "#94a3b8",
  },
];

const navItems = [
  { id: "home", label: "홈", sub: "HOME", icon: Home },
  { id: "digging", label: "탐색", sub: "EXPLORE", icon: Compass },
  { id: "reviews", label: "리뷰", sub: "REVIEWS", icon: MessageSquareText },
  { id: "map", label: "시네마 맵", sub: "CINEMA MAP", icon: Globe2 },
  { id: "info", label: "영화제", sub: "FESTIVALS", icon: Trophy },
  { id: "match", label: "매칭", sub: "MATCH", icon: Heart },
  { id: "crew", label: "크루", sub: "CREWS", icon: Users },
  { id: "mypage", label: "마이페이지", sub: "MY PAGE", icon: Film },
];

const reviewCards = [
  {
    type: "한줄평",
    title: "빛보다 오래 남는 고독",
    movie: "화양연화",
    body: "사랑은 시작보다 끝난 뒤의 잔향이 더 오래간다.",
    color: "#c084fc",
    locked: false,
  },
  {
    type: "프리뷰",
    title: "보기 전 알아두면 좋은 감정의 입구",
    movie: "아무도 모른다",
    body: "이 영화는 사건보다 방치된 시간의 밀도를 보는 작품입니다.",
    color: "#67e8f9",
    locked: false,
  },
  {
    type: "리뷰",
    title: "도시의 속도와 마음의 지연",
    movie: "중경삼림",
    body: "왕가위의 인물들은 늘 지나간 마음을 붙잡으려 하지만, 도시는 그보다 빠르게 움직입니다.",
    color: "#34d399",
    locked: false,
  },
  {
    type: "분석글",
    title: "원작을 넘어선 서사 구조의 재설계",
    movie: "기생충",
    body: "계단과 문, 지하와 지상을 통해 계급의 수직 구조가 시각적으로 배열됩니다.",
    color: "#f0c46b",
    locked: false,
  },
  {
    type: "스포일러 비평",
    title: "마지막 장면의 의미",
    movie: "헤어질 결심",
    body: "결말을 포함한 긴 비평입니다. 관람 후 열람하는 것을 권장합니다.",
    color: "#fb7185",
    locked: true,
  },
];

const countryCoords = {
  한국: { lat: 37.5665, lon: 126.978 },
  일본: { lat: 35.6762, lon: 139.6503 },
  홍콩: { lat: 22.3193, lon: 114.1694 },
  중국: { lat: 39.9042, lon: 116.4074 },
  프랑스: { lat: 48.8566, lon: 2.3522 },
  미국: { lat: 40.7128, lon: -74.006 },
  영국: { lat: 51.5072, lon: -0.1276 },
  이탈리아: { lat: 41.9028, lon: 12.4964 },
  독일: { lat: 52.52, lon: 13.405 },
  멕시코: { lat: 19.4326, lon: -99.1332 },
};

function cls(...items) {
  return items.filter(Boolean).join(" ");
}

function loadLocal(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function getTags(film) {
  if (!film || !film.tags) return [];

  return String(film.tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getStats(films = []) {
  const safeFilms = Array.isArray(films) ? films : [];

  const tagCount = {};
  const directorCount = {};
  const countryCount = {};

  safeFilms.forEach((film) => {
    getTags(film).forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });

    if (film.director) {
      directorCount[film.director] = (directorCount[film.director] || 0) + 1;
    }

    if (film.country) {
      countryCount[film.country] = (countryCount[film.country] || 0) + 1;
    }
  });

  const sort = (obj) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

  return {
    tags: sort(tagCount),
    directors: sort(directorCount),
    countries: sort(countryCount),
  };
}

function pickColor(seed) {
  const colors = ["#ff4fa3", "#a855f7", "#38bdf8", "#34d399", "#facc15", "#fb7185"];
  const value = String(seed || "")
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[value % colors.length];
}

function normaliseFilm(film) {
  const coords = countryCoords[film?.country] || { lat: 20, lon: 100 };
  const ratingNumber = Number(film?.rating || 4);

  return {
    ...film,
    lat: film?.lat ?? coords.lat,
    lon: film?.lon ?? coords.lon,
    score: film?.score ?? Math.min(Math.round(ratingNumber * 20), 100),
    color: film?.color || pickColor(film?.country || film?.title),
  };
}

function Card({ children, className = "" }) {
  return (
    <div
      className={cls(
        "rounded-[28px] border border-white/10 bg-[#0b0f16]/80 shadow-[0_24px_90px_rgba(0,0,0,.5)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function MiniPoster({ title, color = "#a855f7", className = "" }) {
  return (
    <div
      className={cls("relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900", className)}
      style={{
        background: `radial-gradient(circle at 35% 20%, ${color}99, transparent 36%), linear-gradient(135deg,#111827,#020617 72%)`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.88),transparent_60%)]" />
      <div className="absolute inset-0 opacity-35 poster-noise" />
      <p className="absolute bottom-2 left-2 right-2 line-clamp-2 text-xs font-black text-white">
        {title}
      </p>
    </div>
  );
}

function Header({ user }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#03050a]/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1800px] items-center gap-5 px-4 py-3 md:px-7">
        <div>
          <h1 className="font-serif text-3xl font-black tracking-tight text-white">cinepaze</h1>
          <p className="-mt-1 hidden text-[10px] uppercase tracking-[.38em] text-zinc-500 md:block">
            explore. connect. dig deeper.
          </p>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {["발견", "매칭", "컬렉션", "저널", "커뮤니티"].map((item) => (
            <button
              key={item}
              className="rounded-full px-4 py-2 text-sm font-bold text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden w-[420px] items-center rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 md:flex">
          <Search size={17} className="mr-3 text-zinc-500" />
          <input
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            placeholder="영화, 감독, 비평 검색"
          />
          <kbd className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-zinc-500">
            ⌘K
          </kbd>
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[.04] text-zinc-300">
          <Bell size={17} />
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f0c46b] to-[#a855f7]" />
          <span className="hidden text-sm font-bold text-white sm:block">
            {user?.nickname || "user"}
          </span>
        </div>
      </div>
    </header>
  );
}
function SideNav({ page, setPage, user, watchedFilms = [] }) {
  const safeFilms = Array.isArray(watchedFilms) ? watchedFilms : [];

  return (
    <aside className="sticky top-[73px] hidden h-[calc(100vh-73px)] w-[225px] shrink-0 border-r border-white/10 bg-[#05070d]/80 p-4 lg:block">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={cls(
              "mb-2 flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition",
              page === item.id
                ? item.id === "home"
                  ? "bg-[#f0c46b]/10 text-[#f0c46b]"
                  : "bg-gradient-to-r from-[#a855f7]/25 to-transparent text-white shadow-[inset_3px_0_0_#c084fc]"
                : "text-zinc-400 hover:bg-white/[.04] hover:text-white"
            )}
          >
            <Icon size={20} />
            <div>
              <p className="text-sm font-black">{item.label}</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                {item.sub}
              </p>
            </div>
          </button>
        );
      })}

      <div className="mt-10 border-t border-white/10 pt-6">
        <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-zinc-500">
          Quick Add
        </p>

        <button
          onClick={() => setPage("mypage")}
          className="mb-2 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-left text-sm text-zinc-300"
        >
          <Plus size={16} />
          영화 기록하기
        </button>

        <button
          onClick={() => setPage("map")}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-left text-sm text-zinc-300"
        >
          <Globe2 size={16} />
          내 취향 지도
        </button>
      </div>

      <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-white/10 bg-white/[.035] p-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#f472b6] to-[#f0c46b]" />
          <div>
            <p className="font-black text-white">{user?.nickname || "user"}</p>
            <p className="text-xs text-zinc-500">
              필름 디거 Lv.{Math.max(1, safeFilms.length + 1)}
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#f0c46b]"
            style={{ width: `${Math.min(18 + safeFilms.length * 12, 100)}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-zinc-500">
          기록 영화 {safeFilms.length}편
        </p>
      </div>
    </aside>
  );
}
function MobileNav({ page, setPage }) {
  const items = [
    { id: "home", label: "홈", icon: Home },
    { id: "map", label: "맵", icon: Globe2 },
    { id: "reviews", label: "리뷰", icon: MessageSquareText },
    { id: "match", label: "매칭", icon: Heart },
    { id: "mypage", label: "마이", icon: Film },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#06080e]/95 p-2 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={cls(
                "rounded-2xl px-2 py-2 text-xs font-bold transition",
                page === item.id
                  ? "bg-white text-black"
                  : "text-zinc-500 hover:bg-white/[.06] hover:text-white"
              )}
            >
              <Icon className="mx-auto mb-1" size={19} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
function AuthGate({ setUser, setWatchedFilms }) {
  const [mode, setMode] = useState("signup");
  const [form, setForm] = useState({ id: "", password: "", nickname: "" });
  const [notice, setNotice] = useState("");

  function submit(e) {
    e.preventDefault();

    const id = form.id.trim();
    const password = form.password.trim();
    const nickname = form.nickname.trim();

    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const users = loadLocal("cinepaze_users", []);

    if (mode === "signup") {
      if (users.some((user) => user.id === id)) {
        alert("이미 존재하는 아이디입니다.");
        return;
      }

      const newUser = {
        id,
        password,
        nickname: nickname || id,
        createdAt: new Date().toLocaleDateString("ko-KR"),
        onboarded: false,
      };

      saveLocal("cinepaze_users", [...users, newUser]);
      setNotice("가입이 완료되었습니다. 이제 로그인해주세요.");
      setMode("login");
      setForm({ id, password: "", nickname: nickname || id });
      return;
    }

    const found = users.find((user) => user.id === id && user.password === password);

    if (!found) {
      alert("아이디 또는 비밀번호가 맞지 않습니다.");
      return;
    }

    saveLocal("cinepaze_current_user", found);
    const savedFilms = loadLocal(`cinepaze_watched_${found.id}`, []);
    setUser(found);
    setWatchedFilms(Array.isArray(savedFilms) ? savedFilms : []);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03050a] text-white">
      <div className="absolute inset-0 starfield opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_30%,rgba(168,85,247,.25),transparent_26%),radial-gradient(circle_at_75%_70%,rgba(240,196,107,.13),transparent_26%)]" />

      <section className="relative z-10 mx-auto grid min-h-screen max-w-[1200px] place-items-center px-5">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-black uppercase tracking-[.45em] text-[#f0c46b]">
              Cinepaze
            </p>
            <h1 className="mt-5 font-serif text-5xl font-black leading-tight md:text-7xl">
              영화 취향이
              <br />
              하나의 지도가 됩니다.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
              본 영화와 좋아하는 작품을 기록하면, 취향의 파편이 모여 나만의
              시네마 맵을 만듭니다.
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="mb-6 flex gap-2">
              {["signup", "login"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setMode(item);
                    setNotice("");
                  }}
                  className={cls(
                    "flex-1 rounded-2xl px-4 py-3 text-sm font-black",
                    mode === item
                      ? "bg-white text-black"
                      : "border border-white/10 text-zinc-400"
                  )}
                >
                  {item === "signup" ? "회원가입" : "로그인"}
                </button>
              ))}
            </div>

            {notice && (
              <div className="mb-4 rounded-2xl border border-[#34d399]/30 bg-[#34d399]/10 px-4 py-3 text-sm font-bold text-[#86efac]">
                {notice}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <input
                  className="input"
                  placeholder="닉네임"
                  value={form.nickname}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, nickname: e.target.value }))
                  }
                />
              )}

              <input
                className="input"
                placeholder="아이디"
                value={form.id}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, id: e.target.value }))
                }
              />

              <input
                className="input"
                placeholder="비밀번호"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />

              <button className="w-full rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ff4fa3] px-5 py-4 text-sm font-black text-white">
                {mode === "signup" ? "계정 만들기" : "로그인하기"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-6 text-zinc-500">
              로그인 후 좋아하는 영화 5편을 선택하면 첫 취향 지도가 생성됩니다.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}

function Onboarding({ user, setUser, setWatchedFilms }) {
  const [selected, setSelected] = useState([]);

  function toggleFilm(film) {
    setSelected((prev) => {
      const exists = prev.some((item) => item.id === film.id);

      if (exists) {
        return prev.filter((item) => item.id !== film.id);
      }

      if (prev.length >= 5) {
        alert("처음 취향 지도에는 영화 5편만 선택할 수 있습니다.");
        return prev;
      }

      return [...prev, film];
    });
  }

  function completeOnboarding() {
    if (selected.length !== 5) {
      alert("좋아하는 영화 5편을 선택해주세요.");
      return;
    }

    const watched = selected.map((film) => ({
      ...film,
      id: `${film.id}-${Date.now()}`,
      status: "봤어요",
      createdAt: new Date().toLocaleString("ko-KR"),
    }));

    const updatedUser = { ...user, onboarded: true };

    const users = loadLocal("cinepaze_users", []);
    const nextUsers = users.map((item) => (item.id === user.id ? updatedUser : item));

    saveLocal("cinepaze_users", nextUsers);
    saveLocal("cinepaze_current_user", updatedUser);
    saveLocal(`cinepaze_watched_${user.id}`, watched);

    setUser(updatedUser);
    setWatchedFilms(watched);
  }

  return (
    <main className="min-h-screen bg-[#03050a] text-white">
      <div className="absolute inset-0 starfield opacity-40" />
      <section className="relative z-10 mx-auto max-w-[1300px] px-5 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[.45em] text-[#f0c46b]">
            Taste Onboarding
          </p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight md:text-6xl">
            좋아하는 영화 5편을 골라주세요.
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            선택한 영화의 감독, 국가, 분위기, 키워드를 바탕으로 첫 취향 지도를 만듭니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sampleFilms.map((film) => {
            const active = selected.some((item) => item.id === film.id);

            return (
              <button
                key={film.id}
                onClick={() => toggleFilm(film)}
                className={cls(
                  "rounded-[28px] border p-4 text-left transition",
                  active
                    ? "border-[#ff4fa3] bg-[#ff4fa3]/10 shadow-[0_0_40px_rgba(255,79,163,.25)]"
                    : "border-white/10 bg-white/[.03] hover:bg-white/[.06]"
                )}
              >
                <MiniPoster
                  title={film.title}
                  color={film.color}
                  className="h-52 w-full"
                />
                <p className="mt-4 text-xl font-black text-white">{film.title}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {film.year} · {film.director}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {getTags(film)
                    .slice(0, 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[.06] px-2 py-1 text-[10px] text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="sticky bottom-0 mt-10 border-t border-white/10 bg-[#03050a]/80 py-5 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[900px] items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">
              선택한 영화 <span className="font-black text-white">{selected.length}</span> / 5
            </p>
            <button
              onClick={completeOnboarding}
              disabled={selected.length !== 5}
              className={cls(
                "rounded-2xl px-6 py-4 text-sm font-black",
                selected.length === 5
                  ? "bg-gradient-to-r from-[#8b5cf6] to-[#ff4fa3] text-white"
                  : "bg-white/10 text-zinc-600"
              )}
            >
              내 취향 지도 만들기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function TasteShardsMatch({ user, watchedFilms = [], setPage }) {
  const safeFilms = Array.isArray(watchedFilms) ? watchedFilms : [];
  const stats = getStats(safeFilms);
  const sourceFilms = safeFilms.length ? safeFilms : sampleFilms;

  const userTags = stats.tags.length
    ? stats.tags.map((tag) => tag.name)
    : ["고독", "기억", "가족 드라마", "느린 호흡", "아시아 영화"];

  const commonShards = userTags.slice(0, 6);
  const rightShards = ["고레에다 히로카즈", "일본 영화", "한국 영화", "아트하우스", "섬세한 연출", "자연의 미학"];

  return (
    <section className="relative min-h-[720px] overflow-hidden rounded-[36px] border border-white/10 bg-black p-5 md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,.22),transparent_10%),radial-gradient(circle_at_44%_45%,rgba(240,196,107,.22),transparent_18%),radial-gradient(circle_at_30%_48%,rgba(168,85,247,.25),transparent_30%),radial-gradient(circle_at_70%_48%,rgba(34,211,238,.22),transparent_28%)]" />
      <div className="absolute inset-0 starfield opacity-45" />
      <div className="absolute inset-0 shards-light" />

      <div className="relative z-10 text-center">
        <p className="text-xs font-black uppercase tracking-[.5em] text-[#f0c46b]">
          TASTE SHARDS MATCH
        </p>
        <h2 className="mt-3 font-serif text-4xl tracking-[.25em] text-white md:text-6xl">
          취향 파편 매칭
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
          선택한 영화들이 만든 취향 조각을 바탕으로, 비슷한 영화와 사람을 연결합니다.
        </p>
      </div>

      <div className="relative z-10 mt-10 grid gap-5 xl:grid-cols-[300px_1fr_300px]">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#f472b6] to-[#f0c46b]" />
            <div>
              <p className="text-2xl font-black text-white">{user?.nickname || "user"}</p>
              <p className="text-sm text-zinc-500">cinephile</p>
            </div>
            <div className="ml-auto grid h-16 w-16 place-items-center rounded-full border border-[#ff4fa3]/50 bg-[#ff4fa3]/10 text-lg font-black text-[#ff4fa3]">
              {Math.min(70 + safeFilms.length * 4, 96)}%
            </div>
          </div>

          <p className="mt-6 text-center text-sm leading-7 text-zinc-300">
            “내가 본 영화들이 나만의 취향 조각이 됩니다.”
          </p>

          <div className="mt-6 rounded-3xl border border-[#a855f7]/20 bg-[#a855f7]/5 p-4">
            <div className="mb-3 flex justify-between">
              <p className="text-sm font-black text-[#c084fc]">나의 고유 파편</p>
              <span className="text-[#c084fc]">{userTags.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {userTags.slice(0, 8).map((tag) => (
                <span key={tag} className="shard-chip border-[#a855f7]/40 bg-[#a855f7]/10 text-[#d8b4fe]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-zinc-500">최근 선택한 영화</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {sourceFilms.slice(0, 4).map((film) => (
              <MiniPoster key={film.id || film.title} title={film.title} color={film.color} className="h-24" />
            ))}
          </div>
        </Card>

        <div className="relative min-h-[440px]">
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f0c46b]/40 bg-[#f0c46b]/10 shadow-[0_0_120px_rgba(240,196,107,.42)]" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          {[
            [userTags[0] || "고독", "left-[12%] top-[18%]", "#ff4fa3"],
            [userTags[1] || "기억", "left-[10%] top-[36%]", "#a855f7"],
            [userTags[2] || "가족 드라마", "left-[20%] top-[56%]", "#f0c46b"],
            [commonShards[0] || "고독", "left-[44%] top-[18%]", "#f0c46b"],
            [commonShards[1] || "기억", "left-[36%] top-[34%]", "#f472b6"],
            [commonShards[2] || "느린 호흡", "left-[42%] top-[55%]", "#c084fc"],
            ["칸", "left-[51%] top-[74%]", "#fb7185"],
            [rightShards[0], "left-[68%] top-[18%]", "#67e8f9"],
            [rightShards[1], "left-[78%] top-[35%]", "#22d3ee"],
            [rightShards[2], "left-[73%] top-[53%]", "#34d399"],
            [rightShards[3], "left-[66%] top-[74%]", "#67e8f9"],
          ].map(([text, pos, color]) => (
            <div
              key={`${text}-${pos}`}
              className={cls("absolute shard-piece px-6 py-3 text-sm font-black", pos)}
              style={{
                borderColor: `${color}aa`,
                color,
                background: `${color}14`,
                boxShadow: `0 0 32px ${color}44`,
              }}
            >
              {text}
            </div>
          ))}

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-[#ff4fa3]/40 bg-black/70 px-10 py-5 text-center backdrop-blur">
            <p className="text-5xl font-black text-[#ff4fa3]">87%</p>
            <p className="text-xs text-zinc-500">매칭 정확도</p>
          </div>
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#34d399]" />
            <div>
              <p className="text-2xl font-black text-white">민준우</p>
              <p className="text-sm text-zinc-500">film explorer</p>
            </div>
            <div className="ml-auto grid h-16 w-16 place-items-center rounded-full border border-[#8b5cf6]/50 bg-[#8b5cf6]/10 text-lg font-black text-[#a78bfa]">
              89%
            </div>
          </div>

          <p className="mt-6 text-center text-sm leading-7 text-zinc-300">
            “좋은 영화는 마음의 결을 조용히 비춥니다.”
          </p>

          <div className="mt-6 rounded-3xl border border-[#22d3ee]/20 bg-[#22d3ee]/5 p-4">
            <div className="mb-3 flex justify-between">
              <p className="text-sm font-black text-[#67e8f9]">상대의 고유 파편</p>
              <span className="text-[#67e8f9]">{rightShards.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {rightShards.map((tag) => (
                <span key={tag} className="shard-chip border-[#22d3ee]/40 bg-[#22d3ee]/10 text-[#a5f3fc]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function HomePage({ user, watchedFilms, setPage }) {
  return <TasteShardsMatch user={user} watchedFilms={watchedFilms} setPage={setPage} />;
}

function latLonToVector3(lat, lon, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function Earth({ mapFilms = [] }) {
  const safeMapFilms = Array.isArray(mapFilms) ? mapFilms : [];

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 96, 96]} />
        <meshStandardMaterial color="#10294a" roughness={0.72} metalness={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.01, 96, 96]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.13} />
      </mesh>

      {safeMapFilms.map((film) => {
        const [x, y, z] = latLonToVector3(film.lat, film.lon, 2.08);

        return (
          <group key={film.id || film.title} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color={film.color || "#ff4fa3"} />
            </mesh>
            <Html distanceFactor={7}>
              <div className="marker-card" style={{ borderColor: film.color || "#ff4fa3" }}>
                <div className="text-[10px] font-black" style={{ color: film.color || "#ff4fa3" }}>
                  {film.score || 80}
                </div>
                <div className="whitespace-nowrap text-[10px] text-white">{film.title}</div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function CinemaMapPage({ watchedFilms = [] }) {
  const safeFilms = Array.isArray(watchedFilms) ? watchedFilms : [];
  const mapFilms = safeFilms.map(normaliseFilm);
  const stats = getStats(safeFilms);

  return (
    <div className="grid gap-5 xl:grid-cols-[280px_1fr_340px]">
      <div className="space-y-5">
        <Card className="p-5">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#c084fc]">
            Taste DNA
          </p>
          <h3 className="mt-2 text-xl font-black text-white">당신을 설명하는 키워드</h3>

          <div className="mt-5 space-y-4">
            {(stats.tags.length
              ? stats.tags.slice(0, 7)
              : [{ name: "첫 기록 대기", count: 1 }]
            ).map((tag, index) => {
              const value = Math.max(48, 96 - index * 8);
              const colors = ["#f472b6", "#a855f7", "#67e8f9", "#60a5fa", "#f0c46b", "#c084fc"];

              return (
                <div key={tag.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-zinc-300">{tag.name}</span>
                    <span className="font-black text-white">{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${value}%`, background: colors[index % colors.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#f0c46b]">
            Map Summary
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["기록한 영화", mapFilms.length],
              ["선호 감독", stats.directors.length],
              ["탐험 국가", stats.countries.length],
              ["참여 영화제", "-"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="relative min-h-[650px] overflow-hidden p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-[.18em] text-white">CINEMA MAP</h2>
            <p className="mt-1 text-sm text-zinc-500">
              실제 국가 좌표 위에 내가 선택한 영화가 표시됩니다.
            </p>
          </div>
        </div>

        <div className="relative h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-black">
          <div className="absolute inset-0 starfield opacity-50" />
          <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
            <ambientLight intensity={1.4} />
            <pointLight position={[5, 5, 5]} intensity={2} />
            <Stars radius={80} depth={50} count={1000} factor={4} fade speed={1} />
            <Earth mapFilms={mapFilms} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="p-5">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#f0c46b]">
            Intersections
          </p>
          <h3 className="mt-2 text-xl font-black text-white">교집합 분석</h3>

          <div className="mt-4 space-y-4">
            {mapFilms.slice(0, 4).map((film) => (
              <div key={film.id || film.title} className="rounded-2xl border border-white/10 bg-white/[.03] p-3">
                <div className="flex items-center gap-3">
                  <MiniPoster title={film.title} color={film.color || "#ff4fa3"} className="h-16 w-12 shrink-0" />
                  <div className="flex-1">
                    <p className="font-black text-white">{film.title}</p>
                    <p className="text-xs text-zinc-500">{film.director}</p>
                  </div>
                  <p className="font-black" style={{ color: film.color || "#ff4fa3" }}>
                    {film.score || "-"}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xl font-black text-white">Similar Users</h3>
          <div className="mt-4 space-y-3">
            {["film_digger_83", "무비토리", "cinephile_j"].map((name, index) => (
              <div key={name} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-900" />
                <div className="flex-1">
                  <p className="text-sm font-black text-white">{name}</p>
                  <p className="text-xs text-zinc-500">취향이 비슷한 사용자</p>
                </div>
                <span className="text-sm text-zinc-300">{92 - index * 3}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MyPage({ user, setUser, watchedFilms = [], setWatchedFilms }) {
  const safeFilms = Array.isArray(watchedFilms) ? watchedFilms : [];
  const [form, setForm] = useState({
    title: "",
    director: "",
    country: "",
    year: "",
    rating: "",
    tags: "",
    memo: "",
    status: "봤어요",
  });

  const stats = getStats(safeFilms);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addFilm(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("영화 제목은 필수입니다.");
      return;
    }

    const coords = countryCoords[form.country] || { lat: 20, lon: 100 };

    const newFilm = {
      ...form,
      id: `film-${Date.now()}`,
      lat: coords.lat,
      lon: coords.lon,
      color: pickColor(form.country || form.title),
      score: Math.min(Math.round(Number(form.rating || 4) * 20), 100),
      createdAt: new Date().toLocaleString("ko-KR"),
    };

    const next = [newFilm, ...safeFilms];
    setWatchedFilms(next);
    saveLocal(`cinepaze_watched_${user.id}`, next);

    setForm({
      title: "",
      director: "",
      country: "",
      year: "",
      rating: "",
      tags: "",
      memo: "",
      status: "봤어요",
    });
  }

  function logout() {
    localStorage.removeItem("cinepaze_current_user");
    setUser(null);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <div className="space-y-5">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#f472b6] to-[#f0c46b]" />
            <div>
              <p className="text-3xl font-black text-white">{user.nickname}</p>
              <p className="text-sm text-zinc-500">@{user.id}</p>
              <p className="mt-1 text-xs text-zinc-600">가입일 {user.createdAt}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["기록 영화", safeFilms.length],
              ["취향 태그", stats.tags.length],
              ["감독", stats.directors.length],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </div>

          <button onClick={logout} className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[.035] px-5 py-3 text-sm font-black text-zinc-300">
            로그아웃
          </button>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-black text-white">취향 키워드</h3>
          {stats.tags.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              아직 취향 키워드가 없습니다. 본 영화를 기록하면 태그가 이곳에 쌓입니다.
            </p>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              {stats.tags.slice(0, 12).map((tag) => (
                <span key={tag.name} className="rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 px-3 py-2 text-xs font-black text-[#d8b4fe]">
                  #{tag.name} {tag.count}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="space-y-5">
        <Card className="p-6">
          <h2 className="text-3xl font-black tracking-[.18em] text-white">MY PAGE</h2>
          <p className="mt-2 text-sm text-zinc-500">
            내가 본 영화가 나의 프로필과 취향 지도를 만듭니다.
          </p>

          <form onSubmit={addFilm} className="mt-6 grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="영화 제목" value={form.title} onChange={(e) => update("title", e.target.value)} />
            <input className="input" placeholder="감독" value={form.director} onChange={(e) => update("director", e.target.value)} />
            <input className="input" placeholder="국가 예: 한국, 일본, 홍콩" value={form.country} onChange={(e) => update("country", e.target.value)} />
            <input className="input" placeholder="연도" value={form.year} onChange={(e) => update("year", e.target.value)} />
            <select className="input" value={form.rating} onChange={(e) => update("rating", e.target.value)}>
              <option value="">평점 선택</option>
              <option value="5">5점</option>
              <option value="4.5">4.5점</option>
              <option value="4">4점</option>
              <option value="3.5">3.5점</option>
              <option value="3">3점</option>
              <option value="2">2점</option>
              <option value="1">1점</option>
            </select>
            <select className="input" value={form.status} onChange={(e) => update("status", e.target.value)}>
              <option value="봤어요">봤어요</option>
              <option value="보고 싶어요">보고 싶어요</option>
              <option value="다시 볼 영화">다시 볼 영화</option>
            </select>
            <input className="input md:col-span-2" placeholder="태그 예: 고독, 가족, 계급, 기억" value={form.tags} onChange={(e) => update("tags", e.target.value)} />
            <textarea className="input resize-none md:col-span-2" rows={4} placeholder="짧은 감상 메모" value={form.memo} onChange={(e) => update("memo", e.target.value)} />
            <button className="md:col-span-2 rounded-2xl bg-white px-5 py-4 text-sm font-black text-black">
              내 영화 기록하기
            </button>
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-black text-white">내가 본 영화</h3>
          {safeFilms.length === 0 ? (
            <div className="mt-6 grid min-h-[260px] place-items-center rounded-3xl border border-white/10 bg-white/[.025] p-10 text-center">
              <div>
                <Film className="mx-auto text-zinc-600" size={42} />
                <p className="mt-4 text-xl font-black text-white">아직 기록한 영화가 없습니다.</p>
                <p className="mt-2 text-sm text-zinc-500">첫 영화를 기록하면 취향 맵이 생성됩니다.</p>
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {safeFilms.map((film) => (
                <div key={film.id} className="rounded-3xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex gap-4">
                    <MiniPoster title={film.title} color={film.color} className="h-24 w-20 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-black text-white">{film.title}</p>
                      <p className="text-xs text-zinc-500">
                        {film.director} · {film.country} · {film.year}
                      </p>
                      <p className="mt-2 text-sm text-[#f0c46b]">★ {film.rating || "-"} · {film.status}</p>
                    </div>
                  </div>

                  {film.memo && <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-400">{film.memo}</p>}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {getTags(film).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/[.06] px-2 py-1 text-[10px] text-zinc-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function DiggingPage() {
  return (
    <div className="space-y-5">
      <PageTitle title="DEEP DIGGING" desc="파고들수록 연결되는 영화의 깊은 결" />

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-black text-white">오늘의 디깅 루트</p>
          <div className="flex flex-wrap gap-2">
            {["루트 생성", "무드 선택", "감독", "시대", "국가", "장르"].map((item) => (
              <button key={item} className="rounded-xl border border-white/10 bg-white/[.035] px-4 py-2 text-xs font-bold text-zinc-400">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-6">
          {[
            ["DIRECTOR", "왕가위", "Wong Kar-wai", "#ff4fa3"],
            ["THEME", "고독", "Loneliness", "#a855f7"],
            ["GENRE", "홍콩 누아르", "HK Noir", "#f0c46b"],
            ["FILM 1", "화양연화", "In the Mood for Love", "#ff4fa3"],
            ["FILM 2", "중경삼림", "Chungking Express", "#34d399"],
            ["FILM 3", "아비정전", "Days of Being Wild", "#60a5fa"],
          ].map(([top, title, sub, color], index) => (
            <div key={title} className="relative">
              {index !== 0 && <div className="absolute -left-4 top-1/2 hidden h-px w-4 bg-[#f0c46b]/40 md:block" />}
              <div className="rounded-3xl border border-white/10 bg-white/[.035] p-3">
                <MiniPoster title={title} color={color} className="h-28 w-full" />
                <p className="mt-3 text-[10px] font-black tracking-widest" style={{ color }}>{top}</p>
                <p className="font-black text-white">{title}</p>
                <p className="text-xs text-zinc-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ReviewsPage() {
  const [active, setActive] = useState("한줄평");

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <div>
        <PageTitle title="CRITICAL STREAMS" desc="다양한 시선의 영화 글을 한 곳에서 분리해서 읽습니다." />

        <Card className="mt-5 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {reviewCards.map((review) => (
              <button
                key={review.type}
                onClick={() => setActive(review.type)}
                className={cls(
                  "flex items-center gap-3 border-b border-r border-white/10 px-5 py-5 text-left transition",
                  active === review.type ? "bg-white/[.08]" : "bg-white/[.02] hover:bg-white/[.05]"
                )}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10" style={{ color: review.color }}>
                  {review.locked ? <Lock size={22} /> : <BookOpen size={22} />}
                </div>
                <div>
                  <p className="font-black text-white">{review.type}</p>
                  <p className="text-xs text-zinc-500">{review.locked ? "관람 후 열람" : "분리된 글 유형"}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {reviewCards.map((review) => (
            <Card key={review.type} className="p-5">
              <div className="flex gap-4">
                <MiniPoster title={review.movie} color={review.color} className="h-24 w-20 shrink-0" />
                <div>
                  <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: `${review.color}22`, color: review.color }}>
                    {review.type}
                  </span>
                  <h3 className="mt-3 text-xl font-black text-white">{review.title}</h3>
                  <p className="mt-1 text-xs text-zinc-500">{review.movie}</p>
                </div>
              </div>
              <p className={cls("mt-4 text-sm leading-7 text-zinc-400", review.locked && "blur-[2px]")}>{review.body}</p>
              {review.locked && (
                <button className="mt-4 rounded-xl border border-[#fb7185]/30 bg-[#fb7185]/10 px-4 py-2 text-xs font-black text-[#fb7185]">
                  감상 후 열람
                </button>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <Card className="p-5">
          <h3 className="text-xl font-black text-white">트렌딩 분석글</h3>
          <div className="mt-4 space-y-4">
            {["봉준호 영화의 공간 윤리학", "히치콕 서스펜스의 구조적 장치", "느와르와 네오누아르의 경계에서"].map((title, index) => (
              <div key={title} className="flex items-center gap-3">
                <span className="text-xl font-black text-[#f0c46b]">{index + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-zinc-500">likes {312 - index * 38}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xl font-black text-white">글 생성하기</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            한줄평, 프리뷰, 리뷰, 분석글, 스포일러 비평 중 하나를 선택해 게시합니다.
          </p>
          <button className="mt-4 w-full rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">
            새 글 작성
          </button>
        </Card>
      </div>
    </div>
  );
}

function MatchPage() {
  const [messages, setMessages] = useState([
    { from: "other", film: sampleFilms[0], note: "이 영화 좋아하실 것 같아요." },
    { from: "me", film: sampleFilms[2], note: "이것도 취향 결이 맞을 것 같아요." },
  ]);

  function sendFilm(film) {
    setMessages((prev) => [...prev, { from: "me", film, note: "이 영화 카드도 보내볼게요." }]);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <div className="space-y-5">
        <PageTitle title="잘 맞는 시네필" desc="사적인 대화 없이, 영화 카드만 주고받는 매칭" />

        {[
          ["김나라", "서울 · 영화학도", 92, ["왕가위", "고레에다", "홍콩 누아르", "가족 드라마"]],
          ["민준우", "부산 · 영상 편집자", 87, ["박찬욱", "봉준호", "미장센", "SF"]],
          ["서윤", "독립영화 관객", 84, ["일본 영화", "가족", "상실", "침묵"]],
        ].map(([name, meta, score, tags]) => (
          <Card key={name} className="p-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#f0c46b] to-[#a855f7]" />
              <div className="flex-1">
                <p className="text-xl font-black text-white">{name}</p>
                <p className="text-xs text-zinc-500">{meta}</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-full border border-[#ff4fa3]/50 bg-[#ff4fa3]/10 text-xl font-black text-[#ff4fa3]">
                {score}%
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>

            <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ff4fa3] px-5 py-3 text-sm font-black text-white">
              영화 대화 시작
            </button>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-xl font-black text-white">김나라 <span className="text-[#ff4fa3]">92%</span></p>
            <p className="text-xs text-zinc-500">영화 카드만 보낼 수 있는 대화입니다.</p>
          </div>
          <button className="rounded-xl border border-white/10 bg-white/[.03] p-2 text-zinc-300">
            <X size={18} />
          </button>
        </div>

        <div className="h-[520px] space-y-6 overflow-y-auto p-5">
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-center text-sm text-zinc-400">
            사적인 대화 없이 추천 영화, 감독, 리스트 카드만 공유할 수 있어요.
          </div>

          {messages.map((message, index) => (
            <div key={`${message.film.title}-${index}`} className={cls("flex", message.from === "me" ? "justify-end" : "justify-start")}>
              <div className="max-w-[82%] rounded-[28px] border border-white/10 bg-white/[.04] p-4">
                <div className="flex gap-4">
                  <MiniPoster title={message.film.title} color={message.film.color} className="h-32 w-24 shrink-0" />
                  <div>
                    <p className="text-lg font-black text-white">{message.film.title}</p>
                    <p className="text-xs text-zinc-500">{message.film.year} · {message.film.director}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{message.note}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {getTags(message.film).map((tag) => (
                        <span key={tag} className="rounded-full bg-white/[.06] px-2 py-1 text-[10px] text-zinc-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {sampleFilms.map((film) => (
              <button
                key={film.id}
                onClick={() => sendFilm(film)}
                className="min-w-[150px] rounded-2xl border border-white/10 bg-white/[.03] p-3 text-left hover:bg-white/[.07]"
              >
                <p className="font-black text-white">{film.title}</p>
                <p className="text-xs text-zinc-500">{film.director}</p>
              </button>
            ))}
            <button className="grid min-w-[44px] place-items-center rounded-2xl bg-[#ff4fa3] text-white">
              <Send size={18} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoPage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
      <section>
        <PageTitle
          title="FESTIVAL INFO"
          desc="영화제 정보는 임의로 채우지 않고, 사용자가 직접 등록한 정보만 보여줍니다."
        />

        <Card className="mt-5 grid min-h-[520px] place-items-center p-10 text-center">
          <div>
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-white/[.03] text-[#f0c46b]">
              <Trophy size={42} />
            </div>
            <h3 className="mt-6 text-3xl font-black text-white">
              아직 등록된 영화제 정보가 없습니다.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-500">
              출품작, 노미네이트, 역대 수상작은 사용자가 직접 찾아 입력합니다.
            </p>
          </div>
        </Card>
      </section>

      <Card className="p-5">
        <h3 className="text-xl font-black text-white">영화제 정보 등록</h3>
        <div className="mt-5 space-y-3">
          {["영화제명", "개최 기간", "개최 지역", "공식 홈페이지 URL"].map((placeholder) => (
            <input key={placeholder} placeholder={placeholder} className="input" />
          ))}
          <textarea placeholder="영화제 설명" rows={4} className="input resize-none" />
          <textarea placeholder="출품작 목록" rows={3} className="input resize-none" />
          <textarea placeholder="노미네이트 정보" rows={3} className="input resize-none" />
          <textarea placeholder="역대 수상작 / 수상 정보" rows={3} className="input resize-none" />
          <button className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">
            정보 등록하기
          </button>
        </div>
      </Card>
    </div>
  );
}

function CrewPage() {
  return (
    <div className="space-y-5">
      <PageTitle title="CREWS" desc="팔로잉보다 친밀한 취향 기반 영화 크루" />

      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["홍콩 누아르 클럽", "왕가위, 도시, 밤, 실연", "92%"],
          ["고레에다 가족 드라마", "가족, 상실, 일본영화", "88%"],
          ["스포일러 비평 독서회", "분석글, 결말, 비평", "81%"],
        ].map(([title, desc, score]) => (
          <Card key={title} className="p-5">
            <p className="text-2xl font-black text-white">{title}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-500">{desc}</p>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-xs text-zinc-500">나와의 교집합</p>
                <p className="text-4xl font-black text-[#f0c46b]">{score}</p>
              </div>
              <button className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-bold text-white">
                입장
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PageTitle({ title, desc }) {
  return (
    <div>
      <h2 className="text-3xl font-black tracking-[.18em] text-white">{title}</h2>
      <p className="mt-2 text-sm text-zinc-500">{desc}</p>
    </div>
  );
}

export default function Page() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [watchedFilms, setWatchedFilms] = useState([]);

  useEffect(() => {
    const savedUser = loadLocal("cinepaze_current_user", null);

    if (savedUser) {
      setUser(savedUser);
      const savedFilms = loadLocal(`cinepaze_watched_${savedUser.id}`, []);
      setWatchedFilms(Array.isArray(savedFilms) ? savedFilms : []);
    }
  }, []);

  const current = useMemo(() => {
    if (!user) return null;

    if (page === "home") {
      return <HomePage user={user} watchedFilms={watchedFilms} setPage={setPage} />;
    }

    if (page === "digging") return <DiggingPage />;
    if (page === "reviews") return <ReviewsPage />;
    if (page === "map") return <CinemaMapPage watchedFilms={watchedFilms} />;
    if (page === "info") return <InfoPage />;
    if (page === "match") return <MatchPage />;
    if (page === "crew") return <CrewPage />;

    if (page === "mypage") {
      return (
        <MyPage
          user={user}
          setUser={setUser}
          watchedFilms={watchedFilms}
          setWatchedFilms={setWatchedFilms}
        />
      );
    }

    return <HomePage user={user} watchedFilms={watchedFilms} setPage={setPage} />;
  }, [page, user, watchedFilms]);

  if (!user) {
    return <AuthGate setUser={setUser} setWatchedFilms={setWatchedFilms} />;
  }

  if (!user.onboarded) {
    return <Onboarding user={user} setUser={setUser} setWatchedFilms={setWatchedFilms} />;
  }

  return (
    <main className="min-h-screen bg-[#03050a] text-white">
      <Header user={user} />
      <div className="mx-auto flex max-w-[1800px]">
        <SideNav page={page} setPage={setPage} user={user} watchedFilms={watchedFilms} />
        <section className="min-w-0 flex-1 px-4 pb-28 pt-5 md:px-7 lg:pb-8">
          {current}
        </section>
      </div>
      <MobileNav page={page} setPage={setPage} />
    </main>
  );
}