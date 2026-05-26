"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import {
  Search,
  Bell,
  Home,
  Compass,
  MessageSquareText,
  Globe2,
  Sparkles,
  Heart,
  Users,
  Plus,
  Lock,
  Send,
  Film,
  BookOpen,
  Eye,
  Map,
  Layers,
  Trophy,
  ChevronRight,
  X,
} from "lucide-react";

const films = [
  {
    title: "화양연화",
    sub: "In the Mood for Love",
    director: "왕가위",
    country: "홍콩",
    year: "2000",
    lat: 22.3193,
    lon: 114.1694,
    score: 95,
    color: "#ff4fa3",
    tags: ["고독", "기억", "느린 호흡"],
  },
  {
    title: "중경삼림",
    sub: "Chungking Express",
    director: "왕가위",
    country: "홍콩",
    year: "1994",
    lat: 22.3193,
    lon: 114.1694,
    score: 91,
    color: "#a855f7",
    tags: ["도시", "실연", "속도"],
  },
  {
    title: "아무도 모른다",
    sub: "Nobody Knows",
    director: "고레에다 히로카즈",
    country: "일본",
    year: "2004",
    lat: 35.6762,
    lon: 139.6503,
    score: 92,
    color: "#38bdf8",
    tags: ["가족", "상실", "침묵"],
  },
  {
    title: "기생충",
    sub: "Parasite",
    director: "봉준호",
    country: "한국",
    year: "2019",
    lat: 37.5665,
    lon: 126.978,
    score: 93,
    color: "#facc15",
    tags: ["계급", "공간", "사회비판"],
  },
  {
    title: "헤어질 결심",
    sub: "Decision to Leave",
    director: "박찬욱",
    country: "한국",
    year: "2022",
    lat: 35.1796,
    lon: 129.0756,
    score: 89,
    color: "#fb7185",
    tags: ["욕망", "미스터리", "안개"],
  },
  {
    title: "어느 가족",
    sub: "Shoplifters",
    director: "고레에다 히로카즈",
    country: "일본",
    year: "2018",
    lat: 35.6762,
    lon: 139.6503,
    score: 90,
    color: "#34d399",
    tags: ["가족", "윤리", "빈곤"],
  },
];

const reviewCards = [
  {
    type: "한줄평",
    icon: MessageSquareText,
    title: "빛보다 오래 남는 고독",
    movie: "화양연화",
    body: "사랑은 시작보다 끝난 뒤의 잔향이 더 오래간다.",
    color: "#c084fc",
    meta: "10초 읽기",
    locked: false,
  },
  {
    type: "프리뷰",
    icon: Eye,
    title: "보기 전 알아두면 좋은 감정의 입구",
    movie: "아무도 모른다",
    body: "이 영화는 사건보다 방치된 시간의 밀도를 보는 작품입니다.",
    color: "#67e8f9",
    meta: "2분 읽기",
    locked: false,
  },
  {
    type: "리뷰",
    icon: BookOpen,
    title: "도시의 속도와 마음의 지연",
    movie: "중경삼림",
    body: "왕가위의 인물들은 늘 지나간 마음을 붙잡으려 하지만, 도시는 그보다 빠르게 움직입니다.",
    color: "#34d399",
    meta: "4분 읽기",
    locked: false,
  },
  {
    type: "분석글",
    icon: Layers,
    title: "원작을 넘어선 서사 구조의 재설계",
    movie: "기생충",
    body: "계단과 문, 지하와 지상을 통해 계급의 수직 구조가 시각적으로 배열됩니다.",
    color: "#f0c46b",
    meta: "8분 읽기",
    locked: false,
  },
  {
    type: "스포일러 비평",
    icon: Lock,
    title: "마지막 장면의 의미",
    movie: "헤어질 결심",
    body: "결말을 포함한 긴 비평입니다. 관람 후 열람하는 것을 권장합니다.",
    color: "#fb7185",
    meta: "11분 읽기",
    locked: true,
  },
];

const nav = [
  { id: "match", label: "매칭", icon: Heart },
  { id: "digging", label: "디깅", icon: Compass },
  { id: "reviews", label: "리뷰", icon: MessageSquareText },
  { id: "map", label: "시네마 맵", icon: Globe2 },
  { id: "info", label: "정보", icon: Trophy },
  { id: "crew", label: "크루", icon: Users },
];

function cls(...v) {
  return v.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return (
    <div
      className={cls(
        "rounded-[28px] border border-white/10 bg-[#0b0f16]/80 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-xl",
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
      className={cls(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900",
        className
      )}
      style={{
        background: `radial-gradient(circle at 35% 20%, ${color}99, transparent 35%), linear-gradient(135deg,#111827,#020617 70%)`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.9),transparent_60%)]" />
      <p className="absolute bottom-2 left-2 right-2 line-clamp-2 text-xs font-black text-white">
        {title}
      </p>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#03050a]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1800px] items-center gap-5 px-4 py-3 md:px-7">
        <div>
          <h1 className="font-serif text-3xl font-black tracking-tight text-white">
            cinepaze
          </h1>
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
            placeholder="영화, 감독, 비평 검색하세요"
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
          <span className="hidden text-sm font-bold text-white sm:block">김나라</span>
        </div>
      </div>
    </header>
  );
}

function SideNav({ page, setPage }) {
  return (
    <aside className="sticky top-[73px] hidden h-[calc(100vh-73px)] w-[225px] shrink-0 border-r border-white/10 bg-[#05070d]/80 p-4 lg:block">
      <button
        onClick={() => setPage("home")}
        className={cls(
          "mb-2 flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition",
          page === "home"
            ? "bg-[#f0c46b]/10 text-[#f0c46b]"
            : "text-zinc-400 hover:bg-white/[.04] hover:text-white"
        )}
      >
        <Home size={20} />
        <div>
          <p className="text-sm font-black">홈</p>
          <p className="text-[10px] tracking-widest text-zinc-500">HOME</p>
        </div>
      </button>

      {nav.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={cls(
              "mb-2 flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition",
              page === item.id
                ? "bg-gradient-to-r from-[#a855f7]/25 to-transparent text-white shadow-[inset_3px_0_0_#c084fc]"
                : "text-zinc-400 hover:bg-white/[.04] hover:text-white"
            )}
          >
            <Icon size={20} />
            <div>
              <p className="text-sm font-black">{item.label}</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                {item.id}
              </p>
            </div>
          </button>
        );
      })}

      <div className="mt-10 border-t border-white/10 pt-6">
        <p className="mb-3 text-xs font-black uppercase tracking-[.25em] text-zinc-500">
          Quick Add
        </p>
        <button className="mb-2 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-left text-sm text-zinc-300">
          <Plus size={16} /> 보고 싶은 영화
        </button>
        <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-3 text-left text-sm text-zinc-300">
          <Plus size={16} /> 기록하기
        </button>
      </div>

      <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-white/10 bg-white/[.035] p-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#f472b6] to-[#f0c46b]" />
          <div>
            <p className="font-black text-white">김나라</p>
            <p className="text-xs text-zinc-500">필름 디거 Lv.12</p>
          </div>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-[#f0c46b]" />
        </div>
        <p className="mt-2 text-xs text-zinc-500">EXP 3,420 / 5,000</p>
      </div>
    </aside>
  );
}

function MobileNav({ page, setPage }) {
  const items = [
    { id: "home", label: "홈", icon: Home },
    { id: "digging", label: "디깅", icon: Compass },
    { id: "reviews", label: "리뷰", icon: MessageSquareText },
    { id: "map", label: "맵", icon: Globe2 },
    { id: "match", label: "매칭", icon: Heart },
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
                "rounded-2xl px-2 py-2 text-xs font-bold",
                page === item.id ? "bg-white text-black" : "text-zinc-500"
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

function TasteShardsMatch({ setPage }) {
  const left = ["왕가위", "홍콩 누아르", "가족 드라마", "기억", "1990s", "느린 호흡"];
  const right = ["고레에다", "일본 영화", "한국 영화", "아트하우스", "섬세한 연출", "자연의 미학"];
  const center = ["고독", "기억", "가족 드라마", "느린 호흡", "칸", "BIFF"];

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
          부서진 빛의 조각들이 만나듯, 당신의 영화 취향과 상대의 취향을 파편 단위로 맞춥니다.
        </p>
      </div>

      <div className="relative z-10 mt-10 grid gap-5 xl:grid-cols-[300px_1fr_300px]">
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#f472b6] to-[#f0c46b]" />
            <div>
              <p className="text-2xl font-black text-white">김나래</p>
              <p className="text-sm text-zinc-500">cinephile</p>
            </div>
            <div className="ml-auto grid h-16 w-16 place-items-center rounded-full border border-[#ff4fa3]/50 bg-[#ff4fa3]/10 text-lg font-black text-[#ff4fa3]">
              92%
            </div>
          </div>

          <p className="mt-6 text-center text-sm leading-7 text-zinc-300">
            “느린 호흡의 영화 속에서 삶의 결을 발견해요.”
          </p>

          <div className="mt-6 rounded-3xl border border-[#a855f7]/20 bg-[#a855f7]/5 p-4">
            <div className="mb-3 flex justify-between">
              <p className="text-sm font-black text-[#c084fc]">나의 고유 파편</p>
              <span className="text-[#c084fc]">8</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {left.map((v) => (
                <span key={v} className="shard-chip border-[#a855f7]/40 bg-[#a855f7]/10 text-[#d8b4fe]">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <div className="relative min-h-[420px]">
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f0c46b]/40 bg-[#f0c46b]/10 shadow-[0_0_120px_rgba(240,196,107,.42)]" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          {[
            ["왕가위", "left-[15%] top-[18%]", "#ff4fa3"],
            ["홍콩 누아르", "left-[13%] top-[35%]", "#a855f7"],
            ["가족 드라마", "left-[22%] top-[55%]", "#f0c46b"],
            ["기억", "left-[35%] top-[31%]", "#f472b6"],
            ["고독", "left-[45%] top-[18%]", "#f0c46b"],
            ["느린 호흡", "left-[43%] top-[55%]", "#c084fc"],
            ["칸", "left-[50%] top-[76%]", "#fb7185"],
            ["BIFF", "left-[61%] top-[66%]", "#fb7185"],
            ["고레에다", "left-[69%] top-[18%]", "#67e8f9"],
            ["일본 영화", "left-[78%] top-[35%]", "#22d3ee"],
            ["한국 영화", "left-[74%] top-[53%]", "#34d399"],
            ["아트하우스", "left-[67%] top-[74%]", "#67e8f9"],
          ].map(([text, pos, color]) => (
            <div
              key={text}
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
            “좋은 영화는 마음의 검은 바닥을 조용히 비춰요.”
          </p>

          <div className="mt-6 rounded-3xl border border-[#22d3ee]/20 bg-[#22d3ee]/5 p-4">
            <div className="mb-3 flex justify-between">
              <p className="text-sm font-black text-[#67e8f9]">상대의 고유 파편</p>
              <span className="text-[#67e8f9]">7</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {right.map((v) => (
                <span key={v} className="shard-chip border-[#22d3ee]/40 bg-[#22d3ee]/10 text-[#a5f3fc]">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="relative z-10 mt-6 grid gap-4 xl:grid-cols-3">
        <Card className="p-5">
          <p className="text-xl font-black text-[#f0c46b]">추천 교환</p>
          <div className="mt-4 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[.04] p-3">
            <MiniPoster title="해피 투게더" color="#34d399" className="h-20 w-16" />
            <div className="flex-1">
              <p className="font-black text-white">해피 투게더</p>
              <p className="text-xs text-zinc-500">왕가위 · 1997</p>
            </div>
            <div className="text-2xl text-[#ff4fa3]">↔</div>
            <MiniPoster title="어느 가족" color="#60a5fa" className="h-20 w-16" />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xl font-black text-[#f0c46b]">영화로만 대화</p>
          <div className="mt-4 space-y-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3 text-sm text-zinc-300">
              “가족 드라마에서 가장 마음에 남는 장면은?”
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3 text-sm text-zinc-300">
              “기억을 다룬 영화 중 가장 슬펐던 작품은?”
            </div>
          </div>
          <button
            onClick={() => setPage("match")}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ff4fa3] px-5 py-3 text-sm font-black text-white"
          >
            영화 대화 시작
          </button>
        </Card>

        <Card className="p-5">
          <p className="text-xl font-black text-[#f0c46b]">이 파편들이 맞는 이유</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {[
              ["감정 결 유사도", "91%", "고독, 기억의 정서 코드"],
              ["선호 장르 유사도", "84%", "드라마, 아트하우스 중심"],
              ["시대/톤 유사도", "82%", "90s 감성, 느린 호흡"],
            ].map(([a, b, c]) => (
              <div key={a} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <p className="text-sm text-zinc-400">{a}</p>
                <p className="mt-1 text-2xl font-black text-[#f0c46b]">{b}</p>
                <p className="text-xs text-zinc-500">{c}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
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
            {["루트 생성", "무드 선택", "감독", "시대", "국가", "장르"].map((v) => (
              <button key={v} className="rounded-xl border border-white/10 bg-white/[.035] px-4 py-2 text-xs font-bold text-zinc-400">
                {v}
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
          ].map(([top, title, sub, color], idx) => (
            <div key={title} className="relative">
              {idx !== 0 && <div className="absolute -left-4 top-1/2 hidden h-px w-4 bg-[#f0c46b]/40 md:block" />}
              <div className="rounded-3xl border border-white/10 bg-white/[.035] p-3">
                <MiniPoster title={title} color={color} className="h-28 w-full" />
                <p className="mt-3 text-[10px] font-black tracking-widest" style={{ color }}>
                  {top}
                </p>
                <p className="font-black text-white">{title}</p>
                <p className="text-xs text-zinc-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="p-5">
            <PanelTitle title="숨은 영화 발견" />
            <div className="mt-4 space-y-3">
              {films.slice(1, 5).map((film) => (
                <div key={film.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-3">
                  <MiniPoster title={film.title} color={film.color} className="h-16 w-14" />
                  <div className="flex-1">
                    <p className="font-black text-white">{film.title}</p>
                    <p className="text-xs text-zinc-500">{film.year} · {film.country}</p>
                  </div>
                  <span className="text-sm text-[#f0c46b]">★ 4.{Math.floor(film.score / 10)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <PanelTitle title="감정으로 파고들기" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["기억", "고독", "사랑", "상실", "갈망", "불안"].map((v, idx) => (
                <div key={v} className="rounded-3xl border border-white/10 p-4 h-28"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${["#ff4fa3", "#a855f7", "#fb7185", "#60a5fa", "#f0c46b", "#34d399"][idx]}55, transparent 45%), #0b0f16` }}>
                  <p className="font-black text-white">{v}</p>
                  <p className="mt-1 text-xs text-zinc-500">{80 + idx * 19} 작품</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 md:col-span-2">
            <PanelTitle title="장면 / 미장센 탐험" />
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {["네온", "비 오는 밤", "좁은 골목", "스모키 룸", "창가", "거울", "시간의 잔상"].map((v, idx) => (
                <div key={v} className="h-36 min-w-56 rounded-3xl border border-white/10 p-4"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${["#ff4fa3", "#60a5fa", "#f0c46b", "#a855f7"][idx % 4]}55, transparent 45%), linear-gradient(135deg,rgba(255,255,255,.05),rgba(0,0,0,.5))` }}>
                  <p className="font-black text-white">{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <PanelTitle title="왜 이 영화가 이어지는가" />
          <div className="mt-4 space-y-4">
            {[
              ["시간의 비선형성", "기억과 현재가 교차하는 서사"],
              ["도시의 정서", "홍콩이라는 공간이 인물의 감정을 증폭"],
              ["감각적 미장센", "빛, 색, 음악, 리듬"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                <p className="font-black text-white">{a}</p>
                <p className="mt-1 text-sm text-zinc-500">{b}</p>
              </div>
            ))}
            <button className="w-full rounded-2xl border border-[#f0c46b]/40 bg-[#f0c46b]/10 px-5 py-3 text-sm font-black text-[#f0c46b]">
              비슷한 결 따라가기 →
            </button>
          </div>
        </Card>
      </div>
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
            {reviewCards.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.type}
                  onClick={() => setActive(r.type)}
                  className={cls(
                    "flex items-center gap-3 border-b border-r border-white/10 px-5 py-5 text-left transition",
                    active === r.type ? "bg-white/[.08]" : "bg-white/[.02] hover:bg-white/[.05]"
                  )}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10" style={{ color: r.color }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-black text-white">{r.type}</p>
                    <p className="text-xs text-zinc-500">
                      {r.locked ? "내용을 포함한 비평" : "분리된 글 유형"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <div className="mt-5 grid gap-4 md:grid-cols-[120px_1fr_1fr]">
          <Card className="p-4">
            <p className="mb-4 text-sm font-black text-white">정렬</p>
            {["최신순", "좋아요순", "긴글순", "짧은글순"].map((v) => (
              <button key={v} className="mb-2 block w-full rounded-xl px-3 py-2 text-left text-sm text-zinc-400 hover:bg-white/[.04]">
                {v}
              </button>
            ))}
          </Card>

          <div className="grid gap-4 md:col-span-2">
            {reviewCards.map((r, idx) => (
              <ReviewBlock key={r.type} data={r} large={idx === 3} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Card className="p-5">
          <PanelTitle title="트렌딩 분석글" />
          <div className="mt-4 space-y-4">
            {["봉준호 영화의 공간 윤리학", "히치콕 서스펜스의 구조적 장치", "느와르와 네오누아르의 경계에서", "디카프리오의 선택과 필모그래피"].map((v, idx) => (
              <div key={v} className="flex items-center gap-3">
                <span className="text-xl font-black text-[#f0c46b]">{idx + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{v}</p>
                  <p className="text-xs text-zinc-500">likes {312 - idx * 38}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <PanelTitle title="글 생성하기" />
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

function ReviewBlock({ data, large }) {
  const Icon = data.icon;

  return (
    <Card className={cls("relative overflow-hidden p-5", large && "md:row-span-2")}>
      <div className="flex gap-4">
        <MiniPoster title={data.movie} color={data.color} className={cls("shrink-0", large ? "h-36 w-28" : "h-24 w-20")} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: `${data.color}22`, color: data.color }}>
              {data.type}
            </span>
            {data.locked && <Lock size={14} className="text-[#fb7185]" />}
          </div>
          <h3 className="mt-3 text-xl font-black text-white">{data.title}</h3>
          <p className="mt-1 text-xs text-zinc-500">{data.movie} · {data.meta}</p>
        </div>
        <Icon style={{ color: data.color }} />
      </div>
      <p className={cls("mt-4 text-sm leading-7 text-zinc-400", data.locked && "blur-[2px]")}>{data.body}</p>
      {data.locked && (
        <button className="mt-4 rounded-xl border border-[#fb7185]/30 bg-[#fb7185]/10 px-4 py-2 text-xs font-black text-[#fb7185]">
          감상 후 열람
        </button>
      )}
      <div className="mt-4 flex gap-5 text-xs text-zinc-500">
        <span>♡ {42 + data.title.length}</span>
        <span>□ {data.type.length + 3}</span>
        <span>저장 {data.type.length * 7}</span>
      </div>
    </Card>
  );
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

function Earth() {
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

      {films.map((film) => {
        const [x, y, z] = latLonToVector3(film.lat, film.lon, 2.08);
        return (
          <group key={film.title} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color={film.color} />
            </mesh>
            <Html distanceFactor={7}>
              <div className="marker-card" style={{ borderColor: film.color }}>
                <div className="text-[10px] font-black" style={{ color: film.color }}>
                  {film.score}
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

function CinemaMapPage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[280px_1fr_340px]">
      <div className="space-y-5">
        <Card className="p-5">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#c084fc]">Taste DNA</p>
          <h3 className="mt-2 text-xl font-black text-white">당신을 설명하는 키워드</h3>
          <div className="mt-5 space-y-4">
            {[
              ["가족", 92, "#f472b6"],
              ["고독", 88, "#a855f7"],
              ["기억", 81, "#67e8f9"],
              ["성장", 77, "#60a5fa"],
              ["사회비판", 73, "#f0c46b"],
              ["느린 호흡", 71, "#c084fc"],
            ].map(([a, b, c]) => (
              <div key={a}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-zinc-300">{a}</span>
                  <span className="font-black text-white">{b}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${b}%`, background: c }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#f0c46b]">Map Summary</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["기록한 영화", 512],
              ["선호 감독", 41],
              ["탐험 국가", 28],
              ["참여 영화제", 15],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
                <p className="text-2xl font-black text-white">{b}</p>
                <p className="text-xs text-zinc-500">{a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="relative min-h-[650px] overflow-hidden p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-[.18em] text-white">CINEMA MAP</h2>
            <p className="mt-1 text-sm text-zinc-500">실제 국가 좌표 위에 해당 국가의 영화를 표시합니다.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            {["GLOBE", "GRAPH", "TIMELINE"].map((v, i) => (
              <button key={v} className={cls("rounded-xl border px-4 py-2 text-xs font-black", i === 0 ? "border-[#f0c46b] bg-[#f0c46b]/10 text-[#f0c46b]" : "border-white/10 text-zinc-500")}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-black">
          <div className="absolute inset-0 starfield opacity-50" />
          <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }}>
            <ambientLight intensity={1.4} />
            <pointLight position={[5, 5, 5]} intensity={2} />
            <Stars radius={80} depth={50} count={1000} factor={4} fade speed={1} />
            <Earth />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="p-5">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#f0c46b]">Intersections</p>
          <h3 className="mt-2 text-xl font-black text-white">교집합 분석</h3>
          <div className="mt-4 space-y-4">
            {films.slice(0, 4).map((film) => (
              <div key={film.title} className="rounded-2xl border border-white/10 bg-white/[.03] p-3">
                <div className="flex items-center gap-3">
                  <MiniPoster title={film.title} color={film.color} className="h-16 w-12 shrink-0" />
                  <div className="flex-1">
                    <p className="font-black text-white">{film.title}</p>
                    <p className="text-xs text-zinc-500">{film.director}</p>
                  </div>
                  <p className="font-black" style={{ color: film.color }}>{film.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <PanelTitle title="Similar Users" />
          <div className="mt-4 space-y-3">
            {["film_digger_83", "무비토리", "cinephile_j"].map((u, i) => (
              <div key={u} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-900" />
                <div className="flex-1">
                  <p className="text-sm font-black text-white">{u}</p>
                  <p className="text-xs text-zinc-500">취향이 비슷한 사용자</p>
                </div>
                <span className="text-sm text-zinc-300">{92 - i * 3}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MatchPage() {
  const [messages, setMessages] = useState([
    { from: "other", film: films[0], note: "이 영화 좋아하실 것 같아요." },
    { from: "me", film: films[2], note: "이것도 취향 결이 맞을 것 같아요." },
  ]);

  const sendFilm = (film) => {
    setMessages((prev) => [...prev, { from: "me", film, note: "이 영화 카드도 보내볼게요." }]);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <div className="space-y-5">
        <PageTitle title="잘 맞는 시네필" desc="덜어낸 사적 대화, 영화 카드만 주고받는 매칭" />

        {[
          ["김나라", "서울 · 28세 · 영화학도", 92, ["왕가위", "고레에다", "홍콩 누아르", "가족 드라마"]],
          ["민준우", "부산 · 31세 · 영상 편집자", 87, ["박찬욱", "봉준호", "미장센", "SF"]],
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
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs text-zinc-300">{t}</span>
              ))}
            </div>
            <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ff4fa3] px-5 py-3 text-sm font-black text-white">
              영화 대화 시작 ▶
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
          <button className="rounded-xl border border-white/10 bg-white/[.03] p-2 text-zinc-300"><X size={18} /></button>
        </div>

        <div className="h-[520px] space-y-6 overflow-y-auto p-5">
          <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-center text-sm text-zinc-400">
            사적인 대화 없이 추천 영화, 감독, 리스트 카드만 공유할 수 있어요.
          </div>

          {messages.map((m, idx) => (
            <div key={idx} className={cls("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className="max-w-[82%] rounded-[28px] border border-white/10 bg-white/[.04] p-4">
                <div className="flex gap-4">
                  <MiniPoster title={m.film.title} color={m.film.color} className="h-32 w-24 shrink-0" />
                  <div>
                    <p className="text-lg font-black text-white">{m.film.title}</p>
                    <p className="text-xs text-zinc-500">{m.film.year} · {m.film.director}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{m.note}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.film.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/[.06] px-2 py-1 text-[10px] text-zinc-400">#{tag}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="rounded-xl border border-white/10 bg-white/[.03] px-3 py-2 text-xs text-zinc-300">미리보기</button>
                      <button className="rounded-xl border border-white/10 bg-white/[.03] px-3 py-2 text-xs text-zinc-300">리스트 담기</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="mb-3 flex gap-2">
            {["영화 공유", "감독 공유", "영화제 공유", "리스트 보내기"].map((v, i) => (
              <button key={v} className={cls("rounded-xl border px-4 py-2 text-xs font-black", i === 0 ? "border-[#ff4fa3]/50 bg-[#ff4fa3]/10 text-[#ff4fa3]" : "border-white/10 text-zinc-500")}>
                {v}
              </button>
            ))}
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {films.map((film) => (
              <button key={film.title} onClick={() => sendFilm(film)} className="min-w-[150px] rounded-2xl border border-white/10 bg-white/[.03] p-3 text-left hover:bg-white/[.07]">
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
        <PageTitle title="FESTIVAL INFO" desc="영화제 정보는 임의로 채우지 않고, 사용자가 직접 등록한 정보만 보여줍니다." />
        <Card className="mt-5 grid min-h-[520px] place-items-center p-10 text-center">
          <div>
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-white/[.03] text-[#f0c46b]">
              <Trophy size={42} />
            </div>
            <h3 className="mt-6 text-3xl font-black text-white">아직 등록된 영화제 정보가 없습니다.</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-500">
              출품작, 노미네이트, 역대 수상작은 사용자가 직접 찾아 입력합니다. 지금은 비어 있는 아카이브 상태입니다.
            </p>
          </div>
        </Card>
      </section>

      <Card className="p-5">
        <PanelTitle title="영화제 정보 등록" />
        <div className="mt-5 space-y-3">
          {["영화제명", "개최 기간", "개최 지역", "공식 홈페이지 URL"].map((p) => (
            <input key={p} placeholder={p} className="input" />
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
        ].map(([a, b, c]) => (
          <Card key={a} className="p-5">
            <p className="text-2xl font-black text-white">{a}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-500">{b}</p>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-xs text-zinc-500">나와의 교집합</p>
                <p className="text-4xl font-black text-[#f0c46b]">{c}</p>
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

function HomePage({ setPage }) {
  return (
    <div className="space-y-5">
      <TasteShardsMatch setPage={setPage} />
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

function PanelTitle({ title }) {
  return <h3 className="text-xl font-black text-white">{title}</h3>;
}

export default function Page() {
  const [page, setPage] = useState("home");

  const current = useMemo(() => {
    if (page === "home") return <HomePage setPage={setPage} />;
    if (page === "match") return <MatchPage />;
    if (page === "digging") return <DiggingPage />;
    if (page === "reviews") return <ReviewsPage />;
    if (page === "map") return <CinemaMapPage />;
    if (page === "info") return <InfoPage />;
    if (page === "crew") return <CrewPage />;
    return <HomePage setPage={setPage} />;
  }, [page]);

  return (
    <main className="min-h-screen bg-[#03050a] text-white">
      <Header />
      <div className="mx-auto flex max-w-[1800px]">
        <SideNav page={page} setPage={setPage} />
        <section className="min-w-0 flex-1 px-4 pb-28 pt-5 md:px-7 lg:pb-8">
          {current}
        </section>
      </div>
      <MobileNav page={page} setPage={setPage} />
    </main>
  );
}