import Image from "next/image"

const feeds = [
  {
    image: "/assets/images/footer-feed/cake-1.jpg",
    likes: 10,
    comments: 2,
  },
  {
    image: "/assets/images/footer-feed/cake-2.jpg",
    likes: 10,
    comments: 2,
  },
  {
    image: "/assets/images/footer-feed/cake-3.jpg",
    likes: 10,
    comments: 2,
  },
  {
    image: "/assets/images/footer-feed/cake-4.jpg",
    likes: 10,
    comments: 2,
  },
  {
    image: "/assets/images/footer-feed/cake-5.jpg",
    likes: 10,
    comments: 2,
  },
  {
    image: "/assets/images/footer-feed/cake-6.jpg",
    likes: 10,
    comments: 2,
  },
]

export default function Instagram({ images }: { images: any[] }) {
  return (
    <section id="instagram">
      <div className="my-1">
        <div className="max-w-7xl mx-auto px-5 xl:px-0">
          <h1 className="md:text-3xl lg:text-1.5xl font-bold text-primary-900 font-WildMango">
            CakeGram: Slice, Follow, Love
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-5 hidden md:grid md:grid-cols-3 items-center gap-1">
            {images.map((feed, index) => (
              <div
                className="flex-1 relative aspect-square md:aspect-auto h-[350px] w-[350px]"
                key={index}
              >
                <Image
                  src={feed.image}
                  alt={`insta_${index}`}
                  fill
                  style={{ objectPosition: "center", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-0.5 md:hidden w">
          {images.map((feed, index) => (
            <div
              className="flex-1 relative md:h-[150px] lg:h-[225px] aspect-square md:aspect-auto lg:w-1/4 lg:shrink-0"
              key={index}
            >
              <Image src={feed.image} alt={`insta_${index}`} fill />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
