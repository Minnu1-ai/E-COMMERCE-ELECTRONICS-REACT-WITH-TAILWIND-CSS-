function Blog() {
  const posts = [
    {
      img: '/images/laptops/Product1.jpg',
      alt: 'Laptop Buying Guide',
      tag: 'Buying Guide',
      title: 'The Ultimate Laptop Buying Guide for 2026',
      excerpt: 'Struggling to find the perfect laptop? We break down everything you need to know, from processors and RAM to screen types and battery life.',
      date: 'April 24, 2026',
      author: 'Alex Johnson',
    },
    {
      img: '/images/audio/Product1.jpg',
      alt: 'Headphone Comparison',
      tag: 'Review',
      title: 'Sony WH-1000XM5 vs Apple AirPods Max',
      excerpt: 'We put the top two noise-canceling headphones head-to-head to see which one reigns supreme for audio quality, comfort, and battery life.',
      date: 'April 18, 2026',
      author: 'Sarah Chen',
    },
    {
      img: '/images/wearables/Product1.jpg',
      alt: 'Wearable Technology',
      tag: 'News',
      title: "What's Next for Wearable Technology?",
      excerpt: 'From advanced health tracking to seamless smart home integration, explore the upcoming trends that will define the next generation of smartwatches.',
      date: 'April 12, 2026',
      author: 'Mike Rivera',
    },
    {
      img: '/images/cameras/Product1.jpg',
      alt: 'Mirrorless Camera Guide',
      tag: 'Tutorial',
      title: 'Getting Started with Mirrorless Cameras',
      excerpt: "Making the switch from your smartphone to a dedicated camera? Here are our top 10 tips for beginners looking to master manual photography.",
      date: 'April 05, 2026',
      author: 'Emily Wong',
    },
  ];

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 mt-0 leading-tight">Tech Insights</h1>
        <p className="text-slate-600 leading-relaxed m-0">The latest news, reviews, and buying guides.</p>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-6 max-w-[900px] mx-auto my-9">
          {posts.map((post) => (
            <article key={post.title} className="flex flex-col bg-white rounded-md border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <img src={post.img} alt={post.alt}
                className="block w-full h-[200px] object-cover" />
              <div className="p-4 flex flex-col flex-1">
                <span className="inline-block text-xs font-medium text-brand-primary bg-blue-50 px-2.5 py-0.5 rounded-full mb-3 w-fit">
                  {post.tag}
                </span>
                <a href="#" className="font-semibold text-slate-900 text-base mb-2 leading-snug hover:text-brand-primary transition-colors duration-300 no-underline">
                  {post.title}
                </a>
                <p className="text-slate-600 text-sm leading-relaxed mb-3 mt-0 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-slate-400 mt-auto pt-3 border-t border-slate-100">
                  <span><i className="far fa-calendar mr-1"></i>{post.date}</span>
                  <span>By {post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button className="inline-flex items-center justify-center bg-transparent border-2 border-brand-primary text-brand-primary font-semibold px-6 py-2.5 rounded-md text-sm hover:bg-brand-primary hover:text-white transition-all duration-300 cursor-pointer">
            Load More Articles
          </button>
        </div>
      </section>
    </main>
  );
}

export default Blog;
