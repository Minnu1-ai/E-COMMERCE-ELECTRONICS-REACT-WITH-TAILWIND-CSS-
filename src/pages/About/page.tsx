function About() {
  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 mt-0 leading-tight">About TechHaven</h1>
        <p className="text-slate-600 leading-relaxed m-0">Our story, our mission, and our values.</p>
      </section>

      {/* Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <img src="/images/categories/cat1.jpg" alt="Our Team"
            className="w-full rounded-xl object-cover shadow-lg" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 mt-0 leading-tight">Our Story</h2>
          <p className="text-slate-600 leading-relaxed mb-4 mt-0">
            Founded in 2026, TechHaven started with a simple idea: to make premium consumer electronics accessible to everyone. We believe that technology has the power to elevate our daily lives, and we're passionate about bringing the best and most innovative products to our community.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6 mt-0">
            What began as a small online storefront has grown into a premier destination for tech enthusiasts, professionals, and everyday consumers alike. We carefully curate our catalog to ensure that every product we sell meets our high standards for quality, performance, and design.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '10k+', label: 'Happy Customers' },
              { value: '500+', label: 'Premium Products' },
              { value: '24/7', label: 'Customer Support' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-2xl font-bold text-brand-primary mb-1 mt-0 leading-tight">{stat.value}</h3>
                <p className="text-slate-500 text-sm m-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2 mt-0 leading-tight">Why Choose Us?</h2>
          <p className="text-slate-600 m-0">We're more than just an electronics store.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'fa-shipping-fast', title: 'Fast Shipping',    text: 'Free standard shipping on all orders over $50. Need it faster? We offer expedited options too.' },
            { icon: 'fa-shield-alt',    title: 'Secure Checkout',  text: 'Your data is safe with us. We use industry-leading encryption to protect your personal information.' },
            { icon: 'fa-undo',          title: 'Easy Returns',     text: 'Not completely satisfied? Return your item within 30 days for a full refund or exchange.' },
          ].map((feat) => (
            <div key={feat.title} className="bg-white rounded-md border border-slate-200 p-8 text-center flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-brand-primary text-2xl">
                <i className={`fas ${feat.icon}`}></i>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 m-0 leading-tight">{feat.title}</h3>
              <p className="text-slate-600 leading-relaxed m-0 text-sm">{feat.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;
