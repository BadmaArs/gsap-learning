import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./App.css";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const scrollRef = useRef();

  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
    yoyo: true,
  });
  useGSAP(() => {
    gsap.to("#blue-box", {
      x: 250,
      repeat: -1,
      yoyo: true,
      rotate: 360,
      duration: 5,
      ease: "power1.inOut",
    });
    gsap.from("#green-box", {
      x: 250,
      repeat: -1,
      yoyo: true,
      rotate: 360,
      duration: 5,
      ease: "power1.inOut",
    });
    gsap.fromTo(
      "#red-box",
      {
        x: 0,
        rotation: 0,
        borderRadius: "10%",
      },
      {
        x: 250,
        repeat: -1,
        yoyo: true,
        borderRadius: "100%",
        rotate: 360,
        duration: 5,
        ease: "bounce.out",
      }
    );
    timeline.to("#yellow-box", {
      x: 250,
      rotation: 360,
      borderRadius: "100%",
      duration: 5,
      ease: "back.inOut",
    });
    timeline.to("#yellow-box", {
      x: 250,
      scale: 1.5,
      rotation: 360,
      borderRadius: "100%",
      duration: 5,
      ease: "back.inOut",
    });
    timeline.to("#yellow-box", {
      y: 0,
      scale: 1,
      rotation: 360,
      borderRadius: "100%",
      duration: 5,
      ease: "back.inOut",
    });
    timeline.to("#yellow-box", {
      x: 500,
      scale: 1,
      rotation: 360,
      borderRadius: "8px",
      duration: 5,
      ease: "back.inOut",
    });

    const boxes = gsap.utils.toArray(scrollRef.current.children);
    const fadeIn = gsap.utils.toArray(scrollRef.current.children);

    boxes.forEach((box) => {
      gsap.to(box, {
        x: 150 * (boxes.indexOf(box) + 5),
        rotation: 360,
        borderRadius: "100%",
        scale: 1.5,
        scrollTrigger: {
          trigger: box,
          start: "bottom bottom",
          end: "top 20%",
          scrub: true,
        },
        ease: "power1.inOut",
      });
    });

    fadeIn.forEach((box) => {
      gsap.to("#text", {
        ease: "power1.inOut",
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: box,
          start: "bottom bottom",
          end: "top 20%",
        },
      });

      gsap.fromTo(
        ".para",
        {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: box,
            start: "bottom bottom",
            end: "top 20%",
          },
        },
        {
          opacity: 1,
          y: 0,
          delay: 1,
          stagger: 0.1,
        }
      );
    });
  }, []);

  return (
    <>
      <div className="main">
        <div className="m-20">
          <div
            id="blue-box"
            className=" w-40 h-40 bg-blue-500 rounded-lg"
          ></div>
        </div>
        <div className="m-20">
          <div
            id="green-box"
            className=" w-40 h-40 bg-green-500 rounded-lg"
          ></div>
        </div>
        <div className="m-20">
          <div id="red-box" className=" w-40 h-40 bg-red-500 rounded-lg"></div>
        </div>
        <div className="m-20">
          <div className="mt-20 space-y-10 rounded-lg bg-slate-600 w-fit px-10 py-5 text-white">
            <button
              onClick={() => {
                if (timeline.paused()) {
                  timeline.play();
                } else {
                  timeline.pause();
                }
              }}
            >
              Play/Pause
            </button>
          </div>
          <div
            id="yellow-box"
            className=" w-40 h-40 bg-yellow-500 rounded-lg"
          ></div>
        </div>
        <div ref={scrollRef} className="m-20 h-screen">
          <div
            id="ind-box"
            className=" w-40 h-40 bg-indigo-500 rounded-lg"
          ></div>

          <div
            id="dark-green-box"
            className=" w-40 h-40 bg-green-600 rounded-lg"
          ></div>
        </div>
        <div className="m-20 h-screen flex justify-center items-center w-4/5 text-white flex-col">
          <p id="text" className=" opacity-0 translate-y-10">
            Lorem ipsum
          </p>
          <p className="para">
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
