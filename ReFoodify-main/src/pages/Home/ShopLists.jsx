// import { faker } from "https://esm.sh/@faker-js/faker";
// import { faker } from "@faker-js/faker";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { shopData, icons } from "@/data/products";
import { Link } from "react-router-dom";
import useCart from "@/hooks/useCart";

const ShopLists = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  return (
    <section className="py-8 antialiased  md:py-12">
      <h2 className="text-center my-4 text-4xl font-semibold text-white">
        Shop List
      </h2>
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 mt-16">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {shopData.slice(0, 5).map((recipe, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="rounded-lg border border-gray-200 bg-white p-6  dark:border-gray-700 dark:bg-gray-800">
                  <div className="h-56 pb-2 w-full border-b">
                    <a href={recipe.link}>
                      <img
                        className="mx-auto rounded-lg h-full dark:block"
                        src={recipe.image}
                        alt={recipe.name}
                      />
                    </a>
                  </div>
                  <div className="pt-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span
                        className={`me-2 rounded bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary dark:text-primary`}
                      >
                        {`${recipe.discount}`}
                      </span>

                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          data-tooltip-target={`tooltip-quick-look-${index}`}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <span className="sr-only">Quick look</span>
                          {/* SVG for eye icon */}
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
                        {/* Tooltip for Quick look */}
                        <div
                          id={`tooltip-quick-look-${index}`}
                          role="tooltip"
                          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                          data-popper-placement="top"
                        >
                          Quick look
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow=""
                          ></div>
                        </div>

                        <button
                          type="button"
                          data-tooltip-target={`tooltip-add-to-favorites-${index}`}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <span className="sr-only">Add to Favorites</span>
                          {/* SVG for heart icon */}
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                            />
                          </svg>
                        </button>
                        {/* Tooltip for Add to favorites */}
                        <div
                          id={`tooltip-add-to-favorites-${index}`}
                          role="tooltip"
                          className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                          data-popper-placement="top"
                        >
                          Add to favorites
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow=""
                          ></div>
                        </div>
                      </div>
                    </div>

                    <a
                      href={recipe.link}
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >
                      {recipe.name}
                    </a>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < recipe.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {recipe.rating.toFixed(1)}
                      </p>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        ({recipe.reviews})
                      </p>
                    </div>

                    <ul className="mt-2 flex items-center justify-between gap-4">
                      {recipe.features.map((feature, index) => {
                        const Icon = icons[feature.icon];
                        return (
                          <li key={index} className="flex items-center  gap-2">
                            <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {feature.text}
                            </p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        {recipe.price}
                      </p>

                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          type="button"
                          className="px-3 py-1 text-white bg-[#A5D157] hover:bg-[#A5D157] rounded-l-md"
                          onClick={() =>
                            updateQuantity(
                              recipe.id,
                              (cart.find((item) => item.id === recipe.id)
                                ?.quantity || 0) - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">
                          {cart.find((item) => item.id === recipe.id)
                            ?.quantity || 0}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 text-white bg-[#A5D157] hover:bg-[#A5D157] rounded-r-md"
                          onClick={() => addToCart(recipe)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center items-center rounded-lg bg-[#bc8c14] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#bc8c14] focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-[#bc8c14] dark:hover:bg-[#bc8c14] dark:focus:ring-[#bc8c14]"
                      onClick={() => addToCart(recipe)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4"></div>

        <div className="w-full text-center">
          <Link to="/shop">
            <button
              type="button"
              className=" inline-flex justify-center items-center rounded-lg bg-[#bc8c14] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#bc8c14] focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-[#bc8c14] dark:hover:bg-[#bc8c14] dark:focus:ring-[#bc8c14]"
            >
              Show more
            </button>
          </Link>
        </div>
      </div>
      {/* <!-- Filter modal --> */}
    </section>
  );
};

export default ShopLists;
