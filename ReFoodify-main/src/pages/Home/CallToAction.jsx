import ctaImage from "@/assets/cta.png";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div>
      <div className="mx-auto max-w-[90%] py-20 sm:px-6 lg:px-8 pt-24">
        <div className="relative isolate overflow-hidden bg-[#295143] px-6 sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#32a852" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-[90%] text-center lg:mx-0 lg:flex-auto pb-16 lg:text-left">
            <h2
              className="text-5xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ lineHeight: "60px" }}
            >
              Buy Discounted Items <br />
              And Claim your points.
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-300">
              Order discounted products from collaborators in just one click.
              <br />
              Earn points by reducing food wastage and use those points as you
              shop.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                to="/login"
                title=""
                className="rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                role="button"
              >
                <span> Claim your points 🎉</span>
              </Link>
              <Link
                to="/learn-more"
                title=""
                className="text-lg font-semibold leading-6 text-white"
                role="button"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 lg:mt-0 w-full lg:w-1/2 aspect-[2/1] lg:aspect-auto">
            <img
              alt="App screenshot"
              src={ctaImage}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
