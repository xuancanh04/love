"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Volume2, VolumeX } from "lucide-react";

// Bố cục 6 vị trí người với 6 bộ trang phục/tạo dáng hoàn toàn khác nhau:
// CHỈ DUY NHẤT 1 ẢNH ÁO VÀNG, còn lại là Váy trắng, Váy hoa xanh pastel, Váy caro, Áo len trắng, và Bánh kem
const CUTOUT_PORTRAITS = [
  // 1: Phía trên bên trái - Váy hoa xanh pastel
  {
    src: "/person_extra_8.png",
    top: "20%",
    left: "10%",
    width: "w-28 sm:w-32",
    height: "h-36 sm:h-44",
    rotate: "-rotate-6",
    delay: 150,
    zIndex: 25,
  },
  // 2: Phía trên chính giữa - Váy trắng cài hoa hồng lên tóc
  {
    src: "/person_extra_10.png",
    top: "16%",
    left: "35%",
    width: "w-32 sm:w-36",
    height: "h-40 sm:h-48",
    rotate: "rotate-0",
    delay: 300,
    zIndex: 24,
  },
  // 3: Phía trên bên phải - Duy nhất 1 ảnh áo vàng tạo dáng cute chỉ má
  {
    src: "/person_1.png",
    top: "20%",
    left: "60%",
    width: "w-28 sm:w-32",
    height: "h-36 sm:h-44",
    rotate: "rotate-6",
    delay: 450,
    zIndex: 25,
  },
  // 4: Hàng giữa bên trái - Váy caro khoác áo cardigan nâu
  {
    src: "/person_4.png",
    top: "28%",
    left: "8%",
    width: "w-32 sm:w-36",
    height: "h-40 sm:h-48",
    rotate: "-rotate-3",
    delay: 600,
    zIndex: 28,
  },
  // 5: Hàng giữa bên phải - Áo len trắng ấm áp xách túi
  {
    src: "/person_extra_12.png",
    top: "28%",
    left: "58%",
    width: "w-32 sm:w-36",
    height: "h-40 sm:h-48",
    rotate: "rotate-3",
    delay: 750,
    zIndex: 28,
  },
  // 6: Trung tâm chính giữa bó hoa - Váy ren trắng cầm thìa bánh kem & ly nước dưa hấu
  {
    src: "/person_5.png",
    top: "30%",
    left: "29%",
    width: "w-36 sm:w-40",
    height: "h-44 sm:h-52",
    rotate: "rotate-0",
    delay: 900,
    zIndex: 35,
  },
];

export default function Home() {
  // Stage: "opening" (Đang mở món quà...) -> "bouquet" (Bó hoa to)
  const [stage, setStage] = useState<"opening" | "bouquet">("opening");
  // isRevealed: Khi chạm vào bó hoa, hoa ẩn đi và 6 ảnh người hiện lên thay thế
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; top: number; left: number; size: number; delay: number; duration: number }>
  >([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const shootConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#ff4d6d", "#ff758f", "#ffd700", "#ffffff", "#f43f5e"],
      });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const items = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5,
      size: Math.random() * 2 + 1.5,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
    setSparkles(items);

    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }

    const timer = setTimeout(() => {
      setStage("bouquet");
      shootConfetti();
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const handleTap = () => {
    shootConfetti();
    setIsRevealed(!isRevealed);
  };

  return (
    <main
      onClick={handleTap}
      className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black select-none cursor-pointer"
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3"
      />

      {/* Rất ít kim tuyến li ti ở nền */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle opacity-30"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Nút bật/tắt nhạc tinh tế góc phải trên */}
      <div className="absolute top-5 right-5 z-50">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMusic();
          }}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-pink-200 active:scale-90 transition-transform"
          title="Bật/Tắt nhạc"
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/40" />
          )}
        </button>
      </div>

      {/* BƯỚC 1: MÀN HÌNH "Đang mở món quà..." */}
      {stage === "opening" && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black text-center animate-in fade-in duration-300 px-6">
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 animate-gift [mask-image:radial-gradient(circle_at_center,black_60%,transparent_98%)]">
              <Image
                src="/gift-box.jpg"
                alt="Hộp quà"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="mt-2 space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Đang mở món quà...
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                Bạn chờ một chút nhé.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BƯỚC 2 & 3: BÓ HOA TƯƠNG TÁC: HOA BỊ ẨN ĐI -> HÌNH HIỆN LÊN THAY THẾ KHI CHẠM */}
      {stage === "bouquet" && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-700">
          <div className="relative w-full h-full max-w-[480px] mx-auto animate-float-bouquet">
            {/* 1. LỚP BÓ HOA & GIẤY GÓI (Luôn hiển thị cố định: gồm toàn bộ phần giấy gói xung quanh và nơ) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 5 }}
            >
              <Image
                src="/bouquet-wrapper.png"
                alt="Bó hoa và giấy gói"
                fill
                priority
                className="object-contain object-center"
              />
            </div>

            {/* 2. LỚP HOA: Khi chưa bấm thì hiển thị đầy đủ, khi chạm thì MỜ DẦN VÀ ẨN ĐI */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-in-out pointer-events-none"
              style={{
                zIndex: 10,
                opacity: isRevealed ? 0 : 1,
                transform: isRevealed ? "scale(0.85) translateY(-15px)" : "scale(1) translateY(0)",
              }}
            >
              <Image
                src="/bouquet-flowers.png"
                alt="Những bông hoa"
                fill
                priority
                className="object-contain object-center"
              />
            </div>

            {/* 3. LỚP ẢNH NGƯỜI: Khi chạm thì bung nở hiện lên thay thế vị trí hoa */}
            {CUTOUT_PORTRAITS.map((p, idx) => (
              <div
                key={idx}
                className={`absolute pointer-events-none ${p.width} ${p.height} ${p.rotate} transition-all duration-700 ease-out`}
                style={{
                  top: p.top,
                  left: p.left,
                  zIndex: p.zIndex,
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed
                    ? "scale(1) translateY(0)"
                    : "scale(0.4) translateY(40px)",
                  transitionDelay: isRevealed ? `${p.delay}ms` : "0ms",
                  filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.65))",
                }}
              >
                <Image
                  src={p.src}
                  alt={`Người ${idx + 1}`}
                  fill
                  className="object-contain object-bottom pointer-events-none"
                />
              </div>
            ))}

            {/* 4. LỚP GIẤY GÓI VÀ NƠ LỤA PHÍA TRƯỚC (Luôn nằm ở mặt trước, ôm lấy bó hoa và các bức ảnh) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 30 }}
            >
              <Image
                src="/bouquet-wrapper-front.png"
                alt="Giấy gói hoa và nơ phía trước"
                fill
                priority
                className="object-contain object-center"
              />
            </div>
          </div>

          {/* Dòng chữ nhỏ không bọc thẻ ở dưới */}
          <div className="absolute bottom-7 inset-x-0 z-50 flex justify-center">
            <p className="text-xs sm:text-[13px] text-gray-400 font-light tracking-wider animate-pulse">
              {isRevealed ? "Chạm lần nữa để hiện lại hoa" : "Chạm vào bó hoa"}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
