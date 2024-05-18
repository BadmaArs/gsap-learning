import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const VideoCarusel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;
  //   Декомпозиция видео

  useGSAP(() => {
    gsap.to("#slider", {
      // Анимация слайдера
      transform: `translateX(${-100 * videoId}%)`, // Если видео айди 2, то перенос на 200% и т.д.
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        // Устанавливает элемент с идентификатором #video в качестве триггера анимации.- Анимация будет запускаться, когда элемент #video войдет в область просмотра на странице.

        toggleActions: "restart none none none",
        // Устанавливает поведение анимации при скроллинге:- restart: Анимация будет перезапускаться при повторном входе элемента #video в область просмотра.- none: Анимация не будет запускаться снова после первоначального запуска.- none: Анимация не будет завершена при выходе элемента #video из области просмотра.- none: Анимация не будет отменена при выходе элемента #video из области просмотра.
      },
      onComplete: () => {
        // Это функция обратного вызова, которая выполняется после завершения анимации
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
          // В данном случае функция устанавливает состояние video следующим образом:  - startPlay устанавливается в true, что указывает на то, что воспроизведение видео должно начаться.- isPlaying устанавливается в true, что указывает на то, что видео воспроизводится.
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      // Проверка длины loadedData: - Если loadedData содержит более 3 элементов, это означает, что по крайней мере 3 видео загружены.

      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
      // Условный оператор воспроизведения/паузы:   - Если isPlaying равно false (видео не воспроизводится), код приостанавливает текущее видео, используя videoRef.current[videoId].pause(). - Если isPlaying равно true и startPlay равно true (воспроизведение должно начаться), код запускает воспроизведение текущего видео, используя videoRef.current[videoId].play(). В целом, этот эффект гарантирует, что текущее видео будет приостановлено, если isPlaying равно false, или воспроизведено, если isPlaying равно true и загружено более 3 видео.

      // Этот эффект обычно используется для управления воспроизведением видео в зависимости от состояния приложения или взаимодействия пользователя
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e]);
  // Эта функция принимает два аргумента:  - i: Индекс текущего видео. - e: Событие loadedmetadata.

  // Она добавляет событие e (которое содержит метаданные загруженного видео) в массив loadedData.- Распространение оператора ...pre используется для создания нового массива, который включает существующие элементы loadedData, а также новый элемент e. В целом, эта функция используется для отслеживания метаданных каждого загруженного видео в массиве loadedData.

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });
      if (videoId == 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${list.id === 2 && "translate-x-44"}
                    pointer-events-none
                  `}
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((pervVideo) => ({
                      ...pervVideo,
                      isPlaying: true,
                    }));
                  }}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};
export default VideoCarusel;
