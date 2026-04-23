import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CuratedCollections = () => {
  const collections = [
    {
      title: "Occasion Wear",
      subtitle: "Hand-stitched Formals",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJpCPBc6e_9NafmPJldz0EbbVQueBJJY5KtCBXAqe8-DVwD6WsBJp7lssKTC29b6eWXlR2ssrumZrOaRKTcwRV3_UmaehOiEPXXKARb-iavZnak8TgEThQY4VWNBMSDUEF5IJUWbPe_ysl4nQlYEEUpWWbfsoiPVhDCHdFV1GefGje9-HTN9tHzMg67DL87udBW86mXJIOXr0nBTPAGFHIvafXoKHYebgctc5vsWHGmoFV5hQpGJsqE7rJJ9khmaDfG0UpVvsrmMuW",
      handle: "occasion-wear"
    },
    {
      title: "Core Classics",
      subtitle: "Everyday Sophistication",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6rvIGzyzXmW2N2cAX0I4MvAEj0ojXJeE3HKXCdFZMGjgjC1kabKbYD1-o6V1HWT1ECKxNRnU5sOkH7QUMZRhPzCkxmRizK6bGj7Y6BWw47tFNqgKo4-eNCY7LHXEYOsCO45shoH3C3rKkOphGgViMVxQVtZO2v0gjZtvPquuQ6pfSknOmPT1jLjqhnOHywXAJiExglwceFQ6aXquaxzz0reGurOB-kU72N4m42QlKbBgZ3GoQIH0Rh1P3KJ6p2oiA0ikLKR3nZ88q",
      handle: "core-classics"
    },
    {
      title: "Kaftans",
      subtitle: "The Signature Silhouette",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdh2ihukRgeJtyZx_yioEmbD7oShoIBZA96UjJ8vIf_c2qGGMN_tge0L1W1VvTFODOeYjliCB9PrNdkRQBEMMpQh1npFwOLtN8l3OhQvVVybkepMgyZ1BxSHrBHT-5oSE-U_eKlxCdjpLcBrJjiAArbp_-2TWGcy3BKA4hFUsWJq19vBtQsJlNgi_m9QaGsfWiUdqLT_zxB2nMDQvLjlywzpELpr-onkCNzPzs58BhMoVZXbmdSG1w6J58L3sU8DfFZb1SrnpWKH6y",
      handle: "kaftans"
    },
    {
      title: "New Arrivals",
      subtitle: "The Latest Heritage",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApoFSnIPtt85gxSNOrKdCgmeq7KXyNyj_Wdm2rfzLf0vmVIUlznzXi_KyDbuWk67g_cEw6JiALuINYrOT8LQmDqbepN71uVLXtbt08VeK14BOkpmvWU8LsZQSKyr_IV-IhKO7N5HEfbJXBsf0W2OIF3kFM0Nodx01zJImZK7pnXcMIrn2SHDpjsXom1vNOXSlBTHqEyAj3AhGXMn0RgJSSzxO5ajgNF8XVwc_1MCU1u_eQWB-s2oSx3si-muRBeE2_zGVKPxX2PTtb",
      handle: "store"
    }
  ]

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto">
      <h2 className="font-headline text-3xl text-center mb-16">Curated Collections</h2>
      <div className="flex flex-wrap justify-center gap-8 pb-12">
        {collections.map((item, index) => (
          <LocalizedClientLink 
            key={index} 
            href={item.handle.startsWith('/') ? item.handle : `/categories/${item.handle}`}
            className="w-full sm:w-80 group text-center"
          >
            <div className="aspect-[3/4] bg-surface-container mb-6 overflow-hidden rounded-md">
              <img 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={item.image}
              />
            </div>
            <h3 className="font-headline text-xl mb-1">{item.title}</h3>
            <p className="text-xs text-on-surface-variant uppercase tracking-widest">{item.subtitle}</p>
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}

export default CuratedCollections
