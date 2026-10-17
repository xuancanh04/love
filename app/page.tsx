"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Volume2, VolumeX, ArrowLeft, Rotate3d, Sparkles } from "lucide-react";

// Bố cục 6 vị trí người với 6 bộ trang phục/tạo dáng hoàn toàn khác nhau ở Màn 2:
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

// 12 bức ảnh của bạn nữ
const ALL_12_PHOTOS = [
  "/1792222664012_199433159825831973_2104031773714370770_017a215e3e021bc314246e9d731f3e1b.jpg",
  "/1792222664046_199433159825831973_2104031773714370770_f329f9e93e8bb7b1a71ccef94f6e4f55.jpg",
  "/1792222664065_199433159825831973_2104031773714370770_1c26d3d72e5d594bd7c657eeb9c32b46.jpg",
  "/1792222664080_199433159825831973_2104031773714370770_ef62ed77946440fa4b16ad5da4e7ab0f.jpg",
  "/1792222664091_199433159825831973_2104031773714370770_1c7df139ea3f302b81748b7af94a486c.jpg",
  "/1792222664099_199433159825831973_2104031773714370770_9d08773c99c9b357ddb25ac85e208485.jpg",
  "/1792222664109_199433159825831973_2104031773714370770_017165e6fb12e9817e147d8a7b847494.jpg",
  "/1792222664119_199433159825831973_2104031773714370770_0592306eed6ca6e689f80801159f0469.jpg",
  "/1792222664127_199433159825831973_2104031773714370770_be052c27be36e92ec7b0715944ca2ed1.jpg",
  "/1792222664135_199433159825831973_2104031773714370770_ea0f785c3cda4cb61f325b1c86cf0323.jpg",
  "/1792222664142_199433159825831973_2104031773714370770_1f2730cdac3fc1f5407588fb52302f57.jpg",
  "/1792222664152_199433159825831973_2104031773714370770_57fe6f90d16950afeb703f2877a394e5.jpg",
];

// Các cụm ảnh bay lượn ở nhiều tầng (bán kính khác nhau, góc khác nhau, kích thước to nhỏ đa dạng như trong clip)
const CLUSTER_PHOTOS = [
  // ẢNH TO NỔI BẬT NHẤT Ở PHÍA TRƯỚC (như khung hình áo vàng lớn góc phải màn hình trong clip)
  { src: ALL_12_PHOTOS[0], angle: 30, y: -40, radius: 240, w: 145, h: 180, rotZ: 3, border: "border-2 border-white/60", shadow: "shadow-[0_10px_35px_rgba(255,105,180,0.6)]" },
  { src: ALL_12_PHOTOS[1], angle: 155, y: -20, radius: 260, w: 130, h: 165, rotZ: -4, border: "border-2 border-white/50", shadow: "shadow-[0_10px_30px_rgba(255,105,180,0.5)]" },
  { src: ALL_12_PHOTOS[2], angle: 275, y: -10, radius: 250, w: 135, h: 170, rotZ: 2, border: "border-2 border-white/50", shadow: "shadow-[0_10px_30px_rgba(255,105,180,0.5)]" },

  // CÁC ẢNH VỪA Ở TẦNG GIỮA
  { src: ALL_12_PHOTOS[3], angle: 75, y: 110, radius: 310, w: 105, h: 135, rotZ: -3, border: "border border-white/40", shadow: "shadow-[0_8px_20px_rgba(255,105,180,0.4)]" },
  { src: ALL_12_PHOTOS[4], angle: 120, y: -160, radius: 330, w: 100, h: 130, rotZ: 4, border: "border border-white/40", shadow: "shadow-[0_8px_20px_rgba(255,105,180,0.4)]" },
  { src: ALL_12_PHOTOS[5], angle: 195, y: 130, radius: 320, w: 110, h: 140, rotZ: 5, border: "border border-white/40", shadow: "shadow-[0_8px_20px_rgba(255,105,180,0.4)]" },
  { src: ALL_12_PHOTOS[6], angle: 235, y: -180, radius: 340, w: 95, h: 125, rotZ: -2, border: "border border-white/40", shadow: "shadow-[0_8px_20px_rgba(255,105,180,0.4)]" },
  { src: ALL_12_PHOTOS[7], angle: 325, y: 120, radius: 310, w: 105, h: 135, rotZ: -4, border: "border border-white/40", shadow: "shadow-[0_8px_20px_rgba(255,105,180,0.4)]" },
  { src: ALL_12_PHOTOS[8], angle: 350, y: -170, radius: 330, w: 100, h: 130, rotZ: 3, border: "border border-white/40", shadow: "shadow-[0_8px_20px_rgba(255,105,180,0.4)]" },

  // CÁC ẢNH NHỎ HƠN Ở TẦNG XA VÀ CÁC ĐỘ CAO KHÁC NHAU
  { src: ALL_12_PHOTOS[9], angle: 10, y: 170, radius: 380, w: 85, h: 110, rotZ: 4, border: "border border-white/30", shadow: "shadow-md" },
  { src: ALL_12_PHOTOS[10], angle: 105, y: -230, radius: 390, w: 80, h: 105, rotZ: -5, border: "border border-white/30", shadow: "shadow-md" },
  { src: ALL_12_PHOTOS[11], angle: 170, y: 200, radius: 370, w: 85, h: 110, rotZ: 2, border: "border border-white/30", shadow: "shadow-md" },
  { src: ALL_12_PHOTOS[0], angle: 220, y: 190, radius: 390, w: 80, h: 105, rotZ: -3, border: "border border-white/30", shadow: "shadow-md" },
  { src: ALL_12_PHOTOS[1], angle: 290, y: -220, radius: 380, w: 85, h: 110, rotZ: 4, border: "border border-white/30", shadow: "shadow-md" },
  { src: ALL_12_PHOTOS[2], angle: 60, y: -210, radius: 360, w: 80, h: 105, rotZ: -2, border: "border border-white/30", shadow: "shadow-md" },
];

// Danh sách nhiều lời chúc ngọt ngào, lãng mạn bay lượn dày đặc trong màn hình kỷ niệm
const DENSE_WISHES_3D = [
  // Cỡ chữ lớn "Chúc em vui vẻ 🤍" & "Mãi yêu em" xoay tròn trong không gian 3D
  { text: "Chúc em vui vẻ 🤍", angle: 0, y: -20, radius: 260, cls: "text-3xl sm:text-4xl font-extrabold text-pink-100 neon-text-glow italic drop-shadow-[0_0_25px_#ff1493]" },
  { text: "Chúc em vui vẻ 🤍", angle: 180, y: -20, radius: 260, cls: "text-3xl sm:text-4xl font-extrabold text-pink-100 neon-text-glow italic drop-shadow-[0_0_25px_#ff1493]" },
  { text: "Mãi yêu em 💖", angle: 90, y: -15, radius: 270, cls: "text-2xl sm:text-3xl font-extrabold text-rose-200 neon-text-glow italic" },
  { text: "Cô gái của anh 🌸", angle: 270, y: -15, radius: 270, cls: "text-2xl sm:text-3xl font-extrabold text-pink-200 neon-text-glow italic" },

  // Cỡ to phát sáng hồng đậm - Lời chúc ngọt ngào
  { text: "Chúc em luôn yêu đời ✨", angle: 25, y: -110, radius: 270, cls: "text-pink-300 font-extrabold text-sm sm:text-base neon-text-glow" },
  { text: "Cảm ơn vì đã đến bên anh 💕", angle: 55, y: 70, radius: 280, cls: "text-rose-300 font-bold text-sm sm:text-base neon-text-glow" },
  { text: "Chúc em luôn rạng rỡ 🌸", angle: 115, y: -130, radius: 290, cls: "text-pink-300 font-extrabold text-sm sm:text-base neon-text-glow" },
  { text: "Yêu em nhiều hơn mỗi ngày 💌", angle: 145, y: 80, radius: 270, cls: "text-rose-300 font-bold text-sm sm:text-base neon-text-glow" },
  { text: "Em là điều tuyệt vời nhất 🎀", angle: 205, y: -100, radius: 280, cls: "text-pink-300 font-extrabold text-sm sm:text-base neon-text-glow" },
  { text: "Mãi là công chúa nhỏ của anh 👑", angle: 235, y: 75, radius: 270, cls: "text-rose-300 font-bold text-sm sm:text-base neon-text-glow" },
  { text: "Nụ cười em sưởi ấm tim anh ☀️", angle: 295, y: -115, radius: 280, cls: "text-amber-200 font-extrabold text-sm sm:text-base neon-text-glow" },
  { text: "Thương em nhất trần đời 🥰", angle: 335, y: 75, radius: 270, cls: "text-pink-300 font-bold text-sm sm:text-base neon-text-glow" },

  // Cỡ vừa trắng hồng dịu dàng
  { text: "Chúc mừng ngày phụ nữ Việt Nam 20/10", angle: 75, y: -50, radius: 320, cls: "text-pink-200/90 font-medium text-xs sm:text-sm neon-text-glow" },
  { text: "Chúc em một đời bình an, hạnh phúc 🍀", angle: 165, y: -65, radius: 310, cls: "text-pink-200/90 font-semibold text-xs sm:text-sm neon-text-glow" },
  { text: "Bên em là bình yên nhất 🤍", angle: 255, y: -50, radius: 320, cls: "text-pink-100 font-semibold text-xs sm:text-sm neon-text-glow" },
  { text: "20/10 ngập tràn niềm vui và quà nhé 🎁", angle: 345, y: -60, radius: 310, cls: "text-pink-200/90 font-semibold text-xs sm:text-sm neon-text-glow" },

  { text: "Xinh đẹp & rạng ngời mỗi ngày 🌷", angle: 35, y: 145, radius: 330, cls: "text-pink-300/90 font-medium text-xs sm:text-sm" },
  { text: "Mãi bên nhau qua mọi tháng năm 💖", angle: 125, y: 155, radius: 320, cls: "text-rose-200/90 font-medium text-xs sm:text-sm" },
  { text: "Mong em luôn được yêu thương trọn vẹn 💐", angle: 215, y: 145, radius: 340, cls: "text-pink-100/90 font-medium text-xs sm:text-sm" },
  { text: "Hôm nay và mãi mãi đều yêu em 💕", angle: 305, y: 160, radius: 330, cls: "text-rose-200/90 font-semibold text-xs sm:text-sm" },

  // Chữ nhỏ li ti bay lượn đan xen làm nền lung linh
  { text: "20/10 ngọt ngào", angle: 0, y: -180, radius: 340, cls: "text-pink-200/70 text-[11px] font-bold" },
  { text: "mãi yêu em", angle: 45, y: -220, radius: 350, cls: "text-rose-200/70 text-[11px] font-bold" },
  { text: "thương em", angle: 95, y: -190, radius: 360, cls: "text-pink-200/70 text-[11px] font-bold" },
  { text: "yêu đời", angle: 135, y: -225, radius: 340, cls: "text-amber-200/70 text-[11px] font-bold" },
  { text: "hạnh phúc", angle: 180, y: -210, radius: 350, cls: "text-rose-200/70 text-[11px] font-bold" },
  { text: "xinh đẹp", angle: 225, y: -185, radius: 340, cls: "text-pink-200/70 text-[11px] font-bold" },
  { text: "dịu dàng", angle: 270, y: -220, radius: 360, cls: "text-pink-200/70 text-[11px] font-bold" },
  { text: "bình yên", angle: 315, y: -195, radius: 350, cls: "text-rose-200/70 text-[11px] font-bold" },

  { text: "công chúa nhỏ", angle: 20, y: -70, radius: 360, cls: "text-pink-100/70 text-[11px]" },
  { text: "mãi bên nhau", angle: 65, y: 30, radius: 350, cls: "text-pink-100/80 text-[11px]" },
  { text: "yêu em nhất", angle: 110, y: 20, radius: 370, cls: "text-pink-100/70 text-[11px]" },
  { text: "duy nhất em", angle: 155, y: -140, radius: 360, cls: "text-pink-100/70 text-[11px]" },
  { text: "cười nhiều nhé", angle: 200, y: 35, radius: 350, cls: "text-pink-100/80 text-[11px]" },
  { text: "ấm áp", angle: 245, y: -90, radius: 360, cls: "text-pink-100/70 text-[11px]" },
  { text: "nụ cười xinh", angle: 290, y: -170, radius: 380, cls: "text-pink-200/70 text-[11px]" },
  { text: "yêu em vô cùng", angle: 330, y: 210, radius: 360, cls: "text-rose-200/80 text-[11px]" },
];

export default function Home() {
  // Stage: "opening" (Hộp quà) -> "bouquet" (Bó hoa) -> "neon3d" (Màn hình 360 độ)
  const [stage, setStage] = useState<"opening" | "bouquet" | "neon3d">("opening");
  // isRevealed: Khi ở bó hoa, chạm 1 hiện ảnh người lên bó hoa (true)
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; top: number; left: number; size: number; delay: number; duration: number }>
  >([]);

  // Không gian 3D 360 độ: rotation angles & tương tác kéo xoay
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const shootConfetti = (originY = 0.55) => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: originY },
        colors: ["#ff4d6d", "#ff758f", "#ffd700", "#ffffff", "#f43f5e"],
      });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      top: Math.random() * 92 + 4,
      left: Math.random() * 92 + 4,
      size: Math.random() * 2 + 1.2,
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

  // Tự động xoay 360 độ mượt mà khi ở màn hình neon3d
  useEffect(() => {
    if (stage !== "neon3d") return;
    let frameId: number;
    const spinLoop = () => {
      if (isAutoSpin && !isDraggingRef.current) {
        setRotY((prev) => (prev + 0.35) % 360);
      }
      frameId = requestAnimationFrame(spinLoop);
    };
    frameId = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(frameId);
  }, [stage, isAutoSpin]);

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

  // Xử lý chạm / click:
  // - Nếu chưa hiện ảnh (isRevealed = false): chạm sẽ hiện ảnh lên bó hoa
  // - Khi đã hiện ảnh (isRevealed = true): chạm tiếp theo qua màn hình 360 độ ngập tràn ảnh và lời chúc
  const handleStageClick = () => {
    if (stage === "bouquet") {
      if (!isRevealed) {
        shootConfetti();
        setIsRevealed(true);
      } else {
        shootConfetti(0.4);
        setStage("neon3d");
      }
    }
  };

  // Kéo xoay 360 độ bằng chuột / cảm ứng
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (stage !== "neon3d") return;
    isDraggingRef.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    lastMousePosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (stage !== "neon3d" || !isDraggingRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - lastMousePosRef.current.x;
    const deltaY = clientY - lastMousePosRef.current.y;

    setRotY((prev) => prev + deltaX * 0.45);
    setRotX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.25)));

    lastMousePosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    if (stage === "neon3d") {
      isDraggingRef.current = false;
    }
  };

  return (
    <main
      onClick={handleStageClick}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black select-none cursor-pointer"
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3"
      />

      {/* Ánh sáng hồng/vàng dịu dàng phía sau khi bung nở trên nền đen */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out z-0 flex items-center justify-center"
        style={{ opacity: isRevealed || stage === "neon3d" ? 1 : 0 }}
      >
        <div className="w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-rose-500/15 via-pink-400/20 to-amber-300/15 blur-3xl" />
      </div>

      {/* Rất nhiều kim tuyến li ti ở nền */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle opacity-40 z-10"
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

      {/* Nút bật/tắt nhạc và nút quay lại góc phải trên */}
      <div className="absolute top-5 right-5 z-50 flex items-center gap-2">
        {stage === "neon3d" && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoSpin(!isAutoSpin);
              }}
              className={`p-2.5 rounded-full backdrop-blur-md border border-white/15 active:scale-90 transition-transform ${
                isAutoSpin ? "bg-pink-500/30 text-white" : "bg-white/10 text-white/50"
              }`}
              title={isAutoSpin ? "Tắt tự xoay" : "Bật tự xoay 360°"}
            >
              <Rotate3d className="w-4 h-4 text-pink-300" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setStage("bouquet");
              }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-pink-200 active:scale-90 transition-transform"
              title="Quay lại bó hoa"
            >
              <ArrowLeft className="w-4 h-4 text-pink-300" />
            </button>
          </>
        )}
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

      {/* BƯỚC 2: BÓ HOA TƯƠNG TÁC (CHẠM 1: BUNG NỞ ẢNH TRÊN BÓ HOA -> CHẠM 2: CHUYỂN SANG MÀN HÌNH 360 ĐỘ) */}
      {stage === "bouquet" && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-700">
          <div className="relative w-full h-full max-w-[480px] mx-auto animate-float-bouquet">
            {/* 1. LỚP GIẤY GÓI PHÍA SAU VÀ BÓ HOA TỔNG THỂ */}
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

            {/* 2. LỚP HOA Ở SAU: Khi chạm, hoa vẫn giữ nguyên làm nền đệm lãng mạn phía sau các bức ảnh */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-in-out pointer-events-none"
              style={{
                zIndex: 10,
                opacity: isRevealed ? 0.75 : 1,
                transform: isRevealed ? "scale(0.96) translateY(-5px)" : "scale(1) translateY(0)",
                filter: isRevealed ? "brightness(0.9) contrast(1.05)" : "none",
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

            {/* 3. LỚP ẢNH NGƯỜI: Khi chạm thì bung nở hiện lên tự nhiên trên nền bó hoa */}
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
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.75))",
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

          {/* Dòng chữ hướng dẫn tinh tế ở dưới */}
          <div className="absolute bottom-7 inset-x-0 z-50 flex justify-center">
            <p className="text-xs sm:text-[13px] text-pink-200/90 font-light tracking-wider animate-pulse bg-black/40 px-4 py-1.5 rounded-full border border-pink-500/20 backdrop-blur-sm">
              {!isRevealed
                ? "Chạm vào bó hoa"
                : "Chạm tiếp để mở màn hình kỷ niệm"}
            </p>
          </div>
        </div>
      )}

      {/* BƯỚC 3: MÀN HÌNH THÔNG ĐIỆP CHẠY XUNG QUANH NHIỀU ẢNH NHIỀU LỜI CHÚC DÀY ĐẶC CHUẨN VIDEO */}
      {stage === "neon3d" && (
        <div className="absolute inset-0 z-40 overflow-hidden perspective-1000">
          {/* Header Messenger style chuẩn như trong video */}
          <div className="absolute top-4 inset-x-4 z-50 flex items-center justify-between text-white/70 text-xs pointer-events-none">
            <span className="font-light tracking-wide flex items-center gap-1.5 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              i.dlove.vn
            </span>
            <span className="text-[11px] text-pink-300 font-light flex items-center gap-1">
              <Rotate3d className="w-3.5 h-3.5 animate-spin" />
              Kéo xoay 360°
            </span>
          </div>

          {/* Các cánh hoa / tim đỏ bay lơ lửng từ dưới lên chuẩn video */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {[
              { top: "15%", left: "22%", dur: "3.2s" },
              { top: "25%", right: "24%", dur: "4.1s" },
              { top: "35%", right: "35%", dur: "2.8s" },
              { top: "45%", left: "15%", dur: "3.6s" },
              { top: "60%", left: "18%", dur: "4.5s" },
              { top: "72%", left: "32%", dur: "5.2s" },
              { top: "80%", right: "45%", dur: "3.5s" },
              { top: "88%", right: "18%", dur: "4.8s" },
            ].map((heart, idx) => (
              <div
                key={idx}
                className="absolute animate-floating-heart"
                style={{
                  top: heart.top,
                  left: heart.left,
                  right: heart.right,
                  ["--drift-time" as string]: heart.dur,
                }}
              >
                <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] text-lg">
                  ❤️
                </span>
              </div>
            ))}
          </div>

          {/* KHÔNG GIAN 3D 360 ĐỘ XOAY TRÒN VỚI NHIỀU TẦNG ẢNH VÀ LỜI CHÚC DÀY ĐẶC */}
          <div className="absolute inset-0 flex items-center justify-center preserve-3d">
            <div
              className="relative w-0 h-0 preserve-3d transition-transform duration-75 ease-out"
              style={{
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              }}
            >
              {/* 1. CỤM NHIỀU ẢNH (NHỎ - VỪA - LỚN) CHẠY XUNG QUANH NHIỀU TẦNG ĐỘ CAO */}
              {CLUSTER_PHOTOS.map((p, idx) => (
                <div
                  key={`photo-${idx}`}
                  className={`absolute rounded-xl overflow-hidden ${p.border} ${p.shadow} backdrop-blur-[2px] transition-transform hover:scale-110`}
                  style={{
                    width: `${p.w}px`,
                    height: `${p.h}px`,
                    left: `-${p.w / 2}px`,
                    top: `-${p.h / 2}px`,
                    transform: `rotateY(${p.angle}deg) translateY(${p.y}px) translateZ(${p.radius}px) rotateZ(${p.rotZ}deg)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "visible",
                  }}
                >
                  <Image
                    src={p.src}
                    alt={`Ảnh kỷ niệm ${idx + 1}`}
                    fill
                    priority={idx < 5}
                    className="object-cover object-center pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-pink-300/40 pointer-events-none" />
                </div>
              ))}

              {/* 2. CÁC LỜI CHÚC DÀY ĐẶC ĐAN XEN CHẠY XUNG QUANH CÁC BỨC ẢNH */}
              {DENSE_WISHES_3D.map((item, idx) => (
                <div
                  key={`wish-${idx}`}
                  className={`absolute -left-28 -top-3 w-56 text-center select-none whitespace-nowrap pointer-events-none ${item.cls}`}
                  style={{
                    transform: `rotateY(${item.angle}deg) translateY(${item.y}px) translateZ(${item.radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "visible",
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Dòng chữ ở đáy màn hình */}
          <div className="absolute bottom-5 inset-x-0 z-50 flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setStage("bouquet");
              }}
              className="text-xs text-pink-200/80 hover:text-white underline underline-offset-4 tracking-wider bg-black/40 px-3.5 py-1.5 rounded-full border border-pink-500/20 backdrop-blur-sm"
            >
              Chạm để quay lại bó hoa 💐
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
