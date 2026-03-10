import React from 'react'
import PackageCard from '../components/PackageCard'
import { packages } from '../data/packages'

const Rajstan = () => {

  const rajstanPackages = packages.filter(
    pkg => pkg.category === "rajstan"
  )

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center">

      {rajstanPackages.map(pkg => (
        <PackageCard
          key={pkg.id}
          image={pkg.image}
          title={pkg.title}
          duration={pkg.duration}
          from={pkg.from}
          to={pkg.to}
          hotel={pkg.hotel}
          meal={pkg.meal}
          oldPrice={pkg.oldPrice}
          price={pkg.price}
        />
      ))}

    </div>
  )
}

export default Rajstan