import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { watchImg } from "../utils";
import VideoCarusel from "./VideoCarusel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  }, []);
  return (
    <>
      <section
        id="hightlight"
        className="w-screen overflow-hidden h-full common-padding bg-zinc "
      >
        <div className="screen-max-width">
          <div className="mb-12 w-full items-center justify-between md:flex">
            <h1 id="title" className="section-heading">
              Get the hightlight
            </h1>
            <div className="flex flex-wrap items-end gap-5">
              <p className="link">
                Watch the film{" "}
                <img src={watchImg} className="ml-2" alt="watch" />
              </p>
              <p className="link">
                Watch the film{" "}
                <img src={watchImg} className="ml-2" alt="watch" />
              </p>
            </div>
          </div>
          <VideoCarusel />
        </div>
      </section>
    </>
  );
};
export default Highlights;
